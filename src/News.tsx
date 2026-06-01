import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';
import PageHeader from './components/PageHeader';
import DetailOverlay from './components/DetailOverlay';

const { width, height } = Dimensions.get('window');

const newsItems = [
  {
    id: '1',
    title: 'THE FUTURE OF AI: GPT-5 UNVEILED',
    category: 'TECH REVOLUTION',
    date: 'MONDAY, MAY 4, 2026',
    headline: 'OpenAI Stuns World with Reasoning Model',
    content: 'In a landmark announcement today, OpenAI revealed the developer preview of GPT-5. The model demonstrates unprecedented 10x reasoning capabilities, effectively bridging the gap between artificial and human-like logic. Early tests suggest it can solve complex mathematical proofs and generate production-ready code with minimal guidance.',
    location: 'Silicon Valley',
    author: 'Elena Rodriguez',
  },
  {
    id: '2',
    title: 'PUNE TECH HUB EXPANDS RAPIDLY',
    category: 'LOCAL GROWTH',
    date: 'TUESDAY, MAY 5, 2026',
    headline: '500-Acre Hinjewadi SEZ Gets Green Light',
    content: 'The Maharashtra government has finalized the MOU for a massive expansion of the Hinjewadi IT Park. This new 500-acre Special Economic Zone is expected to generate over 100,000 high-skill jobs in the next five years. Major giants like Google and Microsoft are reportedly in talks for anchor campuses in the new phase.',
    location: 'Pune, Maharashtra',
    author: 'Rahul Deshmukh',
  },
  {
    id: '3',
    title: 'WEB3: THE NEXT INTERNET FRONTIER',
    category: 'CRYPTO & WEB3',
    date: 'WEDNESDAY, MAY 6, 2026',
    headline: 'India Leads in Decentralized App Adoption',
    content: 'According to a recent report, India has emerged as the global leader in DApp user growth. The surge is driven by a young demographic and a robust developer ecosystem. Local startups are building innovative solutions for supply chain transparency and decentralized finance (DeFi), positioning the country as a Web3 powerhouse.',
    location: 'Global Market',
    author: 'Sarah Jenkins',
  },
  {
    id: '4',
    title: 'CYBERSECURITY: A GROWING THREAT',
    category: 'SECURITY WATCH',
    date: 'THURSDAY, MAY 7, 2026',
    headline: 'Quantum Encryption Becomes Necessary',
    content: 'As quantum computing hardware advances, traditional encryption methods are becoming vulnerable. Tech companies are now racing to implement post-quantum cryptography to secure sensitive data. Experts warn that the window for migration is closing faster than previously estimated.',
    location: 'Cyber Defense Center',
    author: 'James T. Kirk',
  }
];

export default function News({ onBack }: { onBack?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const scrollPos = useRef(new Animated.Value(0)).current;
  const currentIndexRef = useRef(0);
  const visibleIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    setVisibleIndex(currentIndex);
    visibleIndexRef.current = currentIndex;
  }, [currentIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const progress = -gestureState.dx / width;
        const targetPos = Math.max(0, Math.min(currentIndexRef.current + progress, newsItems.length));
        scrollPos.setValue(targetPos);
        
        // Update visible index for rendering
        const newVisible = Math.round(targetPos);
        if (newVisible !== visibleIndexRef.current) {
          visibleIndexRef.current = newVisible;
          setVisibleIndex(newVisible);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100 && currentIndexRef.current < newsItems.length) {
          // Success flip forward
          Animated.spring(scrollPos, {
            toValue: currentIndexRef.current + 1,
            useNativeDriver: true,
            friction: 8,
            tension: 40,
          }).start(() => {
            setCurrentIndex(prev => prev + 1);
          });
        } else if (gestureState.dx > 100 && currentIndexRef.current > 0) {
          // Success flip backward
          Animated.spring(scrollPos, {
            toValue: currentIndexRef.current - 1,
            useNativeDriver: true,
            friction: 8,
            tension: 40,
          }).start(() => {
            setCurrentIndex(prev => prev - 1);
          });
        } else if (gestureState.dx > 120 && currentIndexRef.current === 0 && gestureState.x0 < 60) {
          // Swipe back to dashboard from the first news page
          onBack?.();
        } else {
          // Snap back to current
          Animated.spring(scrollPos, {
            toValue: currentIndexRef.current,
            useNativeDriver: true,
            friction: 7,
            tension: 30,
          }).start();
        }
      },
    })
  ).current;

  const scrubberPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsScrubbing(true);
      },
      onPanResponderMove: (_, gestureState) => {
        const ratio = Math.max(0, Math.min(gestureState.moveX / width, 1));
        const targetPos = ratio * newsItems.length;
        scrollPos.setValue(targetPos);

        const newVisible = Math.round(targetPos);
        if (newVisible !== visibleIndexRef.current) {
          visibleIndexRef.current = newVisible;
          setVisibleIndex(newVisible);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        setIsScrubbing(false);
        const ratio = Math.max(0, Math.min(gestureState.moveX / width, 1));
        const targetIndex = Math.round(ratio * (newsItems.length));
        const finalIndex = Math.min(targetIndex, newsItems.length);
        
        Animated.spring(scrollPos, {
          toValue: finalIndex,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }).start(() => {
          setCurrentIndex(finalIndex);
        });
      },
      onPanResponderTerminate: () => {
        setIsScrubbing(false);
      }
    })
  ).current;

  const renderPage = (item: typeof newsItems[0], index: number) =>
    <NewsCard key={item.id} item={item} index={index} scrollPos={scrollPos} totalItems={newsItems.length} width={width} onViewDetails={setSelectedNews} />;

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="LATEST EDITION" />

      <View 
        style={styles.newsStack}
        {...panResponder.panHandlers}
      >
        {newsItems.map((item, index) => renderPage(item, index))}
        
        {visibleIndex === newsItems.length && (
           <View style={styles.endOfEdition}>
             <Heroicon name="check-circle" size={48} color="#1a1c1c" />
             <Text style={styles.endText}>You've read the entire edition!</Text>
             <TouchableOpacity 
               style={styles.resetBtn} 
               onPress={() => {
                 scrollPos.setValue(0);
                 setCurrentIndex(0);
                 setSelectedNews(null);
               }}
             >
               <Text style={styles.resetBtnText}>Read Again</Text>
             </TouchableOpacity>
           </View>
        )}
      </View>

      {selectedNews && (
        <DetailOverlay visible onClose={() => setSelectedNews(null)} title="NEWS DETAILS" bgColor="#f9f9f9">
          <View style={styles.detailContent}>
            <Text style={styles.detailCategory}>{selectedNews.category}</Text>
            <Text style={styles.detailTitle}>{selectedNews.title}</Text>
            <View style={styles.detailDivider} />
            <Text style={styles.detailHeadline}>{selectedNews.headline}</Text>
            <Text style={styles.detailFullText}>
              {selectedNews.location} — {selectedNews.content}
              {"\n\n"}
              Additional depth and context would go here in a real application. This detailed view provides a focused reading experience for the selected news item.
              {"\n\n"}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            
            <View style={styles.detailFooter}>
              <Text style={styles.detailAuthor}>By {selectedNews.author}</Text>
              <Text style={styles.detailDate}>{selectedNews.date}</Text>
            </View>
          </View>
        </DetailOverlay>
      )}

      <View 
        style={styles.swipeIndicator}
        {...scrubberPanResponder.panHandlers}
      >
        <Text style={styles.swipeText}>{isScrubbing ? "Scrubbing..." : "Slide to browse edition"}</Text>
        <View style={[styles.dotsRow, { backgroundColor: isScrubbing ? '#1a1c1c' : '#f5f5f7' }]}>
          {newsItems.map((_, i) => {
            const dotScale = scrollPos.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [1, 1.8, 1],
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollPos.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View 
                key={i} 
                style={[
                  styles.dot, 
                  { 
                    backgroundColor: isScrubbing ? '#ffffff' : '#1a1c1c',
                    opacity: dotOpacity,
                    transform: [{ scaleX: dotScale }]
                  }
                ]} 
              />
            );
          })}
          {/* Dot for the end screen */}
          {(() => {
            const i = newsItems.length;
            const dotScale = scrollPos.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [1, 1.8, 1],
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollPos.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View 
                key="end" 
                style={[
                  styles.dot, 
                  { 
                    backgroundColor: isScrubbing ? '#ffffff' : '#1a1c1c',
                    opacity: dotOpacity,
                    transform: [{ scaleX: dotScale }]
                  }
                ]} 
              />
            );
          })()}
        </View>
      </View>
    </SafeAreaView>
  );
}

function NewsCard({ item, index, scrollPos, totalItems, width, onViewDetails }: {
  item: typeof newsItems[0];
  index: number;
  scrollPos: Animated.Value;
  totalItems: number;
  width: number;
  onViewDetails: (item: typeof newsItems[0]) => void;
}) {
  const itemPos = useRef(Animated.subtract(index, scrollPos)).current;
  const rotateY = useRef(itemPos.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-110deg', '0deg', '2deg'], extrapolate: 'clamp' })).current;
  const rotateZ = useRef(itemPos.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-5deg', '0deg', '1deg'], extrapolate: 'clamp' })).current;
  const opacity = useRef(itemPos.interpolate({ inputRange: [-1, -0.8, 0, 1], outputRange: [0, 0.3, 1, 1], extrapolate: 'clamp' })).current;
  const scale = useRef(itemPos.interpolate({ inputRange: [-1, 0, 1], outputRange: [0.9, 1, 0.9], extrapolate: 'clamp' })).current;

  return (
    <Animated.View
      style={[
        styles.pageContainer,
        { zIndex: totalItems - index },
        {
          transform: [
            { perspective: 2000 },
            { translateX: -(width - 30) / 2 },
            { rotateY },
            { rotateZ },
            { translateX: (width - 30) / 2 },
            { scale },
          ],
          opacity,
        },
      ]}
    >
      <View style={styles.paperContent}>
        <View style={styles.masthead}>
          <Text style={styles.mastheadTitle}>TECHPUNE GAZETTE</Text>
          <View style={styles.mastheadDivider} />
          <View style={styles.mastheadMeta}>
            <Text style={styles.metaText}>{item.date}</Text>
            <Text style={styles.metaText}>{item.category}</Text>
          </View>
          <View style={styles.mastheadDivider} />
        </View>
        <Text style={styles.mainHeadline}>{item.headline}</Text>
        <View style={styles.contentSection}>
          <View style={styles.verticalRule} />
          <View style={styles.textContent}>
            <Text style={styles.locationText} numberOfLines={3}>
              {item.location} â€” <Text style={styles.bodyText}>{item.content}</Text>
            </Text>
            <View style={styles.authorSection}>
              <View style={styles.authorLine} />
              <Text style={styles.authorText}>Written by {item.author}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => onViewDetails(item)}>
          <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
          <Heroicon name="arrow-right" size={14} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.pageFooter}>
          <Text style={styles.pageNumber}>Page {item.id}</Text>
          <View style={styles.socialIcons}>
            <Heroicon name="heart" size={20} color="#1a1c1c" />
            <Heroicon name="share" size={20} color="#1a1c1c" />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  newsStack: { flex: 1, position: 'relative', overflow: 'hidden', padding: 16 },
  pageContainer: { position: 'absolute', top: 16, left: 16, right: 16, bottom: 16 },
  paperContent: { backgroundColor: '#ffffff', flex: 1, borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 6 },
  masthead: { alignItems: 'center', marginBottom: 20 },
  mastheadTitle: { fontSize: 20, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', letterSpacing: 2, marginBottom: 8 },
  mastheadDivider: { width: '80%', height: 1, backgroundColor: '#e0e0e0', marginVertical: 6 },
  mastheadMeta: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 4 },
  metaText: { fontSize: 10, fontFamily: 'Inter-Bold', color: '#777777', letterSpacing: 0.5 },
  mainHeadline: { fontSize: 24, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', lineHeight: 28, marginBottom: 16, textAlign: 'center' },
  contentSection: { flexDirection: 'row', flex: 1 },
  verticalRule: { width: 3, backgroundColor: '#1a1c1c', marginRight: 14, borderRadius: 2 },
  textContent: { flex: 1 },
  locationText: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#777777', lineHeight: 18, marginBottom: 12 },
  bodyText: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#474747', lineHeight: 20 },
  authorSection: { marginTop: 16 },
  authorLine: { width: 30, height: 2, backgroundColor: '#1a1c1c', marginBottom: 6 },
  authorText: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#5f5e5e' },
  pageFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  pageNumber: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#9a9a9a' },
  socialIcons: { flexDirection: 'row', gap: 16 },
  swipeIndicator: { paddingVertical: 14, alignItems: 'center', backgroundColor: '#fcfcfc' },
  swipeText: { fontSize: 11, color: '#999999', fontFamily: 'Inter-Medium', marginBottom: 10 },
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f0f0f0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#cccccc' },
  dotActive: { backgroundColor: '#1a1c1c', width: 12 },
  endOfEdition: { ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center', padding: 40 },
  endText: { fontSize: 18, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', textAlign: 'center', marginTop: 16, marginBottom: 24 },
  resetBtn: { backgroundColor: '#1a1c1c', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  resetBtnText: { color: '#ffffff', fontFamily: 'Inter-Bold' },
  viewDetailsBtn: { backgroundColor: '#1a1c1c', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, marginTop: 16, alignSelf: 'stretch', gap: 6 },
  viewDetailsText: { color: '#ffffff', fontSize: 12, fontFamily: 'Inter-Semibold' },
  detailContent: { flex: 1, padding: 24 },
  detailCategory: { fontSize: 10, fontFamily: 'Inter-Bold', color: '#777777', letterSpacing: 1.5, marginBottom: 8 },
  detailTitle: { fontSize: 24, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', lineHeight: 28, marginBottom: 16 },
  detailDivider: { width: 40, height: 3, backgroundColor: '#1a1c1c', marginBottom: 20 },
  detailHeadline: { fontSize: 18, fontFamily: 'CabinetGrotesk-Bold', color: '#1a1c1c', lineHeight: 24, marginBottom: 16 },
  detailFullText: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#474747', lineHeight: 22 },
  detailFooter: { marginTop: 'auto', paddingTop: 24, borderTopWidth: 1, borderTopColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between' },
  detailAuthor: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#1a1c1c' },
  detailDate: { fontSize: 12, fontFamily: 'Inter-Regular', color: '#999999' },
});

