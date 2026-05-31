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
  PanResponder,
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

type HackathonItem = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  prize: string;
  participants: number;
  tag: string;
  color: string;
  description: string;
  location: string;
  deadline: string;
};

export default function Hackathons({ onBack }: HackathonsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonItem | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only set responder for horizontal swipes from the left edge
        return (
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          gestureState.x0 < 60 &&
          gestureState.dx > 0
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        // If swiped significantly to the right, navigate back
        if (gestureState.dx > 120) {
          onBack();
        }
      },
    })
  ).current;

  const filters = ['All', 'Artificial Intelligence', 'Web3', 'Design', 'Mobile'];

  const hackathons: HackathonItem[] = [
    {
      id: '1',
      title: 'Global AI Summit Challenge',
      organizer: 'Nexus AI',
      date: 'May 15 - 18, 2024',
      prize: '$10,000',
      participants: 450,
      tag: 'AI',
      color: '#1a1c1c',
      description: 'Join the world\'s leading AI innovators to build the next generation of intelligent systems. This 72-hour intensive hackathon challenges you to solve real-world problems using cutting-edge machine learning and predictive modeling.',
      location: 'Virtual',
      deadline: 'May 10, 2024'
    },
    {
      id: '2',
      title: 'Decentralized Future Hack',
      organizer: 'Ethereum Foundation',
      date: 'June 02 - 05, 2024',
      prize: '$25,000',
      participants: 1200,
      tag: 'Web3',
      color: '#3b3b3b',
      description: 'Pioneer the decentralized web. We are looking for innovative dApps, zero-knowledge proofs, and smart contract solutions that push the boundaries of blockchain technology and ensure privacy at scale.',
      location: 'Hybrid (Pune & Virtual)',
      deadline: 'May 25, 2024'
    },
    {
      id: '3',
      title: 'Creative UI Sprint',
      organizer: 'DesignX',
      date: 'June 10, 2024',
      prize: '$5,000',
      participants: 300,
      tag: 'Design',
      color: '#7a7a7a',
      description: 'A 24-hour design sprint focused on creating beautiful, accessible, and highly functional user interfaces. Redefine how users interact with technology through thoughtful design systems and micro-interactions.',
      location: 'Pune Tech Hub',
      deadline: 'June 01, 2024'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
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
            <TouchableOpacity 
              key={hack.id} 
              style={styles.hackCard}
              onPress={() => setSelectedHackathon(hack)}
            >
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
      </View>

      {selectedHackathon && (
        <View style={styles.detailOverlay}>
          <SafeAreaView style={styles.detailContainer}>
            <View style={styles.detailHeader}>
              <TouchableOpacity 
                onPress={() => setSelectedHackathon(null)}
                style={styles.closeBtn}
              >
                <Heroicon name="x" size={24} color="#1a1c1c" />
              </TouchableOpacity>
              <Text style={styles.detailHeaderTitle}>HACKATHON DETAILS</Text>
              <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
              <View style={[styles.detailTag, { backgroundColor: selectedHackathon.color }]}>
                <Text style={styles.detailTagText}>{selectedHackathon.tag}</Text>
              </View>
              <Text style={styles.detailTitle}>{selectedHackathon.title}</Text>
              
              <View style={styles.detailOrganizerBox}>
                <Text style={styles.detailOrganizerLabel}>Organized by</Text>
                <Text style={styles.detailOrganizerValue}>{selectedHackathon.organizer}</Text>
              </View>

              <View style={styles.detailGrid}>
                <View style={styles.detailGridItem}>
                  <View style={styles.gridIconBox}>
                    <Heroicon name="calendar" size={18} color="#1a1c1c" />
                  </View>
                  <Text style={styles.gridLabel}>Date</Text>
                  <Text style={styles.gridValue}>{selectedHackathon.date}</Text>
                </View>
                <View style={styles.detailGridItem}>
                  <View style={styles.gridIconBox}>
                    <Heroicon name="location-solid" size={18} color="#1a1c1c" />
                  </View>
                  <Text style={styles.gridLabel}>Location</Text>
                  <Text style={styles.gridValue}>{selectedHackathon.location}</Text>
                </View>
                <View style={styles.detailGridItem}>
                  <View style={styles.gridIconBox}>
                    <Heroicon name="user" size={18} color="#1a1c1c" />
                  </View>
                  <Text style={styles.gridLabel}>Participants</Text>
                  <Text style={styles.gridValue}>{selectedHackathon.participants}+</Text>
                </View>
                <View style={styles.detailGridItem}>
                  <View style={styles.gridIconBox}>
                    <Heroicon name="check-circle" size={18} color="#1a1c1c" />
                  </View>
                  <Text style={styles.gridLabel}>Prize Pool</Text>
                  <Text style={styles.gridValue}>{selectedHackathon.prize}</Text>
                </View>
              </View>

              <View style={styles.detailDivider} />
              
              <Text style={styles.detailSectionTitle}>About this Challenge</Text>
              <Text style={styles.detailDescription}>{selectedHackathon.description}</Text>
              
              <View style={styles.detailFooterInfo}>
                <Heroicon name="clock" size={14} color="#ff4b4b" />
                <Text style={styles.detailDeadline}>Registration closes on {selectedHackathon.deadline}</Text>
              </View>

              <TouchableOpacity style={styles.registerActionButton}>
                <Text style={styles.registerActionText}>Register Now</Text>
                <Heroicon name="arrow-right" size={16} color="#ffffff" />
              </TouchableOpacity>
              <View style={{ height: 40 }} />
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

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
    // No-Line Rule: Removed border
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
    // No-Line Rule: Removed border
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
    // No-Line Rule: Removed border
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
    marginTop: 12, // No-Line Rule: Added margin instead of border padding
    // No-Line Rule: Removed border
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
    borderRadius: 22,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    padding: 24,
  },
  detailTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailTagText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  detailTitle: {
    fontSize: 32,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    lineHeight: 36,
    marginBottom: 16,
  },
  detailOrganizerBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  detailOrganizerLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
    marginBottom: 4,
  },
  detailOrganizerValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  detailGridItem: {
    width: '47%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  gridIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
  },
  detailDivider: {
    width: 60,
    height: 4,
    backgroundColor: '#1a1c1c',
    marginBottom: 24,
    borderRadius: 2,
  },
  detailSectionTitle: {
    fontSize: 20,
    fontFamily: 'CabinetGrotesk-Bold',
    color: '#1a1c1c',
    marginBottom: 12,
  },
  detailDescription: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#444444',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailFooterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff0f0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 32,
    gap: 8,
  },
  detailDeadline: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ff4b4b',
  },
  registerActionButton: {
    backgroundColor: '#1a1c1c',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
  },
  registerActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});
