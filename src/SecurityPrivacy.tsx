import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFadeIn } from './hooks/useFadeIn';
import ToggleRow from './components/ToggleRow';
import PageHeader from './components/PageHeader';
import { loadSettings, saveSettings, type AppSettings } from './services/settingsService';
import { colors } from './constants/theme';

export default function SecurityPrivacy() {
  const [settings, setSettings] = useState<AppSettings>({});

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  const update = (key: keyof AppSettings) => (value: boolean) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSettings(next);
  };

  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });

  return (
    <SafeAreaView style={styles.container}>
<PageHeader title="Security & Privacy" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SECURITY SETTINGS</Text>
            <View style={styles.card}>
              <ToggleRow icon="lock" title="App Lock" description="Require a PIN or pattern to open the app" value={settings.appLock ?? false} onValueChange={update('appLock')} />
              <View style={styles.divider} />
              <ToggleRow icon="shield-check" title="Biometric Authentication" description="Use FaceID or Fingerprint for quick access" value={settings.biometricAuth ?? true} onValueChange={update('biometricAuth')} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRIVACY PREFERENCES</Text>
            <View style={styles.card}>
              <ToggleRow icon="eye" title="Show Active Sessions" description="Let others see when you are online" value={settings.showActiveSessions ?? true} onValueChange={update('showActiveSessions')} />
              <View style={styles.divider} />
              <ToggleRow icon="globe" title="Personalized Ads" description="Receive ads tailored to your interests" value={settings.personalizedAds ?? false} onValueChange={update('personalizedAds')} />
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
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 10, fontFamily: 'Inter-Bold', color: colors.textMuted, letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 },
  card: { backgroundColor: colors.surface, borderRadius: 20, paddingVertical: 8 },
  divider: { height: 1, backgroundColor: colors.divider, marginHorizontal: 16 },
  infoBox: { padding: 20, backgroundColor: colors.surface, borderRadius: 20, marginTop: 8 },
  infoText: { fontSize: 12, fontFamily: 'Inter-Medium', color: colors.textSubtitle, textAlign: 'center', lineHeight: 18 },
});

