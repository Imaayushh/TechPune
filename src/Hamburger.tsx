import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

type MenuItem = {
  title: string;
  icon: string;
  target: 'dashboard' | 'profile' | 'hackathons' | 'news' | 'guidance' | 'settings' | 'privacy' | 'help' | 'logout' | 'terms';
  active?: boolean;
  logout?: boolean;
};

export type HamburgerProps = {
  onBack: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onTermsClick?: () => void;
  userEmail?: string;
  userName?: string;
};

export default function Hamburger({ onBack, onLogout, onProfileClick, onTermsClick, userEmail, userName }: HamburgerProps) {
  const MenuSection = ({ title, items }: { title: string; items: MenuItem[] }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={`${item.target}-${index}`}
          style={[styles.menuItem, item.active && styles.activeMenuItem]}
          activeOpacity={0.85}
            onPress={() => {
              if (item.target === 'dashboard') onBack();
              else if (item.target === 'profile') onProfileClick();
              else if (item.target === 'terms') {
                onBack();
                if (onTermsClick) onTermsClick();
              }
              else if (item.target === 'logout') onLogout();
            }}
        >
          <View style={styles.iconContainer}>
            <Text style={[styles.menuIcon, item.logout && styles.menuIconLogout, item.active && styles.menuIconActive]}>
              {item.icon}
            </Text>
          </View>
          <Text style={[styles.menuText, item.logout && styles.menuTextLogout, item.active && styles.menuTextActive]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const mainItems: MenuItem[] = [
    { title: 'DASHBOARD', icon: '▣', target: 'dashboard', active: true },
    { title: 'HACKATHONS', icon: '▦', target: 'hackathons' },
    { title: 'NEWS', icon: '▤', target: 'news' },
    { title: 'GUIDANCE', icon: '◻', target: 'guidance' },
  ];

    const accountItems: MenuItem[] = [
      { title: 'Settings', icon: '⚙', target: 'settings' },
      { title: 'Privacy & Security', icon: '⟐', target: 'privacy' },
      { title: 'Help & Support', icon: '?', target: 'help' },
      { title: 'Terms & Conditions', icon: '📄', target: 'terms' },
      { title: 'Profile', icon: '⌁', target: 'profile' },
    ];

  const otherItems: MenuItem[] = [{ title: 'Log Out', icon: '↘', target: 'logout', logout: true }];

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onBack}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.drawerContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onBack} activeOpacity={0.85}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>⌁</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{userName || 'User'}</Text>
                <Text style={styles.userEmail}>{userEmail || 'scholar@university.edu'}</Text>
              </View>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <MenuSection title="MAIN" items={mainItems} />
            <View style={styles.divider} />
            <MenuSection title="ACCOUNT" items={accountItems} />
            <View style={styles.divider} />
            <MenuSection title="OTHER" items={otherItems} />
            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  drawerContainer: {
    width: width * 0.8,
    height,
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 6,
    paddingBottom: 18,
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 22,
    color: '#ffffff',
    fontFamily: 'Inter-Medium',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarEmoji: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Inter-Semibold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 26,
    color: '#ffffff',
    fontFamily: 'ClashDisplay-Bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#9a9a9a',
    fontFamily: 'Inter-Regular',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    color: '#9a9a9a',
    letterSpacing: 1.8,
    marginBottom: 15,
    marginLeft: 10,
    fontFamily: 'Inter-Semibold',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginHorizontal: 10,
    marginBottom: 20,
    opacity: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  activeMenuItem: {
    backgroundColor: '#121212',
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 18,
    color: '#e2e2e2',
    fontFamily: 'Inter-Semibold',
  },
  menuIconActive: { color: '#ffffff' },
  menuIconLogout: { color: '#ff4444' },
  menuText: {
    fontSize: 16,
    color: '#e2e2e2',
    fontFamily: 'CabinetGrotesk-Medium',
  },
  menuTextActive: { color: '#ffffff', fontFamily: 'CabinetGrotesk-Bold' },
  menuTextLogout: { color: '#ff4444' },
});
