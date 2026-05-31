import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';

export type UploadHackathonProps = {
  onBack: () => void;
};

export default function UploadHackathon({ onBack }: UploadHackathonProps) {
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    date: '',
    prize: '',
    tag: '',
    location: '',
    description: '',
  });

  const handleUpload = () => {
    if (!formData.title || !formData.organizer) {
      Alert.alert('Missing Info', 'Please fill in the title and organizer name.');
      return;
    }
    Alert.alert('Success', 'Hackathon details have been submitted for review.');
    onBack();
  };

  const InputField = ({ label, value, onChangeText, placeholder, multiline = false, height = 56 }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, { height: multiline ? 120 : height }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9a9a9a"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UPLOAD HACKATHON</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.infoCard}>
            <Heroicon name="terminal-solid" size={32} color="#1a1c1c" />
            <Text style={styles.infoTitle}>Event Details</Text>
            <Text style={styles.infoSubtitle}>Provide the core information about your hackathon to attract the best talent.</Text>
          </View>

          <View style={styles.formSection}>
            <InputField 
              label="HACKATHON TITLE" 
              value={formData.title}
              onChangeText={(text: string) => setFormData({...formData, title: text})}
              placeholder="e.g. Global AI Summit 2024"
            />
            
            <InputField 
              label="ORGANIZER" 
              value={formData.organizer}
              onChangeText={(text: string) => setFormData({...formData, organizer: text})}
              placeholder="e.g. TechPune Community"
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <InputField 
                  label="DATE / DURATION" 
                  value={formData.date}
                  onChangeText={(text: string) => setFormData({...formData, date: text})}
                  placeholder="e.g. June 15-18"
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField 
                  label="PRIZE POOL" 
                  value={formData.prize}
                  onChangeText={(text: string) => setFormData({...formData, prize: text})}
                  placeholder="e.g. $5,000"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <InputField 
                  label="CATEGORY TAG" 
                  value={formData.tag}
                  onChangeText={(text: string) => setFormData({...formData, tag: text})}
                  placeholder="e.g. AI / Web3"
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField 
                  label="LOCATION" 
                  value={formData.location}
                  onChangeText={(text: string) => setFormData({...formData, location: text})}
                  placeholder="e.g. Pune / Virtual"
                />
              </View>
            </View>

            <InputField 
              label="EVENT DESCRIPTION" 
              value={formData.description}
              onChangeText={(text: string) => setFormData({...formData, description: text})}
              placeholder="What is this challenge about? Mention rules, eligibility, etc."
              multiline={true}
            />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleUpload}>
            <Text style={styles.submitBtnText}>Register now</Text>
          </TouchableOpacity>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
  },
  headerTitle: {
    fontSize: 12,
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 2,
    color: '#1a1c1c',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 24,
  },
  infoCard: {
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 28,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    marginTop: 16,
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 22,
  },
  formSection: {
    gap: 20,
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#9a9a9a',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#1a1c1c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#1a1c1c',
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});
