import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';

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
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export type NotificationsProps = {
  onBack: () => void;
};

export default function Notifications({ onBack }: NotificationsProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [newsletters, setNewsletters] = useState(true);
  const [mentions, setMentions] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const ToggleRow = ({ 
    icon, 
    title, 
    description, 
    value, 
    onValueChange 
  }: { 
    icon: string, 
    title: string, 
    description?: string, 
    value: boolean, 
    onValueChange: (v: boolean) => void 
  }) => (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Heroicon name={icon} size={18} color="#9a9a9a" />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>
        {description && <Text style={styles.rowDescription}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#333333', true: '#ffffff' }}
        thumbColor={value ? '#1a1c1c' : '#9a9a9a'}
        ios_backgroundColor="#333333"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AnimatedPressable onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#ffffff" />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PUSH NOTIFICATIONS</Text>
          <View style={styles.card}>
            <ToggleRow 
              icon="bell-solid" 
              title="All Push Notifications" 
              description="Receive real-time alerts on your device"
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />
            <View style={styles.divider} />
            <ToggleRow 
              icon="star-solid" 
              title="Mentions & Tags" 
              description="Get notified when someone mentions you"
              value={mentions}
              onValueChange={setMentions}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EMAIL & NEWS</Text>
          <View style={styles.card}>
            <ToggleRow 
              icon="mail-solid" 
              title="Email Notifications" 
              description="Receive summaries and updates via email"
              value={emailEnabled}
              onValueChange={setEmailEnabled}
            />
            <View style={styles.divider} />
            <ToggleRow 
              icon="book-open-solid" 
              title="Weekly Newsletters" 
              description="Best stories and updates from TechPune"
              value={newsletters}
              onValueChange={setNewsletters}
            />
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            You can manage your notification preferences at any time. We respect your inbox and only send important updates.
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'ClashDisplay-Bold',
    color: '#ffffff',
  },
  content: {
    padding: 20,
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
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#0a0a0a',
    borderRadius: 24,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 18,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rowContent: {
    flex: 1,
    marginRight: 12,
  },
  rowTitle: {
    fontSize: 15,
    fontFamily: 'Inter-Semibold',
    color: '#ffffff',
  },
  rowDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginHorizontal: 16,
  },
  infoBox: {
    padding: 20,
    backgroundColor: '#121212',
    borderRadius: 20,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
