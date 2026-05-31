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

export default function News({ onBack }: { onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);
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
          onBack();
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

  const renderPage = (item: typeof newsItems[0], index: number) => {
    const isCurrent = index === currentIndex;
    const isNext = index === currentIndex + 1;

    // itemPos is 0 when current, 1 when next, -1 when flipped away
    const itemPos = Animated.subtract(index, scrollPos);

    const rotateY = itemPos.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-110deg', '0deg', '2deg'],
      extrapolate: 'clamp',
    });

    const rotateZ = itemPos.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-5deg', '0deg', '1deg'],
      extrapolate: 'clamp',
    });

    const opacity = itemPos.interpolate({
      inputRange: [-1, -0.8, 0, 1],
      outputRange: [0, 0.3, 1, 1],
      extrapolate: 'clamp',
    });

    const scale = itemPos.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    // Optimization: Don't render pages that are completely flipped away and invisible
    // This keeps performance high while allowing smooth back-swiping
    if (index < currentIndex - 1 || index > currentIndex + 1) {
       // We still need the Animated.View wrapper for consistency, but we can skip content
       // return null; // Actually, for only 4 items, let's just render them all for maximum stability
    }

    return (
      <Animated.View 
        key={item.id}
        style={[
          styles.pageContainer,
          { zIndex: newsItems.length - index },
          {
            transform: [
              { perspective: 2000 },
              { translateX: -(width - 30) / 2 }, // Move to pivot (left edge)
              { rotateY },
              { rotateZ },
              { translateX: (width - 30) / 2 }, // Move back
              { scale }
            ],
            opacity
          }
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
                {item.location} — <Text style={styles.bodyText}>{item.content}</Text>
              </Text>
              <View style={styles.authorSection}>
                <View style={styles.authorLine} />
                <Text style={styles.authorText}>Written by {item.author}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.viewDetailsBtn}
            onPress={() => setSelectedNews(item)}
          >
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LATEST EDITION</Text>
        <TouchableOpacity 
          onPress={() => {
            scrollPos.setValue(0);
            setCurrentIndex(0);
            setSelectedNews(null);
          }} 
          style={styles.refreshBtn}
        >
          <Heroicon name="refresh" size={18} color="#1a1c1c" />
        </TouchableOpacity>
      </View>

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
        <View style={styles.detailOverlay}>
          <SafeAreaView style={styles.detailContainer}>
            <View style={styles.detailHeader}>
              <TouchableOpacity 
                onPress={() => setSelectedNews(null)}
                style={styles.closeBtn}
              >
                <Heroicon name="x" size={24} color="#1a1c1c" />
              </TouchableOpacity>
              <Text style={styles.detailHeaderTitle}>NEWS DETAILS</Text>
              <View style={{ width: 44 }} />
            </View>

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
          </SafeAreaView>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: '#ffffff',
    // No-Line Rule: Removed border
    zIndex: 100,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 12,
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 2,
    color: '#1a1c1c',
  },
  newsStack: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    padding: 15,
  },
  pageContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
  },
  paperContent: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 4,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 8,
    borderLeftColor: '#f0f0f0',
  },
  masthead: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mastheadTitle: {
    fontSize: 28,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    letterSpacing: -1,
    marginBottom: 8,
  },
  mastheadDivider: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#1a1c1c',
    marginVertical: 4,
  },
  mastheadMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
  },
  metaText: {
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    letterSpacing: 0.5,
  },
  mainHeadline: {
    fontSize: 30,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    lineHeight: 32,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  contentSection: {
    flexDirection: 'row',
    flex: 1,
  },
  verticalRule: {
    width: 0.5,
    backgroundColor: '#d1d1d1',
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    lineHeight: 22,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    lineHeight: 21,
  },
  authorSection: {
    marginTop: 20,
  },
  authorLine: {
    width: 40,
    height: 1,
    backgroundColor: '#1a1c1c',
    marginBottom: 8,
  },
  authorText: {
    fontSize: 12,
    fontFamily: 'Inter-Italic',
    color: '#666666',
  },
  pageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    // No-Line Rule: Removed border
  },
  pageNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#9a9a9a',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  swipeIndicator: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  swipeText: {
    fontSize: 11,
    color: '#9a9a9a',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f5f5f7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',
  },
  dotActive: {
    backgroundColor: '#1a1c1c',
    width: 12,
  },
  endOfEdition: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  endText: {
    fontSize: 18,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  resetBtn: {
    backgroundColor: '#1a1c1c',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  resetBtnText: {
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
  },
  viewDetailsBtn: {
    backgroundColor: '#1a1c1c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'stretch',
    gap: 6,
  },
  viewDetailsText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  detailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    // No-Line Rule: Removed border
  },
  detailHeaderTitle: {
    fontSize: 12,
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 2,
    color: '#1a1c1c',
  },
  closeBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
    padding: 24,
  },
  detailCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#666666',
    letterSpacing: 1,
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 32,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    lineHeight: 36,
    marginBottom: 16,
  },
  detailDivider: {
    width: 60,
    height: 4,
    backgroundColor: '#1a1c1c',
    marginBottom: 24,
  },
  detailHeadline: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    lineHeight: 26,
    marginBottom: 20,
  },
  detailFullText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    lineHeight: 26,
  },
  detailFooter: {
    marginTop: 'auto',
    paddingTop: 24,
    // No-Line Rule: Removed border
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailAuthor: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
  },
  detailDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});
