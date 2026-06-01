import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Heroicon, type IconName } from './Heroicon';
import { BlurView } from 'expo-blur';
import { useAppContext } from './context/AppContext';
import AnimatedPressable from './components/AnimatedPressable';
import { useFadeIn } from './hooks/useFadeIn';
import PageHeader from './components/PageHeader';

type PersonalInfo = {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  dob: string;
  college: string;
};

export default function ProfilePage() {
  const navigation = useNavigation();
  const { user, updateUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [originalInfo, setOriginalInfo] = useState<PersonalInfo | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: user.fullName || '',
    email: user.email || '',
    mobile: user.mobile || '',
    address: user.address || '',
    dob: user.dob || '',
    college: user.college || '',
  });

  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!personalInfo.fullName.trim()) {
      Alert.alert('Required Field', 'Full Name is mandatory.'); return false;
    }
    if (!personalInfo.email.trim()) {
      Alert.alert('Required Field', 'Email is mandatory.'); return false;
    }
    if (!emailRegex.test(personalInfo.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.'); return false;
    }
    if (!personalInfo.mobile.trim()) {
      Alert.alert('Required Field', 'Mobile Number is mandatory.'); return false;
    }
    if (!/^\d{10}$/.test(personalInfo.mobile)) {
      Alert.alert('Invalid Mobile', 'Mobile number should be exactly 10 digits.'); return false;
    }
    if (!personalInfo.dob.trim()) {
      Alert.alert('Required Field', 'Date of Birth is mandatory.'); return false;
    }
    if (!personalInfo.address.trim()) {
      Alert.alert('Required Field', 'Address is mandatory.'); return false;
    }
    if (!personalInfo.college.trim()) {
      Alert.alert('Required Field', 'College Name is mandatory.'); return false;
    }
    return true;
  };

  const handleEditPress = () => {
    if (!isEditing) {
      setOriginalInfo({ ...personalInfo });
      setIsEditing(true);
    } else {
      if (validate()) {
        setIsSaving(true);
        setTimeout(() => {
          updateUser({
            fullName: personalInfo.fullName,
            mobile: personalInfo.mobile,
            address: personalInfo.address,
            dob: personalInfo.dob,
            college: personalInfo.college,
          });
          setIsSaving(false);
          setIsEditing(false);
          Alert.alert('Profile Updated', 'Your changes have been saved successfully.');
        }, 1500);
      }
    }
  };

  const handleCancel = () => {
    if (originalInfo) {
      setPersonalInfo(originalInfo);
    }
    setIsEditing(false);
  };

  const handleChangePicture = () => {
    Alert.alert('Update Avatar', 'Choose a source', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Upload from Files', onPress: () => Alert.alert('Coming Soon', 'Image upload will be available soon.') },
      { text: 'Capture Photo', onPress: () => Alert.alert('Coming Soon', 'Camera capture will be available soon.') },
    ]);
  };

  const saveAndGoBack = () => {
    if (!validate()) return;
    setIsSaving(true);
    setTimeout(() => {
      updateUser({
        fullName: personalInfo.fullName,
        mobile: personalInfo.mobile,
        address: personalInfo.address,
        dob: personalInfo.dob,
        college: personalInfo.college,
      });
      setIsSaving(false);
      setIsEditing(false);
      navigation.goBack();
    }, isEditing ? 1000 : 0);
  };

  const renderDetailRow = (icon: IconName, label: string, value: string, key: string, isLast = false) => (
    <View key={key}>
      <View style={styles.detailRow}>
        <View style={styles.detailIconContainer}>
          <Heroicon name={icon} size={20} color="#1a1c1c" />
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.detailLabelText}>{label}</Text>
          {isEditing ? (
            key === 'dob' ? (
              <AnimatedPressable onPress={() => setShowDatePicker(true)}>
                <Text style={styles.detailValueText}>{value}</Text>
              </AnimatedPressable>
            ) : (
              <TextInput
                style={styles.detailInput}
                value={value}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, [key]: text })}
                placeholderTextColor="#9a9a9a"
              />
            )
          ) : (
            <Text style={styles.detailValueText}>{value}</Text>
          )}
        </View>
      </View>
      {!isLast && <View style={styles.detailDivider} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
<PageHeader title="PROFILE" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <AnimatedPressable onPress={handleChangePicture} activeOpacity={0.9} style={styles.avatarContainer}>
                <View style={styles.avatarImageBg}>
                  <Text style={styles.avatarPlaceholder}>{personalInfo.fullName.charAt(0)}</Text>
                </View>
                <View style={styles.cameraOverlay}>
                  <Heroicon name="camera" size={14} color="#ffffff" />
                </View>
              </AnimatedPressable>
            </View>
            <View style={styles.userInfoTop}>
              <Text style={styles.userNameText}>{personalInfo.fullName}</Text>
              <Text style={styles.userEmailText}>{personalInfo.email}</Text>
            </View>
          </View>

          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Account Details</Text>
                <Text style={styles.sectionSubtitle}>Manage your personal information</Text>
              </View>
              <View style={styles.headerActions}>
                {isEditing && (
                  <AnimatedPressable onPress={handleCancel} style={[styles.editToggleBtn, { marginRight: 8, backgroundColor: '#fff0f0' }]}>
                    <Text style={[styles.editToggleText, { color: '#ff4b4b' }]}>Cancel</Text>
                  </AnimatedPressable>
                )}
                <AnimatedPressable onPress={handleEditPress} style={styles.editToggleBtn} disabled={isSaving}>
                  {isSaving ? (
                    <ActivityIndicator size="small" color="#1a1c1c" />
                  ) : (
                    <Text style={[styles.editToggleText, isEditing && styles.saveToggleText]}>
                      {isEditing ? 'Save' : 'Edit'}
                    </Text>
                  )}
                </AnimatedPressable>
              </View>
            </View>

            <View style={styles.detailsCard}>
              {renderDetailRow('mail', 'Email', personalInfo.email, 'email')}
              {renderDetailRow('phone', 'Mobile Number', personalInfo.mobile, 'mobile')}
              {renderDetailRow('calendar', 'Date of Birth', personalInfo.dob, 'dob')}
              {renderDetailRow('building-library', 'College', personalInfo.college, 'college')}
              {renderDetailRow('location', 'Address', personalInfo.address, 'address', true)}
            </View>
          </View>
        </Animated.View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setShowDatePicker(false)}>
            <BlurView intensity={40} style={StyleSheet.absoluteFill} tint="dark" />
          </TouchableOpacity>

          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Set Date of Birth</Text>

            <View style={styles.calendarContainer}>
              <View style={styles.calendarColumn}>
                <Text style={styles.calendarColumnLabel}>Day</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {[...Array(31)].map((_, i) => (
                    <TouchableOpacity key={i} style={styles.calendarItem} onPress={() => {
                      const parts = personalInfo.dob ? personalInfo.dob.split(' ') : ['', '', ''];
                      setPersonalInfo({ ...personalInfo, dob: `${i + 1} ${parts[1] || 'Jan'} ${parts[2] || '2000'}` });
                    }}>
                      <Text style={[styles.calendarItemText, personalInfo.dob.startsWith(`${i + 1} `) && styles.calendarItemTextSelected]}>
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.calendarColumn}>
                <Text style={styles.calendarColumnLabel}>Month</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <TouchableOpacity key={m} style={styles.calendarItem} onPress={() => {
                      const parts = personalInfo.dob ? personalInfo.dob.split(' ') : ['1', '', '2000'];
                      setPersonalInfo({ ...personalInfo, dob: `${parts[0] || '1'} ${m} ${parts[2] || '2000'}` });
                    }}>
                      <Text style={[styles.calendarItemText, personalInfo.dob.includes(` ${m} `) && styles.calendarItemTextSelected]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.calendarColumn}>
                <Text style={styles.calendarColumnLabel}>Year</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {[...Array(60)].map((_, i) => {
                    const y = 2024 - i;
                    return (
                      <TouchableOpacity key={y} style={styles.calendarItem} onPress={() => {
                        const parts = personalInfo.dob ? personalInfo.dob.split(' ') : ['1', 'Jan', ''];
                        setPersonalInfo({ ...personalInfo, dob: `${parts[0] || '1'} ${parts[1] || 'Jan'} ${y}` });
                      }}>
                        <Text style={[styles.calendarItemText, personalInfo.dob.endsWith(` ${y}`) && styles.calendarItemTextSelected]}>{y}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={() => setShowDatePicker(false)} activeOpacity={0.8}>
              <Text style={styles.confirmBtnText}>Confirm Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.continueContainer}>
        <TouchableOpacity
          style={[styles.continueButton, !personalInfo.fullName.trim() && styles.continueButtonDisabled]}
          onPress={saveAndGoBack}
          disabled={!personalInfo.fullName.trim()}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue â†’</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  scrollBody: { paddingBottom: 40 },
  avatarSection: { alignItems: 'center', paddingTop: 32, paddingBottom: 24 },
  avatarWrapper: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 10, marginBottom: 16 },
  avatarContainer: { position: 'relative', width: 110, height: 110 },
  avatarImageBg: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#1a1c1c', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#ffffff', overflow: 'hidden' },
  avatarPlaceholder: { fontSize: 44, fontFamily: 'ClashDisplay-Bold', color: '#ffffff' },
  cameraOverlay: { position: 'absolute', bottom: 2, right: 2, backgroundColor: '#1a1c1c', width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#ffffff', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  userInfoTop: { alignItems: 'center', marginBottom: 24 },
  userNameText: { fontSize: 28, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c' },
  userEmailText: { fontSize: 14, fontFamily: 'Inter-Medium', color: '#666666', marginTop: 4 },
  sectionWrapper: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontFamily: 'CabinetGrotesk-Bold', color: '#1a1c1c' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  sectionSubtitle: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#666666', marginTop: 2 },
  editToggleBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#f5f5f7' },
  editToggleText: { fontSize: 13, fontFamily: 'Inter-Bold', color: '#1a1c1c' },
  saveToggleText: { color: '#00c853' },
  detailsCard: { backgroundColor: '#ffffff', borderRadius: 24, paddingVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  detailIconContainer: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f5f5f7', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  detailContent: { flex: 1 },
  detailLabelText: { fontSize: 10, fontFamily: 'Inter-Medium', color: '#666666', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 1 },
  detailValueText: { fontSize: 14, fontFamily: 'Inter-Bold', color: '#1a1c1c' },
  detailInput: { fontSize: 14, fontFamily: 'Inter-Bold', color: '#1a1c1c', paddingVertical: 0 },
  detailDivider: { height: 1, backgroundColor: '#f5f5f7', marginHorizontal: 16 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  bottomSheet: { backgroundColor: '#ffffff', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingTop: 12, paddingHorizontal: 24, paddingBottom: 50 },
  sheetHandle: { width: 40, height: 4, backgroundColor: '#e2e2e2', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 20, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', marginBottom: 20, textAlign: 'center' },
  calendarContainer: { flexDirection: 'row', height: 280, marginBottom: 20, backgroundColor: '#f8f8fa', borderRadius: 20, padding: 10 },
  calendarColumn: { flex: 1, alignItems: 'center' },
  calendarColumnLabel: { fontSize: 10, fontFamily: 'Inter-Bold', color: '#666666', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 1 },
  calendarItem: { paddingVertical: 12, paddingHorizontal: 10, width: '100%', alignItems: 'center' },
  calendarItemText: { fontSize: 16, fontFamily: 'Inter-Medium', color: '#1a1c1c', opacity: 0.5 },
  calendarItemTextSelected: { fontSize: 18, fontFamily: 'Inter-Bold', color: '#1a1c1c', opacity: 1 },
  confirmBtn: { paddingVertical: 16, backgroundColor: '#1a1c1c', borderRadius: 16, alignItems: 'center', shadowColor: '#1a1c1c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4, zIndex: 10 },
  confirmBtnText: { fontSize: 16, fontFamily: 'Inter-Bold', color: '#ffffff' },
  continueContainer: { padding: 20, backgroundColor: '#fcfcfc' },
  continueButton: { height: 58, borderRadius: 999, backgroundColor: '#1a1c1c', justifyContent: 'center', alignItems: 'center' },
  continueButtonDisabled: { opacity: 0.5 },
  continueButtonText: { color: '#ffffff', fontSize: 16, fontFamily: 'Inter-Semibold' },
});

