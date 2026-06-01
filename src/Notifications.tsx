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

export default function Notifications() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [newsletters, setNewsletters] = useState(true);
  const [mentions, setMentions] = useState(true);

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
<PageHeader title="Notifications" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PUSH NOTIFICATIONS</Text>
            <View style={styles.card}>
              <ToggleRow icon="bell" title="All Push Notifications" description="Receive real-time alerts on your device" value={pushEnabled} onValueChange={setPushEnabled} />
              <View style={styles.divider} />
              <ToggleRow icon="star" title="Mentions & Tags" description="Get notified when someone mentions you" value={mentions} onValueChange={setMentions} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EMAIL & NEWS</Text>
            <View style={styles.card}>
              <ToggleRow icon="mail" title="Email Notifications" description="Receive summaries and updates via email" value={emailEnabled} onValueChange={setEmailEnabled} />
              <View style={styles.divider} />
              <ToggleRow icon="book-open" title="Weekly Newsletters" description="Best stories and updates from TechPune" value={newsletters} onValueChange={setNewsletters} />
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

