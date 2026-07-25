import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Animated,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Heroicon, type IconName } from './Heroicon';
import { useAppContext } from './context/AppContext';
import type { RootStackParamList } from './types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320); // Cap width on tablets

type MenuItem = {
  title: string;
  icon: IconName;
  target: string;
};

const MAIN_ITEMS: MenuItem[] = [
  { title: 'Dashboard', icon: 'home', target: 'Dashboard' },
  { title: 'Hackathons', icon: 'code-bracket', target: 'Hackathons' },
  { title: 'News & Updates', icon: 'newspaper', target: 'News' },
  { title: 'Courses', icon: 'book-stack', target: 'Courses' },
];

const ACCOUNT_ITEMS: MenuItem[] = [
  { title: 'My Profile', icon: 'user', target: 'Profile' },
  { title: 'Account Settings', icon: 'cog', target: 'AccountSettings' },
];

const SETTINGS_ITEMS: MenuItem[] = [
  { title: 'Security & Privacy', icon: 'shield-lock', target: 'SecurityPrivacy' },
  { title: 'Notifications', icon: 'bell', target: 'Notifications' },
];

const SUPPORT_ITEMS: MenuItem[] = [
  { title: 'Terms & Conditions', icon: 'document', target: 'Terms' },
];

export default function Hamburger() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, resetUser, isMenuVisible, setMenuVisible } = useAppContext();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  
  // Track if we are currently animating out so we don't trigger multiple closes
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Animate in when mounted
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
    ]).start();
  }, []);

  const close = (onClosed?: () => void) => {
    if (isClosing) return;
    setIsClosing(true);
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -DRAWER_WIDTH, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      setMenuVisible(false);
      if (onClosed) onClosed();
    });
  };

  const navigateTo = (target: string) => {
    close(() => {
      const mainTabs = ['Dashboard', 'Hackathons', 'News', 'Courses'];
      if (mainTabs.includes(target)) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs', params: { screen: target } } as any],
        });
      } else {
        navigation.navigate(target as any);
      }
    });
  };

  const handleLogout = () => {
    close(() => {
      Alert.alert("Sign Out", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          onPress: () => {
            resetUser();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ]);
    });
  };

  return (
    <Modal
      visible={true} // Controlled by conditional rendering in App.tsx
      transparent={true}
      animationType="none"
      onRequestClose={() => close()}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => close()}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        <Animated.View 
          style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
          pointerEvents="box-none" // Ensures touches go to children
        >
          <View style={[styles.drawerContent, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLetter}>
                  {(user.fullName || 'U').charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user.fullName || 'User'}
                </Text>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {user.email || 'user@techpune.com'}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              bounces={false}
            >
              <MenuSection title="MAIN MENU" items={MAIN_ITEMS} onPress={navigateTo} />
              <MenuSection title="ACCOUNT" items={ACCOUNT_ITEMS} onPress={navigateTo} />
              <MenuSection title="SETTINGS" items={SETTINGS_ITEMS} onPress={navigateTo} />
              <MenuSection title="SUPPORT" items={SUPPORT_ITEMS} onPress={navigateTo} />

              <View style={styles.divider} />

              <MenuItemRow
                icon="logout"
                title="Log Out"
                color="#ff4b4b"
                onPress={handleLogout}
              />
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function MenuSection({
  title,
  items,
  onPress,
}: {
  title: string;
  items: MenuItem[];
  onPress: (target: string) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <MenuItemRow
          key={item.target}
          icon={item.icon}
          title={item.title}
          onPress={() => onPress(item.target)}
          showChevron
        />
      ))}
    </View>
  );
}

function MenuItemRow({
  icon,
  title,
  color,
  onPress,
  showChevron,
}: {
  icon: IconName;
  title: string;
  color?: string;
  onPress: () => void;
  showChevron?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.menuRow}
    >
      <View style={[styles.iconBox, color ? { backgroundColor: 'rgba(255, 75, 75, 0.12)' } : undefined]}>
        <Heroicon name={icon} size={18} color={color || '#e0e0e0'} />
      </View>
      <Text style={[styles.menuLabel, color ? { color } : undefined]}>
        {title}
      </Text>
      {showChevron && (
        <View style={styles.chevronBox}>
          <Heroicon name="chevron-right" size={14} color="#555555" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#1a1c1c',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },
  drawerContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
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
    color: '#1a1c1c',
  },
  headerText: {
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
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 24,
    marginVertical: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#777777',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 2,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#e0e0e0',
  },
  chevronBox: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
