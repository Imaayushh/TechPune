import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';
import { BlurView } from 'expo-blur';

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

export type HackathonsProps = {
  onBack: () => void;
};

export default function Hackathons({ onBack }: HackathonsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const filters = ['All', 'Artificial Intelligence', 'Web3', 'Design', 'Mobile'];

  const hackathons = [
    {
      id: '1',
      title: 'Global AI Summit Challenge',
      organizer: 'Nexus AI',
      date: 'May 15 - 18, 2024',
      prize: '$10,000',
      participants: 450,
      tag: 'AI',
      color: '#1a1c1c'
    },
    {
      id: '2',
      title: 'Decentralized Future Hack',
      organizer: 'Ethereum Foundation',
      date: 'June 02 - 05, 2024',
      prize: '$25,000',
      participants: 1200,
      tag: 'Web3',
      color: '#3b3b3b'
    },
    {
      id: '3',
      title: 'Creative UI Sprint',
      organizer: 'DesignX',
      date: 'June 10, 2024',
      prize: '$5,000',
      participants: 300,
      tag: 'Design',
      color: '#7a7a7a'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AnimatedPressable onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#1a1c1c" />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>HACKATHONS</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Featured Banner */}
          <View style={styles.featuredCard}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>FEATURED</Text>
            </View>
            <Text style={styles.featuredTitle}>Build the Next Generation of AI</Text>
            <Text style={styles.featuredSubtitle}>Join 5,000+ developers in the world's largest AI competition.</Text>
            <TouchableOpacity style={styles.registerBtn}>
              <Text style={styles.registerBtnText}>Register Now</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Hackathon List */}
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          {hackathons.map((hack) => (
            <TouchableOpacity key={hack.id} style={styles.hackCard}>
              <View style={[styles.hackTag, { backgroundColor: hack.color }]}>
                <Text style={styles.hackTagText}>{hack.tag}</Text>
              </View>
              <Text style={styles.hackTitle}>{hack.title}</Text>
              <View style={styles.hackDetails}>
                <View style={styles.detailItem}>
                  <Heroicon name="calendar" size={14} color="#9a9a9a" />
                  <Text style={styles.detailText}>{hack.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Heroicon name="user" size={14} color="#9a9a9a" />
                  <Text style={styles.detailText}>{hack.participants} Joined</Text>
                </View>
              </View>
              <View style={styles.hackFooter}>
                <Text style={styles.prizeText}>Prize: <Text style={styles.prizeValue}>{hack.prize}</Text></Text>
                <View style={styles.arrowCircle}>
                  <Heroicon name="chevron-right" size={14} color="#ffffff" />
                </View>
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
    backgroundColor: '#fcfcfc',
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
  featuredCard: {
    backgroundColor: '#1a1c1c',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  featuredBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'ClashDisplay-Bold',
    marginBottom: 8,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#9a9a9a',
    lineHeight: 20,
    marginBottom: 20,
    fontFamily: 'Inter-Medium',
  },
  registerBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  registerBtnText: {
    color: '#1a1c1c',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  filterScroll: {
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f5f5f7',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  activeFilterChip: {
    backgroundColor: '#1a1c1c',
    borderColor: '#1a1c1c',
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'Inter-Semibold',
    color: '#666666',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'CabinetGrotesk-Bold',
    color: '#1a1c1c',
    marginBottom: 16,
  },
  hackCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  hackTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  hackTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  hackTitle: {
    fontSize: 18,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    marginBottom: 12,
  },
  hackDetails: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Inter-Medium',
  },
  hackFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f7',
  },
  prizeText: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'Inter-Medium',
  },
  prizeValue: {
    color: '#1a1c1c',
    fontFamily: 'Inter-Bold',
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1a1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
