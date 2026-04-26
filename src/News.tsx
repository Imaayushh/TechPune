import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';

const { width } = Dimensions.get('window');

// Reusable Animated Button Wrapper
const AnimatedPressable = ({ children, onPress, style, activeOpacity = 0.8 }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export type NewsProps = {
  onBack: () => void;
};

export default function News({ onBack }: NewsProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const newsItems = [
    {
      id: '1',
      title: 'OpenAI Announces GPT-5 Developer Preview',
      category: 'TECH NEWS',
      time: '2h ago',
      description: 'The next generation of language models promises 10x reasoning capabilities and multi-modal integration.',
      author: 'TechPune Edit'
    },
    {
      id: '2',
      title: 'Pune Tech Hub Expansion: New SEZ Announced',
      category: 'LOCAL',
      time: '5h ago',
      description: 'Maharashtra government signs MOU for a massive 500-acre technology park near Hinjewadi.',
      author: 'Pune Mirror'
    },
    {
      id: '3',
      title: 'The Rise of Rust in System Programming',
      category: 'PROGRAMMING',
      time: 'Yesterday',
      description: 'Why major tech giants are migrating their core infrastructure to memory-safe languages.',
      author: 'DevDigest'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AnimatedPressable onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#1a1c1c" />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>DAILY NEWS</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Top Story */}
          <View style={styles.topStory}>
            <View style={styles.topStoryOverlay}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE UPDATES</Text>
              </View>
              <Text style={styles.topStoryTitle}>Future of Web3 Development in India</Text>
              <Text style={styles.topStoryMeta}>1,200 people reading now</Text>
            </View>
          </View>

          {/* News Feed */}
          <Text style={styles.sectionTitle}>Latest Stories</Text>
          {newsItems.map((news) => (
            <TouchableOpacity key={news.id} style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <Text style={styles.newsCategory}>{news.category}</Text>
                <Text style={styles.newsTime}>{news.time}</Text>
              </View>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsDescription} numberOfLines={2}>
                {news.description}
              </Text>
              <View style={styles.newsFooter}>
                <Text style={styles.newsAuthor}>By {news.author}</Text>
                <TouchableOpacity>
                  <Heroicon name="heart" size={18} color="#9a9a9a" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 1.5,
    color: '#1a1c1c',
  },
  scrollContent: {
    padding: 20,
  },
  topStory: {
    height: 200,
    backgroundColor: '#1a1c1c',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  topStoryOverlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4b4b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  liveText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  topStoryTitle: {
    fontSize: 22,
    color: '#ffffff',
    fontFamily: 'ClashDisplay-Bold',
    marginBottom: 4,
  },
  topStoryMeta: {
    fontSize: 12,
    color: '#9a9a9a',
    fontFamily: 'Inter-Medium',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'CabinetGrotesk-Bold',
    color: '#1a1c1c',
    marginBottom: 16,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f5f5f7',
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  newsCategory: {
    fontSize: 10,
    color: '#9a9a9a',
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  newsTime: {
    fontSize: 10,
    color: '#9a9a9a',
    fontFamily: 'Inter-Medium',
  },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    lineHeight: 22,
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
    marginBottom: 16,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f7',
  },
  newsAuthor: {
    fontSize: 12,
    color: '#1a1c1c',
    fontFamily: 'Inter-Semibold',
  },
});
