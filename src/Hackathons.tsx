import React, { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Heroicon } from './Heroicon';
import AnimatedPressable from './components/AnimatedPressable';
import PageHeader from './components/PageHeader';
import SectionHeader from './components/SectionHeader';
import { useFadeIn } from './hooks/useFadeIn';
import DetailOverlay from './components/DetailOverlay';
import ActionButton from './components/ActionButton';
import Card from './components/Card';

const { width } = Dimensions.get('window');

type HackathonItem = {
  id: string; title: string; organizer: string; date: string; prize: string;
  participants: number; tag: string; color: string; description: string; location: string; deadline: string;
};

export default function Hackathons() {
  const navigation = useNavigation();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonItem | null>(null);
  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10 && Math.abs(g.dx) > Math.abs(g.dy) && g.x0 < 60 && g.dx > 0,
      onPanResponderRelease: (_, g) => { if (g.dx > 120) navigation.goBack(); },
    }),
  ).current;

  const filters = ['All', 'Artificial Intelligence', 'Web3', 'Design', 'Mobile'];

  const hackathons: HackathonItem[] = [
    { id: '1', title: 'Global AI Summit Challenge', organizer: 'Nexus AI', date: 'May 15 - 18, 2024', prize: '$10,000', participants: 450, tag: 'AI', color: '#1a1c1c', description: 'Join the world\'s leading AI innovators to build the next generation of intelligent systems. This 72-hour intensive hackathon challenges you to solve real-world problems using cutting-edge machine learning and predictive modeling.', location: 'Virtual', deadline: 'May 10, 2024' },
    { id: '2', title: 'Decentralized Future Hack', organizer: 'Ethereum Foundation', date: 'June 02 - 05, 2024', prize: '$25,000', participants: 1200, tag: 'Web3', color: '#3b3b3b', description: 'Pioneer the decentralized web. We are looking for innovative dApps, zero-knowledge proofs, and smart contract solutions that push the boundaries of blockchain technology and ensure privacy at scale.', location: 'Hybrid (Pune & Virtual)', deadline: 'May 25, 2024' },
    { id: '3', title: 'Creative UI Sprint', organizer: 'DesignX', date: 'June 10, 2024', prize: '$5,000', participants: 300, tag: 'Design', color: '#7a7a7a', description: 'A 24-hour design sprint focused on creating beautiful, accessible, and highly functional user interfaces. Redefine how users interact with technology through thoughtful design systems and micro-interactions.', location: 'Pune Tech Hub', deadline: 'June 01, 2024' },
  ];

  const filteredHackathons = useMemo(() => {
    if (activeFilter === 'All') return hackathons;
    return hackathons.filter(h => {
      const filterTag = activeFilter === 'Artificial Intelligence' ? 'AI' : activeFilter;
      return h.tag === filterTag;
    });
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        <PageHeader title="HACKATHONS" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {/* Featured Banner */}
            <View style={styles.featuredCard}>
              <View style={styles.featuredBadge}><Text style={styles.featuredBadgeText}>FEATURED</Text></View>
              <Text style={styles.featuredTitle}>Build the Next Generation of AI</Text>
              <Text style={styles.featuredSubtitle}>Join 5,000+ developers in the world's largest AI competition.</Text>
              <TouchableOpacity style={styles.registerBtn}><Text style={styles.registerBtnText}>Register Now</Text></TouchableOpacity>
            </View>

            {/* Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {filters.map((filter) => (
                <TouchableOpacity key={filter} onPress={() => setActiveFilter(filter)} style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}>
                  <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Hackathon List */}
            <SectionHeader title="Active Challenges" />
            {filteredHackathons.map((hack) => (
              <TouchableOpacity key={hack.id} style={styles.hackCard} onPress={() => setSelectedHackathon(hack)}>
                <View style={[styles.hackTag, { backgroundColor: hack.color }]}><Text style={styles.hackTagText}>{hack.tag}</Text></View>
                <Text style={styles.hackTitle}>{hack.title}</Text>
                <View style={styles.hackDetails}>
                  <View style={styles.detailItem}><Heroicon name="calendar" size={14} color="#9a9a9a" /><Text style={styles.detailText}>{hack.date}</Text></View>
                  <View style={styles.detailItem}><Heroicon name="user" size={14} color="#9a9a9a" /><Text style={styles.detailText}>{hack.participants} Joined</Text></View>
                </View>
                <View style={styles.hackFooter}>
                  <Text style={styles.prizeText}>Prize: <Text style={styles.prizeValue}>{hack.prize}</Text></Text>
                  <View style={styles.arrowCircle}><Heroicon name="chevron-right" size={14} color="#ffffff" /></View>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      {selectedHackathon && (
        <DetailOverlay visible onClose={() => setSelectedHackathon(null)} title="HACKATHON DETAILS">
          <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
            <View style={[styles.detailTag, { backgroundColor: selectedHackathon.color }]}><Text style={styles.detailTagText}>{selectedHackathon.tag}</Text></View>
            <Text style={styles.detailTitle}>{selectedHackathon.title}</Text>
            <View style={styles.detailOrganizerBox}>
              <Text style={styles.detailOrganizerLabel}>Organized by</Text>
              <Text style={styles.detailOrganizerValue}>{selectedHackathon.organizer}</Text>
            </View>
            <View style={styles.detailGrid}>
              <View style={styles.detailGridItem}>
                <View style={styles.gridIconBox}><Heroicon name="calendar" size={18} color="#1a1c1c" /></View>
                <Text style={styles.gridLabel}>Date</Text>
                <Text style={styles.gridValue}>{selectedHackathon.date}</Text>
              </View>
              <View style={styles.detailGridItem}>
                <View style={styles.gridIconBox}><Heroicon name="location" size={18} color="#1a1c1c" /></View>
                <Text style={styles.gridLabel}>Location</Text>
                <Text style={styles.gridValue}>{selectedHackathon.location}</Text>
              </View>
              <View style={styles.detailGridItem}>
                <View style={styles.gridIconBox}><Heroicon name="user" size={18} color="#1a1c1c" /></View>
                <Text style={styles.gridLabel}>Participants</Text>
                <Text style={styles.gridValue}>{selectedHackathon.participants}</Text>
              </View>
              <View style={styles.detailGridItem}>
                <View style={styles.gridIconBox}><Heroicon name="check-circle" size={18} color="#1a1c1c" /></View>
                <Text style={styles.gridLabel}>Prize Pool</Text>
                <Text style={styles.gridValue}>{selectedHackathon.prize}</Text>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <Text style={styles.detailSectionTitle}>About this Hackathon</Text>
            <Text style={styles.detailDescription}>{selectedHackathon.description}</Text>
            <View style={styles.detailFooterInfo}>
              <Heroicon name="clock" size={14} color="#ff4b4b" />
              <Text style={styles.detailDeadline}>Registration closes on {selectedHackathon.deadline}</Text>
            </View>
            <ActionButton label="Register Now" style={{ marginTop: 0 }} />
            <View style={{ height: 40 }} />
          </ScrollView>
        </DetailOverlay>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  scrollContent: { padding: 20 },
  featuredCard: { backgroundColor: '#1a1c1c', borderRadius: 24, padding: 24, marginBottom: 24 },
  featuredBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 16 },
  featuredBadgeText: { color: '#ffffff', fontSize: 10, fontFamily: 'Inter-Bold', letterSpacing: 1 },
  featuredTitle: { fontSize: 24, color: '#ffffff', fontFamily: 'ClashDisplay-Bold', marginBottom: 8 },
  featuredSubtitle: { fontSize: 14, color: '#9a9a9a', lineHeight: 20, marginBottom: 20, fontFamily: 'Inter-Medium' },
  registerBtn: { backgroundColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, alignSelf: 'flex-start' },
  registerBtnText: { color: '#1a1c1c', fontSize: 14, fontFamily: 'Inter-Bold' },
  filterScroll: { marginBottom: 24 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: '#f5f5f7', marginRight: 8 },
  activeFilterChip: { backgroundColor: '#1a1c1c' },
  filterText: { fontSize: 13, fontFamily: 'Inter-Semibold', color: '#666666' },
  activeFilterText: { color: '#ffffff' },
  hackCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  hackTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 12 },
  hackTagText: { color: '#ffffff', fontSize: 10, fontFamily: 'Inter-Bold' },
  hackTitle: { fontSize: 18, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', marginBottom: 12 },
  hackDetails: { flexDirection: 'row', marginBottom: 16, gap: 16 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 12, color: '#666666', fontFamily: 'Inter-Medium' },
  hackFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 },
  prizeText: { fontSize: 13, color: '#666666', fontFamily: 'Inter-Medium' },
  prizeValue: { color: '#1a1c1c', fontFamily: 'Inter-Bold' },
  arrowCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#1a1c1c', justifyContent: 'center', alignItems: 'center' },
  detailTag: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 16 },
  detailTagText: { color: '#ffffff', fontSize: 12, fontFamily: 'Inter-Bold' },
  detailTitle: { fontSize: 32, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', lineHeight: 36, marginBottom: 16 },
  detailOrganizerBox: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 16, marginBottom: 24 },
  detailOrganizerLabel: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#666666', marginBottom: 4 },
  detailOrganizerValue: { fontSize: 16, fontFamily: 'Inter-Bold', color: '#1a1c1c' },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
  detailGridItem: { width: '47%', backgroundColor: '#ffffff', padding: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  gridIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f5f5f7', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  gridLabel: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#666666', marginBottom: 4 },
  gridValue: { fontSize: 14, fontFamily: 'Inter-Bold', color: '#1a1c1c' },
  detailDivider: { width: 60, height: 4, backgroundColor: '#1a1c1c', marginBottom: 24, borderRadius: 2 },
  detailSectionTitle: { fontSize: 20, fontFamily: 'CabinetGrotesk-Bold', color: '#1a1c1c', marginBottom: 12 },
  detailDescription: { fontSize: 15, fontFamily: 'Inter-Regular', color: '#595959', lineHeight: 24, marginBottom: 24 },
  detailFooterInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff0f0', padding: 12, borderRadius: 12, marginBottom: 32, gap: 8 },
  detailDeadline: { fontSize: 12, fontFamily: 'Inter-Bold', color: '#ff4b4b' },
});
