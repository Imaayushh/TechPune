import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
  isProfileComplete?: boolean;
};

export default function Dashboard({ onProfileClick, onMenuClick, onNavigate, userName, isProfileComplete }: DashboardProps) {
  const insets = useSafeAreaInsets();
  const [showPrompt, setShowPrompt] = useState(!isProfileComplete);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const fabAnim = useRef(new Animated.Value(0)).current;

  const toggleFab = () => {
    const toValue = isFabOpen ? 0 : 1;
    setIsFabOpen(!isFabOpen);
    Animated.timing(fabAnim, {
      toValue,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

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
        {/* Registration Prompt */}
        {showPrompt && !isProfileComplete && (
          <Animated.View style={[styles.promptContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <LinearGradient
              colors={['#1a1c1c', '#333333']}
              style={styles.promptGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.promptContent}>
                <View style={styles.promptIconCircle}>
                  <Heroicon name="user-solid" size={20} color="#000" />
                </View>
                <View style={styles.promptTextContainer}>
                  <Text style={styles.promptText}>
                    Complete your User Registration to access the platform.
                  </Text>
                </View>
              </View>
              <View style={styles.promptActions}>
                <TouchableOpacity 
                  style={styles.cancelBtn} 
                  onPress={() => setShowPrompt(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.completeBtn} 
                  onPress={() => {
                    setShowPrompt(false);
                    onProfileClick();
                  }}
                >
                  <Text style={styles.completeBtnText}>Complete</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userNameHero}>{userName || 'User'}</Text>
          <Text style={styles.heroDescription}>
            A dedicated Platform for hackathons and daily Updates.
          </Text>
        </Animated.View>

        {/* Ongoing Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ongoing Events</Text>
            <AnimatedPressable onPress={() => onNavigate('hackathons')}>
              <Text style={styles.viewAll}>View All</Text>
            </AnimatedPressable>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToInterval={width - 40 + 16}
            snapToAlignment="start"
            disableIntervalMomentum={true}
          >
            {/* Hackathon Card 1 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#f5f5f7' }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
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
                </View>

                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}

            {/* Hackathon Card 2 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#eeeeee' }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                    <Text style={styles.badgeText}>HACKATHON</Text>
                  </View>
                  <Text style={styles.timeLeft}>Starts Tomorrow</Text>
                </View>
                <Text style={styles.cardMainTitle}>Web3 Identity{'\n'}Privacy{'\n'}Sprint</Text>
                <Text style={styles.cardDescription}>
                  Innovating zero-knowledge proofs for decentralized identification.
                </Text>
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#4a4c4c' }]}>
                      <Text style={styles.avatarInitial}>MK</Text>
                    </View>
                    <View style={[styles.avatar, { backgroundColor: '#7a7a7a', marginLeft: -10 }]}>
                      <Text style={styles.avatarInitial}>TR</Text>
                    </View>
                  </View>
                </View>

                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}

            {/* Hackathon Card 3 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#e2e2e2' }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                    <Text style={styles.badgeText}>HACKATHON</Text>
                  </View>
                  <Text style={styles.timeLeft}>Ends in 5 Days</Text>
                </View>
                <Text style={styles.cardMainTitle}>AI for{'\n'}Healthcare{'\n'}Summit</Text>
                <Text style={styles.cardDescription}>
                  Building diagnostics tools powered by neural networks.
                </Text>
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#1a1c1c' }]}>
                      <Text style={styles.avatarInitial}>RN</Text>
                    </View>
                    <View style={[styles.avatar, { backgroundColor: '#5f5e5e', marginLeft: -10 }]}>
                      <Text style={styles.avatarInitial}>PL</Text>
                    </View>
                  </View>
                </View>

                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}

            {/* Hackathon Card 4 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#d6d4d3' }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                    <Text style={styles.badgeText}>HACKATHON</Text>
                  </View>
                  <Text style={styles.timeLeft}>Ends in 1 Week</Text>
                </View>
                <Text style={styles.cardMainTitle}>Eco-Tech{'\n'}Innovation{'\n'}Challenge</Text>
                <Text style={styles.cardDescription}>
                  Green energy solutions for local urban power grids.
                </Text>
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#333333' }]}>
                      <Text style={styles.avatarInitial}>GM</Text>
                    </View>
                  </View>
                </View>

                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Ongoing Courses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Courses</Text>
            <AnimatedPressable onPress={() => onNavigate('courses')}>
              <Text style={styles.viewAll}>View All</Text>
            </AnimatedPressable>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToInterval={width - 40 + 16}
            snapToAlignment="start"
            disableIntervalMomentum={true}
          >
            {/* Course Card 1 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#f5f5f7' }]}>
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
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#1a1c1c' }]}>
                      <Text style={styles.avatarInitial}>JD</Text>
                    </View>
                    <View style={[styles.avatar, { backgroundColor: '#3b3b3b', marginLeft: -10 }]}>
                      <Text style={styles.avatarInitial}>AS</Text>
                    </View>
                  </View>
                </View>
                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}

            {/* Course Card 2 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#eeeeee' }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                    <Text style={styles.badgeText}>COURSE</Text>
                  </View>
                </View>
                <Text style={styles.cardMainTitle}>Modern UI{'\n'}Design Systems</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '40%' }]} />
                  </View>
                  <Text style={styles.progressText}>40% Complete</Text>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#4a4c4c' }]}>
                      <Text style={styles.avatarInitial}>MK</Text>
                    </View>
                    <View style={[styles.avatar, { backgroundColor: '#7a7a7a', marginLeft: -10 }]}>
                      <Text style={styles.avatarInitial}>TR</Text>
                    </View>
                  </View>
                </View>
                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}

            {/* Course Card 3 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#e2e2e2' }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                    <Text style={styles.badgeText}>COURSE</Text>
                  </View>
                </View>
                <Text style={styles.cardMainTitle}>Full-Stack{'\n'}Mastery Hub</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '15%' }]} />
                  </View>
                  <Text style={styles.progressText}>15% Complete</Text>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#1a1c1c' }]}>
                      <Text style={styles.avatarInitial}>RN</Text>
                    </View>
                    <View style={[styles.avatar, { backgroundColor: '#5f5e5e', marginLeft: -10 }]}>
                      <Text style={styles.avatarInitial}>PL</Text>
                    </View>
                  </View>
                </View>
                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}

            {/* Course Card 4 */}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#d6d4d3' }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: '#ffffff' }]}>
                    <Text style={styles.badgeText}>COURSE</Text>
                  </View>
                </View>
                <Text style={styles.cardMainTitle}>ML & Neural{'\n'}Networks</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '85%' }]} />
                  </View>
                  <Text style={styles.progressText}>85% Complete</Text>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#333333' }]}>
                      <Text style={styles.avatarInitial}>GM</Text>
                    </View>
                  </View>
                </View>
                <AnimatedPressable activeOpacity={0.85} onPress={() => onNavigate('courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient
                    colors={['#1a1c1c', '#4a4c4c']}
                    style={styles.resumeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.resumeButtonText}>View Details  →</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
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
        <View style={{ height: 180 }} />
      </ScrollView>

      {/* FAB Overlay & Menu */}
      {isFabOpen && (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 100 }]}>
          <TouchableWithoutFeedback onPress={toggleFab}>
            <Animated.View style={[styles.fabBackdrop, { opacity: fabAnim }]} />
          </TouchableWithoutFeedback>
          
          <Animated.View style={[
            styles.fabMenu,
            {
              opacity: fabAnim,
              transform: [
                { scale: fabAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) },
                { translateY: fabAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }
              ],
              bottom: 185 + insets.bottom // positioned above the FAB with generous spacing
            }
          ]} pointerEvents="box-none">
            <TouchableOpacity 
              activeOpacity={0.9}
              style={styles.fabMenuItem} 
              onPress={() => {
                toggleFab();
                onNavigate('uploadLecture');
              }}
            >
              <Text style={styles.fabMenuLabel}>Upload Guidance Lectures</Text>
              <View style={styles.fabMenuIcon}>
                <Heroicon name="academic-cap" size={20} color="#1a1c1c" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.9}
              style={styles.fabMenuItem} 
              onPress={() => {
                toggleFab();
                onNavigate('uploadCourse');
              }}
            >
              <Text style={styles.fabMenuLabel}>Upload Courses</Text>
              <View style={styles.fabMenuIcon}>
                <Heroicon name="book-open-solid" size={20} color="#1a1c1c" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.9}
              style={styles.fabMenuItem} 
              onPress={() => {
                toggleFab();
                onNavigate('uploadHackathon');
              }}
            >
              <Text style={styles.fabMenuLabel}>Upload Hackathon</Text>
              <View style={styles.fabMenuIcon}>
                <Heroicon name="terminal-solid" size={20} color="#1a1c1c" />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Main FAB */}
      <View style={[styles.fabContainer, { bottom: 115 + insets.bottom }]}>
        <AnimatedPressable onPress={toggleFab} style={{
          transform: [{
            rotate: fabAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg']
            })
          }]
        }}>
          <LinearGradient
            colors={['#1a1c1c', '#4a4c4c']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Heroicon name="plus" size={24} color="#ffffff" strokeWidth={2.5} />
          </LinearGradient>
        </AnimatedPressable>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNavContainer, { bottom: 20 + insets.bottom }]}>
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
    fontFamily: 'CabinetGrotesk-Bold',
  },
  viewAll: {
    fontSize: 14,
    color: '#1a1c1c',
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Medium',
  },
  activeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  horizontalCard: {
    width: width - 40,
    marginRight: 16,
    marginBottom: 0,
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
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    // No-Line Rule: Removed border
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
  promptContainer: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  promptGradient: {
    padding: 20,
  },
  promptContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  promptIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  promptTextContainer: {
    flex: 1,
  },
  promptText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
  },
  promptActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cancelBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  completeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  completeBtnText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 101,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(249, 249, 249, 0.85)',
  },
  fabMenu: {
    position: 'absolute',
    right: 20,
    alignItems: 'flex-end',
    zIndex: 101,
  },
  fabMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  fabMenuLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Semibold',
    color: '#1a1c1c',
    marginRight: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  fabMenuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});


