import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';

const { width, height } = Dimensions.get('window');

// Reusable Animated Button Wrapper
const AnimatedPressable = ({ children, onPress, style, activeOpacity = 0.7 }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
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
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

type MenuItem = {
  title: string;
  icon: string;
  target: string;
  active?: boolean;
  logout?: boolean;
};

export type HamburgerProps = {
  onBack: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onSecurityClick: () => void;
  onNotificationsClick: () => void;
  onDashboardClick: () => void;
  onHackathonsClick: () => void;
  onNewsClick: () => void;
  onCoursesClick: () => void;
  onTermsClick: () => void;
  currentView: string;
  userEmail?: string;
  userName?: string;
};

export default function Hamburger({ 
  onBack, 
  onLogout, 
  onProfileClick, 
  onSettingsClick, 
  onSecurityClick,
  onNotificationsClick,
  onDashboardClick,
  onHackathonsClick,
  onNewsClick,
  onCoursesClick,
  onTermsClick,
  currentView,
  userEmail, 
  userName 
}: HamburgerProps) {
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 10,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -width * 0.8,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => onBack());
  };

  const renderMenuItem = (item: MenuItem, index: number) => (
    <AnimatedPressable
      key={`${item.target}-${index}`}
      style={[styles.menuItem, item.active && styles.activeMenuItem]}
      onPress={() => {
        if (item.target === 'dashboard') onDashboardClick();
        else if (item.target === 'profile') onProfileClick();
        else if (item.target === 'settings') onSettingsClick();
        else if (item.target === 'security') onSecurityClick();
        else if (item.target === 'notifications') onNotificationsClick();
        else if (item.target === 'hackathons') onHackathonsClick();
        else if (item.target === 'news') onNewsClick();
        else if (item.target === 'courses') onCoursesClick();
        else if (item.target === 'terms') onTermsClick();
        else if (item.target === 'logout') {
          Alert.alert("Sign Out", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            { text: "Sign Out", onPress: onLogout }
          ]);
        }
        else console.log(`Navigating to ${item.target}`);
      }}
    >
      <View style={[styles.iconBox, item.active && styles.activeIconBox]}>
        <Heroicon 
          name={item.icon} 
          size={18} 
          color={item.logout ? '#ff4b4b' : (item.active ? '#ffffff' : '#9a9a9a')} 
        />
      </View>
      <Text style={[
        styles.menuText, 
        item.logout && styles.logoutText,
        item.active && styles.activeText
      ]}>
        {item.title}
      </Text>
      <View style={styles.rightSlot}>
        {item.active ? (
          <View style={styles.activeIndicator} />
        ) : (
          !item.logout && <Heroicon name="chevron-right" size={14} color="#333333" />
        )}
      </View>
    </AnimatedPressable>
  );

  const MenuSection = ({ title, items }: { title: string; items: MenuItem[] }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => renderMenuItem(item, index))}
    </View>
  );

  const mainItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'home-solid', target: 'dashboard', active: currentView === 'dashboard' },
    { title: 'Hackathons', icon: 'terminal-solid', target: 'hackathons', active: currentView === 'hackathons' },
    { title: 'News & Updates', icon: 'globe-solid', target: 'news', active: currentView === 'news' },
    { title: 'Courses', icon: 'book-open-solid', target: 'courses', active: currentView === 'courses' },
  ];

  const accountItems: MenuItem[] = [
    { title: 'My Profile', icon: 'user-solid', target: 'profile', active: currentView === 'profile' },
    { title: 'Account Settings', icon: 'cog', target: 'settings', active: currentView === 'settings' },
  ];

  const settingsItems: MenuItem[] = [
    { title: 'Security & Privacy', icon: 'shield-lock-solid', target: 'security', active: currentView === 'securityPrivacy' },
    { title: 'Two-Factor Authentication', icon: 'lock-solid', target: '2fa' },
    { title: 'Notifications', icon: 'bell-solid', target: 'notifications', active: currentView === 'notifications' },
  ];

  const supportItems: MenuItem[] = [
    { title: 'Help & Support', icon: 'heart-solid', target: 'help' },
    { title: 'Terms & Conditions', icon: 'document', target: 'terms', active: currentView === 'terms' },
  ];

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
        <SafeAreaView style={styles.safeArea}>
          {/* Profile Header */}
          <View style={styles.header}>
            <View style={styles.profileBox}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLetter}>{(userName || 'U').charAt(0)}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName} numberOfLines={1}>{userName || 'User'}</Text>
                <Text style={styles.userEmail} numberOfLines={1}>{userEmail || 'user@techpune.com'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerDivider} />

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <MenuSection title="MAIN MENU" items={mainItems} />
            <MenuSection title="ACCOUNT" items={accountItems} />
            <MenuSection title="SETTINGS" items={settingsItems} />
            <MenuSection title="SUPPORT" items={supportItems} />

            <View style={styles.exitSection}>
              <View style={styles.divider} />
              {renderMenuItem({ title: 'Log Out', icon: 'logout', target: 'logout', logout: true }, 0)}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>TechPune v1.0.4</Text>
          </View>
        </SafeAreaView>
      </Animated.View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  drawerContainer: {
    width: width * 0.8,
    height,
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarLetter: {
    fontSize: 20,
    fontFamily: 'ClashDisplay-Bold',
    color: '#000000',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'ClashDisplay-Bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
  },
  headerDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#444444',
    letterSpacing: 1.5,
    marginBottom: 16,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 4,
    position: 'relative',
  },
  activeMenuItem: {
    backgroundColor: '#121212',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  activeIconBox: {
    backgroundColor: '#1a1c1c',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
    textAlignVertical: 'center',
  },
  activeText: {
    color: '#ffffff',
    fontFamily: 'Inter-Semibold',
  },
  rightSlot: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#ff4b4b',
    fontFamily: 'Inter-Bold',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  exitSection: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 16,
    marginHorizontal: 12,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.03)',
  },
  footerText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    textAlign: 'center',
  },
});
