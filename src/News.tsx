import { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';
import PageHeader from './components/PageHeader';
import DetailOverlay from './components/DetailOverlay';
import ArticleCard from './components/ArticleCard';
import ArticleExtractor from './components/ArticleExtractor';
import { fetchAllNews } from './services/newsService';
import { onNewsTabPress } from './services/newsRefreshEmitter';
import { timeAgo, htmlToParagraphs } from './lib/utils';
import { colors } from './constants/theme';
import type { Article } from './types/news';

function ArticleSkeleton() {
  return (
    <SafeAreaView style={s.container}>
      <PageHeader title="TECHPUNE NEWS" />
      <View style={s.skelWrap}>
        {[1,2,3,4,5].map((i) => (
          <View key={i} style={s.skelCard}>
            <View style={s.skelMeta}>
              <View style={s.skelFav} />
              <View style={s.skelSrc} />
              <View style={s.skelTime} />
            </View>
            <View style={s.skelTitle} />
            <View style={s.skelTitle2} />
            <View style={s.skelBody}>
              <View style={s.skelDesc} />
              <View style={s.skelDesc2} />
              <View style={s.skelThumb} />
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

function ArticleOverlay({
  article,
  extractedContent,
  extractedImage,
  extracting,
  onClose,
}: {
  article: Article;
  extractedContent: string | null;
  extractedImage: string | null;
  extracting: boolean;
  onClose: () => void;
}) {
  const displayContent = extractedContent || article.content || '';
  const displayImage = extractedImage || article.imageUrl || '';

  return (
    <DetailOverlay visible onClose={onClose} title="ARTICLE" bgColor={colors.surface}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View style={s.overlayPad}>
            {article.categories.length > 0 ? (
              <Text style={s.ocat}>{article.categories[0].toUpperCase()}</Text>
            ) : null}

            <Text style={s.otitle}>{article.title}</Text>
            <View style={s.odiv} />

            {displayImage ? (
              <View style={s.othumbWrap}>
                <View style={s.othumb}>
                  <Image
                    source={{ uri: displayImage }}
                    style={s.othumbImg}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ) : null}

            <View style={s.ostatRow}>
              <View style={s.ostat}>
                <Heroicon name="newspaper" size={14} color={colors.primary} />
                <Text style={s.ostatText}>{article.sourceName}</Text>
              </View>
              {article.author ? (
                <View style={s.ostat}>
                  <Heroicon name="user" size={14} color={colors.primary} />
                  <Text style={s.ostatText}>{article.author}</Text>
                </View>
              ) : null}
              {article.published ? (
                <View style={s.ostat}>
                  <Heroicon name="clock" size={14} color={colors.primary} />
                  <Text style={s.ostatText}>{timeAgo(article.published)}</Text>
                </View>
              ) : null}
            </View>

            {extracting ? (
              <View style={s.extractingRow}>
                <Text style={s.extractingText}>Extracting article…</Text>
              </View>
            ) : null}

            {article.description && !extractedContent ? (
              <Text style={s.ohead}>{article.description}</Text>
            ) : null}

            {displayContent ? (
              <View style={s.obodyWrap}>
                {htmlToParagraphs(displayContent).map((para, i) => (
                  <Text key={i} style={s.obody}>{para.trim()}</Text>
                ))}
              </View>
            ) : null}

            <TouchableOpacity
              style={s.olink}
              onPress={() => WebBrowser.openBrowserAsync(article.url)}
              activeOpacity={0.85}
            >
              <Heroicon name="link" size={15} color={colors.white} />
              <Text style={s.olinkText}>READ FULL ARTICLE</Text>
            </TouchableOpacity>

            <View style={s.ofooter}>
              <Text style={s.oauthor}>
                {article.author ? `By ${article.author}` : article.sourceName}
              </Text>
              <Text style={s.odate}>
                {article.published
                  ? new Date(article.published).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : ''}
              </Text>
            </View>
          </View>
        )}
      />
    </DetailOverlay>
  );
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [extractedContent, setExtractedContent] = useState<string | null>(null);
  const [extractedImage, setExtractedImage] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);

  const loadNews = useCallback(async () => {
    const result = await fetchAllNews();
    setArticles(result);
  }, []);

  useEffect(() => {
    (async () => {
      await loadNews();
      setLoading(false);
    })();
  }, [loadNews]);

  useEffect(() => {
    return onNewsTabPress(() => loadNews());
  }, [loadNews]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  }, [loadNews]);

  const handleOpenArticle = useCallback((article: Article) => {
    setSelectedArticle(article);
    setExtractedContent(null);
    setExtractedImage(null);
    setExtracting(article.url.startsWith('http'));
  }, []);

  const handleExtracted = useCallback((data: any) => {
    setExtractedContent(data.content || '');
    setExtractedImage(data.ogImage || '');
    setExtracting(false);
  }, []);

  const handleExtractError = useCallback(() => {
    setExtracting(false);
  }, []);

  if (loading) return <ArticleSkeleton />;

  return (
    <SafeAreaView style={s.container}>
      <PageHeader title="TECHPUNE NEWS" />

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={handleOpenArticle} />
        )}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        windowSize={7}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyText}>No articles found</Text>
          </View>
        }
      />

      <ArticleExtractor
        url={extracting ? selectedArticle?.url ?? null : null}
        onExtracted={handleExtracted}
        onError={handleExtractError}
      />

      {selectedArticle && (
        <ArticleOverlay
          article={selectedArticle}
          extractedContent={extractedContent}
          extractedImage={extractedImage}
          extracting={extracting}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  skelWrap: { paddingHorizontal: 16, paddingTop: 4 },
  skelCard: {
    backgroundColor: colors.skeletonCard,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  skelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  skelFav: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.skeleton,
  },
  skelSrc: {
    width: 80,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.skeleton,
  },
  skelTime: {
    width: 40,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.skeleton,
    marginLeft: 'auto',
  },
  skelTitle: {
    width: '90%',
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.skeleton,
    marginBottom: 6,
  },
  skelTitle2: {
    width: '60%',
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.skeleton,
    marginBottom: 12,
  },
  skelBody: {
    flexDirection: 'row',
    gap: 12,
  },
  skelDesc: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.skeleton,
    marginBottom: 6,
  },
  skelDesc2: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.skeleton,
  },
  skelThumb: {
    width: 72,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.skeleton,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  empty: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textMuted,
  },

  overlayPad: { padding: 24 },
  ocat: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: colors.textLight,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  otitle: {
    fontSize: 22,
    fontFamily: 'ClashDisplay-Bold',
    color: colors.primary,
    lineHeight: 26,
    marginBottom: 14,
  },
  odiv: {
    width: 36,
    height: 3,
    backgroundColor: colors.primary,
    marginBottom: 18,
  },
  ohead: {
    fontSize: 15,
    fontFamily: 'CabinetGrotesk-Medium',
    color: colors.textBody,
    lineHeight: 22,
    marginBottom: 14,
  },
  ostatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 14,
  },
  ostat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ostatText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
  },
  extractingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },
  extractingText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textLight,
    fontStyle: 'italic',
  },
  othumbWrap: {
    marginBottom: 14,
  },
  othumb: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
    backgroundColor: colors.skeletonCard,
  },
  othumbImg: { width: '100%', height: 200 },
  obodyWrap: { marginBottom: 8 },
  obody: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textBody,
    lineHeight: 22,
    marginBottom: 14,
  },
  olink: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    gap: 7,
  },
  olinkText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  ofooter: {
    marginTop: 20,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oauthor: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
  },
  odate: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: colors.textMuted,
  },
});
