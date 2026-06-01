import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon, type IconName } from './Heroicon';
import { useFadeIn } from './hooks/useFadeIn';
import PageHeader from './components/PageHeader';

export default function SecurityPrivacy() {
  const [appLock, setAppLock] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [showActiveSessions, setShowActiveSessions] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });

  const ToggleRow = ({
    icon, title, description, value, onValueChange,
  }: {
    icon: IconName; title: string; description?: string; value: boolean; onValueChange: (v: boolean) => void;
  }) => (
    <View style={styles.row}>
      <View style={styles.iconContainer}><Heroicon name={icon} size={18} color="#9a9a9a" /></View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>
        {description && <Text style={styles.rowDescription}>{description}</Text>}
      </View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#e0e0e0', true: '#1a1c1c' }} thumbColor={value ? '#ffffff' : '#9a9a9a'} ios_backgroundColor="#e0e0e0" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
<PageHeader title="Security & Privacy" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SECURITY SETTINGS</Text>
            <View style={styles.card}>
              <ToggleRow icon="lock" title="App Lock" description="Require a PIN or pattern to open the app" value={appLock} onValueChange={setAppLock} />
              <View style={styles.divider} />
              <ToggleRow icon="shield-check" title="Biometric Authentication" description="Use FaceID or Fingerprint for quick access" value={biometricAuth} onValueChange={setBiometricAuth} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRIVACY PREFERENCES</Text>
            <View style={styles.card}>
              <ToggleRow icon="eye" title="Show Active Sessions" description="Let others see when you are online" value={showActiveSessions} onValueChange={setShowActiveSessions} />
              <View style={styles.divider} />
              <ToggleRow icon="globe" title="Personalized Ads" description="Receive ads tailored to your interests" value={personalizedAds} onValueChange={setPersonalizedAds} />
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Your privacy is important to us. We never share your personal data with third parties without your explicit consent.</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  content: { padding: 20 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 10, fontFamily: 'Inter-Bold', color: '#9a9a9a', letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, paddingVertical: 8 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingVertical: 18 },
  iconContainer: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f5f5f7', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  rowContent: { flex: 1, marginRight: 12 },
  rowTitle: { fontSize: 15, fontFamily: 'Inter-Semibold', color: '#1a1c1c' },
  rowDescription: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#666666', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 16 },
  infoBox: { padding: 20, backgroundColor: '#ffffff', borderRadius: 20, marginTop: 8 },
  infoText: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#666666', textAlign: 'center', lineHeight: 18 },
});

