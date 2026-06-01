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

export default function UploadCourse() {
  const navigation = useNavigation();
  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });
  const [formData, setFormData] = useState({
    title: '', instructor: '', duration: '', level: '', category: '', description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = () => {
    if (!formData.title.trim()) {
      Alert.alert('Missing Info', 'Please enter the course title.'); return;
    }
    if (!formData.instructor.trim()) {
      Alert.alert('Missing Info', 'Please enter the instructor name.'); return;
    }
    if (!formData.description.trim()) {
      Alert.alert('Missing Info', 'Please enter the course description.'); return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Course details have been submitted for review.');
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="UPLOAD COURSE" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.infoCard}>
            <Heroicon name="book-open" size={32} color="#1a1c1c" />
            <Text style={styles.infoTitle}>Course Curriculum</Text>
            <Text style={styles.infoSubtitle}>Share your knowledge with the community by creating a structured learning path.</Text>
          </View>

          <View style={styles.formSection}>
            <InputField label="COURSE TITLE" value={formData.title} onChangeText={(t) => setFormData({...formData, title: t})} placeholder="e.g. Mastering Modern UI Design" />
            <InputField label="INSTRUCTOR" value={formData.instructor} onChangeText={(t) => setFormData({...formData, instructor: t})} placeholder="e.g. Prof. Alex Rivera" />
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <InputField label="DURATION" value={formData.duration} onChangeText={(t) => setFormData({...formData, duration: t})} placeholder="e.g. 8 Weeks" />
              </View>
              <View style={{ flex: 1 }}>
                <InputField label="DIFFICULTY LEVEL" value={formData.level} onChangeText={(t) => setFormData({...formData, level: t})} placeholder="e.g. Beginner" />
              </View>
            </View>
            <InputField label="CATEGORY" value={formData.category} onChangeText={(t) => setFormData({...formData, category: t})} placeholder="e.g. Computer Science / Business" />
            <InputField label="COURSE OVERVIEW" value={formData.description} onChangeText={(t) => setFormData({...formData, description: t})} placeholder="Describe what students will learn in this course." multiline />
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
