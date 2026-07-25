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

export default function Notifications() {
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
<PageHeader title="Notifications" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PUSH NOTIFICATIONS</Text>
            <View style={styles.card}>
              <ToggleRow icon="bell" title="All Push Notifications" description="Receive real-time alerts on your device" value={settings.pushEnabled ?? true} onValueChange={update('pushEnabled')} />
              <View style={styles.divider} />
              <ToggleRow icon="star" title="Mentions & Tags" description="Get notified when someone mentions you" value={settings.mentions ?? true} onValueChange={update('mentions')} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EMAIL & NEWS</Text>
            <View style={styles.card}>
              <ToggleRow icon="mail" title="Email Notifications" description="Receive summaries and updates via email" value={settings.emailEnabled ?? false} onValueChange={update('emailEnabled')} />
              <View style={styles.divider} />
              <ToggleRow icon="book-open" title="Weekly Newsletters" description="Best stories and updates from TechPune" value={settings.newsletters ?? true} onValueChange={update('newsletters')} />
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>You can manage your notification preferences at any time. We respect your inbox and only send important updates.</Text>
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

