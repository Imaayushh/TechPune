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
  const flipAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          // Swiping left to turn page
          const progress = Math.min(Math.abs(gestureState.dx) / width, 1);
          flipAnim.setValue(progress);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100 && currentIndex < newsItems.length - 1) {
          // Success flip
          Animated.timing(flipAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(prev => prev + 1);
            flipAnim.setValue(0);
          });
        } else {
          // Snap back
          Animated.spring(flipAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 10,
          }).start();
        }
      },
    })
  ).current;

  const renderPage = (item: typeof newsItems[0], index: number) => {
    if (index < currentIndex) return null;
    
    const isCurrent = index === currentIndex;
    const isNext = index === currentIndex + 1;

    // Animation for current page flipping away
    const rotateY = flipAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-120deg'],
    });

    const opacity = flipAnim.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 0.3, 0],
    });

    const scale = flipAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
    });

    // Animation for next page appearing underneath
    const nextScale = flipAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1],
    });

    const nextOpacity = flipAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 0.8, 1],
    });

    return (
      <Animated.View 
        key={item.id}
        style={[
          styles.pageContainer,
          { zIndex: newsItems.length - index },
          isCurrent && {
            transform: [
              { perspective: 1500 },
              { translateX: -width / 2 },
              { rotateY },
              { translateX: width / 2 },
              { scale }
            ],
            opacity
          },
          isNext && {
            transform: [{ scale: nextScale }],
            opacity: nextOpacity,
          },
          !isCurrent && !isNext && index > currentIndex && { display: 'none' }
        ]}
        {...(isCurrent ? panResponder.panHandlers : {})}
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
              <Text style={styles.locationText}>
                {item.location} — <Text style={styles.bodyText}>{item.content}</Text>
              </Text>
              <View style={styles.authorSection}>
                <View style={styles.authorLine} />
                <Text style={styles.authorText}>Written by {item.author}</Text>
              </View>
            </View>
          </View>

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
          onPress={() => setCurrentIndex(0)} 
          style={styles.refreshBtn}
        >
          <Heroicon name="refresh" size={18} color="#1a1c1c" />
        </TouchableOpacity>
      </View>

      <View style={styles.newsStack}>
        {newsItems.map((item, index) => renderPage(item, index))}
        
        {currentIndex === newsItems.length - 1 && (
           <View style={styles.endOfEdition}>
             <Heroicon name="check-circle" size={48} color="#1a1c1c" />
             <Text style={styles.endText}>You've read the entire edition!</Text>
             <TouchableOpacity style={styles.resetBtn} onPress={() => setCurrentIndex(0)}>
               <Text style={styles.resetBtnText}>Read Again</Text>
             </TouchableOpacity>
           </View>
        )}
      </View>

      <View style={styles.swipeIndicator}>
        <Text style={styles.swipeText}>Swipe edge to turn page</Text>
        <View style={styles.dotsRow}>
          {newsItems.map((_, i) => (
            <View 
              key={i} 
              style={[styles.dot, i === currentIndex && styles.dotActive]} 
            />
          ))}
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
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
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
    borderTopWidth: 0.5,
    borderTopColor: '#d1d1d1',
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
    gap: 6,
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
    flex: 1,
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
});
