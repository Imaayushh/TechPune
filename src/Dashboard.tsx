import React, { useEffect, useRef, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Heroicon } from './Heroicon';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from './context/AppContext';
import AnimatedPressable from './components/AnimatedPressable';
import PageHeader from './components/PageHeader';
import SectionHeader from './components/SectionHeader';
import Badge from './components/Badge';
import ProgressBar from './components/ProgressBar';
import { useFadeIn } from './hooks/useFadeIn';
import type { RootStackParamList } from './types';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAppContext();
  const [showPrompt, setShowPrompt] = useState(!user.isProfileComplete);
  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });

  const renderCard = (children: any, style: any = {}) => (
    <Animated.View style={[style, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="TECHPUNE" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Registration Prompt */}
        {showPrompt && !user.isProfileComplete && (
          <Animated.View style={[styles.promptContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <LinearGradient
              colors={['#1a1c1c', '#333333']}
              style={styles.promptGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.promptContent}>
                <View style={styles.promptIconCircle}>
                  <Heroicon name="user" size={20} color="#1a1c1c" />
                </View>
                <View style={styles.promptTextContainer}>
                  <Text style={styles.promptText}>
                    Complete your User Registration to access the platform.
                  </Text>
                </View>
              </View>
              <View style={styles.promptActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowPrompt(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.completeBtn}
                  onPress={() => {
                    setShowPrompt(false);
                    navigation.navigate('Profile');
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
          <Text style={styles.userNameHero}>{user.fullName || 'User'}</Text>
          <Text style={styles.heroDescription}>
            A dedicated Platform for hackathons and daily Updates.
          </Text>
        </Animated.View>

        {/* Ongoing Events Section */}
        <View style={styles.section}>
          <SectionHeader title="Ongoing Events" viewAllLabel="View All" onViewAll={() => navigation.navigate('Hackathons')} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToInterval={width - 40 + 16}
            snapToAlignment="start"
            disableIntervalMomentum={true}
          >
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#f5f5f7' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="HACKATHON" />
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
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#eeeeee' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="HACKATHON" />
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
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#e2e2e2' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="HACKATHON" />
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
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#d6d4d3' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="HACKATHON" />
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
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Hackathons')} style={{ width: '100%', marginTop: 16 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Ongoing Courses Section */}
        <View style={styles.section}>
          <SectionHeader title="Courses" viewAllLabel="View All" onViewAll={() => navigation.navigate('Courses')} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToInterval={width - 40 + 16}
            snapToAlignment="start"
            disableIntervalMomentum={true}
          >
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#f5f5f7' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="COURSE" />
                </View>
                <Text style={styles.cardMainTitle}>Advanced Data{'\n'}Structures</Text>
                  <ProgressBar percent={65} showLabel />
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
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#eeeeee' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="COURSE" />
                </View>
                <Text style={styles.cardMainTitle}>Modern UI{'\n'}Design Systems</Text>
                  <ProgressBar percent={40} showLabel />
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
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#e2e2e2' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="COURSE" />
                </View>
                <Text style={styles.cardMainTitle}>Full-Stack{'\n'}Mastery Hub</Text>
                  <ProgressBar percent={15} showLabel />
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
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
            {renderCard(
              <View style={[styles.activeCard, styles.horizontalCard, { backgroundColor: '#d6d4d3' }]}>
                <View style={styles.cardHeader}>
                  <Badge label="COURSE" />
                </View>
                <Text style={styles.cardMainTitle}>ML & Neural{'\n'}Networks</Text>
                  <ProgressBar percent={85} showLabel />
                <View style={styles.cardFooter}>
                  <View style={styles.avatars}>
                    <View style={[styles.avatar, { backgroundColor: '#333333' }]}>
                      <Text style={styles.avatarInitial}>GM</Text>
                    </View>
                  </View>
                </View>
                <AnimatedPressable activeOpacity={0.85} onPress={() => navigation.navigate('Courses')} style={{ width: '100%', marginTop: 12 }}>
                  <LinearGradient colors={['#1a1c1c', '#4a4c4c']} style={styles.resumeButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.resumeButtonText}>View Details  â†’</Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.section}>
          <SectionHeader title="Upcoming Events" />
          {renderCard(
            <View style={styles.recommendedItem}>
              <View style={styles.iconBox}>
                <Heroicon name="briefcase" size={22} color="#3b3b3b" />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>Product Design Internship</Text>
                <Text style={styles.itemSubtitle}>TechFlow Studio â€¢ San Francisco (Hybrid)</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemStatus}>Closes in 2 weeks</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>High Match</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {renderCard(
            <View style={styles.recommendedItem}>
              <View style={styles.iconBox}>
                <Heroicon name="clipboard-document" size={22} color="#3b3b3b" />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>The Future of Spatial Computing</Text>
                <Text style={styles.itemSubtitle}>Webinar â€¢ Hosted by Nexus XR</Text>
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

        <View style={{ height: 24 }} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 18 },
  heroSection: { marginBottom: 26 },
  welcomeText: { fontSize: 42, color: '#1a1c1c', fontFamily: 'ClashDisplay-Bold', lineHeight: 46 },
  userNameHero: { fontSize: 34, color: '#1a1c1c', lineHeight: 38, marginBottom: 14, fontFamily: 'ClashDisplay-Bold' },
  heroDescription: { fontSize: 16, color: '#474747', lineHeight: 24, fontFamily: 'Inter-Regular' },
  section: { marginBottom: 28 },
  activeCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 24, marginBottom: 20 },
  horizontalScroll: { paddingRight: 20 },
  horizontalCard: { width: width - 40, marginRight: 16, marginBottom: 0 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  timeLeft: { fontSize: 12, color: '#5f5e5e', fontFamily: 'Inter-Regular' },
  cardMainTitle: { fontSize: 28, color: '#1a1c1c', marginBottom: 12, fontFamily: 'ClashDisplay-Bold', lineHeight: 30 },
  cardDescription: { fontSize: 14, color: '#474747', lineHeight: 20, marginBottom: 20, fontFamily: 'Inter-Regular' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 },
  avatars: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  avatarInitial: { fontSize: 10, color: '#ffffff', fontFamily: 'Inter-Semibold' },
  progressContainer: { marginBottom: 20 },
  progressBar: { height: 6, backgroundColor: '#e2e2e2', borderRadius: 3, marginBottom: 8 },
  progressFill: { height: '100%', backgroundColor: '#1a1c1c', borderRadius: 3 },
  progressText: { fontSize: 12, color: '#5f5e5e', textAlign: 'right', fontFamily: 'Inter-Regular' },
  resumeButton: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', width: '100%' },
  resumeButtonText: { color: '#ffffff', fontSize: 15, fontFamily: 'Inter-Semibold' },
  recommendedItem: { flexDirection: 'row', marginBottom: 30 },
  iconBox: { width: 50, height: 50, backgroundColor: '#eeeeee', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 18, color: '#1a1c1c', marginBottom: 4, fontFamily: 'CabinetGrotesk-Bold' },
  itemSubtitle: { fontSize: 14, color: '#474747', marginBottom: 12, fontFamily: 'Inter-Regular' },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemStatus: { fontSize: 12, color: '#5f5e5e', fontFamily: 'Inter-Medium' },
  statusBadge: { backgroundColor: '#d6d4d3', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  statusBadgeText: { fontSize: 10, color: '#1b1c1c', fontFamily: 'Inter-Semibold' },
  promptContainer: { marginBottom: 20, borderRadius: 24, overflow: 'hidden', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20 },
  promptGradient: { padding: 20 },
  promptContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  promptIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  promptTextContainer: { flex: 1 },
  promptText: { color: '#ffffff', fontSize: 15, fontFamily: 'Inter-Medium', lineHeight: 20 },
  promptActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancelBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  cancelBtnText: { color: '#ffffff', fontSize: 14, fontFamily: 'Inter-Medium' },
  completeBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: '#ffffff' },
  completeBtnText: { color: '#1a1c1c', fontSize: 14, fontFamily: 'Inter-Bold' },
});


