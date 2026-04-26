import React, { useEffect, useRef } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
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
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export type DashboardProps = {
  onLogout: () => void;
  onProfileClick: () => void;
  onMenuClick: () => void;
  onNavigate: (screen: string) => void;
  userName?: string;
};

export default function Dashboard({ onProfileClick, onMenuClick, onNavigate, userName }: DashboardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const renderCard = (children: any, style: any = {}) => (
    <Animated.View style={[style, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable onPress={onMenuClick} style={styles.headerIcon}>
          <Heroicon name="menu" size={24} color="#1a1c1c" strokeWidth={2.5} />
        </AnimatedPressable>

        <Text style={styles.logoText}>TechPune</Text>
        <AnimatedPressable onPress={onProfileClick} style={styles.headerIcon}>
          <Heroicon name="user-solid" size={22} color="#1a1c1c" />
        </AnimatedPressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userNameHero}>{userName || 'User'}</Text>
          <Text style={styles.heroDescription}>
            A dedicated Platform for hackathons and daily Updates.
          </Text>
        </Animated.View>

        {/* Active Engagements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Engagements</Text>

          {/* Hackathon Card */}
          {renderCard(
            <View style={styles.activeCard}>
              <View style={styles.cardHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>HACKATHON</Text>
                </View>
                <Text style={styles.timeLeft}>Ends in 3 Days</Text>
              </View>
              <Text style={styles.cardMainTitle}>Global AI{'\n'}Summit{'\n'}Challenge</Text>
              <Text style={styles.cardDescription}>
                Developing predictive models for sustainable urban infrastructure.
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.avatars}>
                  <View style={[styles.avatar, { backgroundColor: '#1a1c1c' }]}>
                    <Text style={styles.avatarInitial}>JD</Text>
                  </View>
                  <View style={[styles.avatar, { backgroundColor: '#3b3b3b', marginLeft: -10 }]}>
                    <Text style={styles.avatarInitial}>AS</Text>
                  </View>
                  <View style={[styles.avatar, { backgroundColor: '#e2e2e2', marginLeft: -10 }]}>
                    <Text style={[styles.avatarInitial, { color: '#1a1c1c' }]}>+2</Text>
                  </View>
                </View>
                <AnimatedPressable>
                  <Text style={styles.workspaceLink}>Go to Workspace</Text>
                </AnimatedPressable>
              </View>
            </View>
          )}

          {/* Course Card */}
          {renderCard(
            <View style={[styles.activeCard, { backgroundColor: '#eeeeee' }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                  <Text style={styles.badgeText}>COURSE</Text>
                </View>
              </View>
              <Text style={styles.cardMainTitle}>Advanced Data{'\n'}Structures</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '65%' }]} />
                </View>
                <Text style={styles.progressText}>65% Complete</Text>
              </View>
              <AnimatedPressable activeOpacity={0.85}>
                <LinearGradient
                  colors={['#000000', '#3b3b3b']}
                  style={styles.resumeButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.resumeButtonText}>Resume Learning  →</Text>
                </LinearGradient>
              </AnimatedPressable>
            </View>
          )}
        </View>

        {/* Upcoming Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming{"\n"}Recommended</Text>
            <AnimatedPressable>
              <Text style={styles.viewAll}>View{"\n"}All</Text>
            </AnimatedPressable>
          </View>

          {/* Recommended Item 1 - Internship */}
          {renderCard(
            <View style={styles.recommendedItem}>
              <View style={styles.iconBox}>
                <Heroicon name="briefcase-solid" size={22} color="#3b3b3b" />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>Product Design Internship</Text>
                <Text style={styles.itemSubtitle}>TechFlow Studio • San Francisco (Hybrid)</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemStatus}>Closes in 2 weeks</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>High Match</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Recommended Item 2 - Webinar */}
          {renderCard(
            <View style={styles.recommendedItem}>
              <View style={styles.iconBox}>
                <Heroicon name="clipboard-document-solid" size={22} color="#3b3b3b" />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>The Future of Spatial Computing</Text>
                <Text style={styles.itemSubtitle}>Webinar • Hosted by Nexus XR</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemStatus}>Tomorrow, 10:00 AM</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Design Track</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Spacer for bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <BlurView intensity={100} tint="light" style={styles.bottomNavBlur}>
          <View style={styles.bottomNav}>
            <AnimatedPressable onPress={() => onNavigate('dashboard')} style={styles.navItemContainer}>
              <View style={styles.navIconContainerActive}>
                <Heroicon name="home-solid" size={22} color="#ffffff" />
              </View>
              <Text style={styles.navLabelActive}>DASHBOARD</Text>
            </AnimatedPressable>

            <AnimatedPressable onPress={() => onNavigate('hackathons')} style={styles.navItemContainer}>
              <View style={styles.navIconContainer}>
                <Heroicon name="terminal-solid" size={22} color="#3b3b3b" />
              </View>
              <Text style={styles.navLabel}>HACKATHONS</Text>
            </AnimatedPressable>

            <AnimatedPressable onPress={() => onNavigate('news')} style={styles.navItemContainer}>
              <View style={styles.navIconContainer}>
                <Heroicon name="bell-solid" size={22} color="#3b3b3b" />
              </View>
              <Text style={styles.navLabel}>NEWS</Text>
            </AnimatedPressable>

            <AnimatedPressable onPress={() => onNavigate('courses')} style={styles.navItemContainer}>
              <View style={styles.navIconContainer}>
                <Heroicon name="book-open-solid" size={22} color="#3b3b3b" />
              </View>
              <Text style={styles.navLabel}>COURSES</Text>
            </AnimatedPressable>
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  headerIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 14,
    letterSpacing: 1.5,
    color: '#1a1c1c',
    fontFamily: 'ClashDisplay-Bold',
    textTransform: 'uppercase',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  heroSection: {
    marginBottom: 26,
  },
  welcomeText: {
    fontSize: 42,
    color: '#1a1c1c',
    fontFamily: 'ClashDisplay-Bold',
    lineHeight: 46,
  },
  userNameHero: {
    fontSize: 34,
    color: '#1a1c1c',
    lineHeight: 38,
    marginBottom: 14,
    fontFamily: 'ClashDisplay-Bold',
  },
  heroDescription: {
    fontSize: 16,
    color: '#474747',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#1a1c1c',
    marginBottom: 18,
    fontFamily: 'CabinetGrotesk-Bold',
  },
  viewAll: {
    fontSize: 14,
    color: '#1a1c1c',
    textDecorationLine: 'underline',
    marginBottom: 18,
    fontFamily: 'Inter-Medium',
  },
  activeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#d6d4d3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10,
    color: '#1b1c1c',
    fontFamily: 'Inter-Semibold',
    letterSpacing: 1.0,
  },
  timeLeft: {
    fontSize: 12,
    color: '#5f5e5e',
    fontFamily: 'Inter-Regular',
  },
  cardMainTitle: {
    fontSize: 28,
    color: '#1a1c1c',
    marginBottom: 12,
    fontFamily: 'ClashDisplay-Bold',
    lineHeight: 30,
  },
  cardDescription: {
    fontSize: 14,
    color: '#474747',
    lineHeight: 20,
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 10,
    color: '#ffffff',
    fontFamily: 'Inter-Semibold',
  },
  workspaceLink: {
    fontSize: 14,
    color: '#1a1c1c',
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Semibold',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e2e2',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1a1c1c',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#5f5e5e',
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
  },
  resumeButton: {
    height: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Inter-Semibold',
  },
  recommendedItem: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: '#eeeeee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    color: '#1a1c1c',
    marginBottom: 4,
    fontFamily: 'CabinetGrotesk-Bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#474747',
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStatus: {
    fontSize: 12,
    color: '#5f5e5e',
    fontFamily: 'Inter-Medium',
  },
  statusBadge: {
    backgroundColor: '#d6d4d3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 10,
    color: '#1b1c1c',
    fontFamily: 'Inter-Semibold',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 12,
  },
  bottomNavBlur: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    width: '100%',
    height: 74,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  navItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  navIconContainerActive: {
    width: 42,
    height: 42,
    backgroundColor: '#1a1c1c',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 10,
    color: '#000000',
    opacity: 0.6,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Semibold',
  },
  navLabelActive: {
    fontSize: 10,
    color: '#000000',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Semibold',
  },
});
