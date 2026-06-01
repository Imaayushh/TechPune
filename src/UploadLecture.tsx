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

export default function UploadLecture() {
  const navigation = useNavigation();
  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });
  const [formData, setFormData] = useState({
    title: '', speaker: '', topic: '', dateTime: '', link: '', description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = () => {
    if (!formData.title.trim()) {
      Alert.alert('Missing Info', 'Please enter the lecture title.'); return;
    }
    if (!formData.speaker.trim()) {
      Alert.alert('Missing Info', 'Please enter the speaker name.'); return;
    }
    if (!formData.description.trim()) {
      Alert.alert('Missing Info', 'Please enter the session description.'); return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Guidance lecture session has been scheduled for review.');
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="UPLOAD LECTURE" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.infoCard}>
            <Heroicon name="academic-cap" size={32} color="#1a1c1c" />
            <Text style={styles.infoTitle}>Expert Guidance</Text>
            <Text style={styles.infoSubtitle}>Schedule a guidance session or a guest lecture to mentor students in the community.</Text>
          </View>

          <View style={styles.formSection}>
            <InputField label="LECTURE TITLE" value={formData.title} onChangeText={(t) => setFormData({...formData, title: t})} placeholder="e.g. Navigating your Tech Career" />
            <InputField label="SPEAKER / MENTOR" value={formData.speaker} onChangeText={(t) => setFormData({...formData, speaker: t})} placeholder="e.g. Dr. Sarah Jenkins" />
            <InputField label="PRIMARY TOPIC" value={formData.topic} onChangeText={(t) => setFormData({...formData, topic: t})} placeholder="e.g. Industry Trends & Networking" />
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <InputField label="DATE & TIME" value={formData.dateTime} onChangeText={(t) => setFormData({...formData, dateTime: t})} placeholder="e.g. July 20, 4:00 PM" />
              </View>
              <View style={{ flex: 1 }}>
                <InputField label="EXTERNAL LINK (OPTIONAL)" value={formData.link} onChangeText={(t) => setFormData({...formData, link: t})} placeholder="e.g. Zoom / Meet Link" />
              </View>
            </View>
            <InputField label="SESSION DESCRIPTION" value={formData.description} onChangeText={(t) => setFormData({...formData, description: t})} placeholder="Briefly describe what will be covered in this session." multiline />
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
