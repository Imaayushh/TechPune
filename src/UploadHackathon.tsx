import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Heroicon } from './Heroicon';
import InputField from './components/InputField';
import PageHeader from './components/PageHeader';
import { useFadeIn } from './hooks/useFadeIn';

export default function UploadHackathon() {
  const navigation = useNavigation();
  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });
  const [formData, setFormData] = useState({
    title: '', organizer: '', date: '', prize: '', tag: '', location: '', description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = () => {
    if (!formData.title.trim()) {
      Alert.alert('Missing Info', 'Please enter the hackathon title.'); return;
    }
    if (!formData.organizer.trim()) {
      Alert.alert('Missing Info', 'Please enter the organizer name.'); return;
    }
    if (!formData.date.trim()) {
      Alert.alert('Missing Info', 'Please enter the event date.'); return;
    }
    if (!formData.description.trim()) {
      Alert.alert('Missing Info', 'Please enter the event description.'); return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Hackathon details have been submitted for review.');
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="UPLOAD HACKATHON" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.infoCard}>
            <Heroicon name="terminal" size={32} color="#1a1c1c" />
            <Text style={styles.infoTitle}>Event Details</Text>
            <Text style={styles.infoSubtitle}>Provide the core information about your hackathon to attract the best talent.</Text>
          </View>

          <View style={styles.formSection}>
            <InputField label="HACKATHON TITLE" value={formData.title} onChangeText={(t) => setFormData({...formData, title: t})} placeholder="e.g. Global AI Summit 2024" />
            <InputField label="ORGANIZER" value={formData.organizer} onChangeText={(t) => setFormData({...formData, organizer: t})} placeholder="e.g. TechPune Community" />
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <InputField label="DATE / DURATION" value={formData.date} onChangeText={(t) => setFormData({...formData, date: t})} placeholder="e.g. June 15-18" />
              </View>
              <View style={{ flex: 1 }}>
                <InputField label="PRIZE POOL" value={formData.prize} onChangeText={(t) => setFormData({...formData, prize: t})} placeholder="e.g. $5,000" />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <InputField label="CATEGORY TAG" value={formData.tag} onChangeText={(t) => setFormData({...formData, tag: t})} placeholder="e.g. AI / Web3" />
              </View>
              <View style={{ flex: 1 }}>
                <InputField label="LOCATION" value={formData.location} onChangeText={(t) => setFormData({...formData, location: t})} placeholder="e.g. Pune / Virtual" />
              </View>
            </View>
            <InputField label="EVENT DESCRIPTION" value={formData.description} onChangeText={(t) => setFormData({...formData, description: t})} placeholder="What is this challenge about? Mention rules, eligibility, etc." multiline />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleUpload} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>Submit for Review</Text>
            )}
          </TouchableOpacity>

          <View style={{ height: 40 }} />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { padding: 24 },
  infoCard: { marginBottom: 32 },
  infoTitle: { fontSize: 28, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', marginTop: 16, marginBottom: 8 },
  infoSubtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: '#666666', lineHeight: 22 },
  formSection: { gap: 20, marginBottom: 32 },
  row: { flexDirection: 'row', alignItems: 'center' },
  submitBtn: { backgroundColor: '#1a1c1c', height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  submitBtnText: { color: '#ffffff', fontSize: 16, fontFamily: 'Inter-Bold' },
});
