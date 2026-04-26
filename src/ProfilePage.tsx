import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Heroicon } from './Heroicon';

const { width, height } = Dimensions.get('window');

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
        style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 8
        }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export type ProfilePageProps = {
  onBack: () => void;
  onContinue?: () => void;
  userEmail?: string;
  userName?: string;
  onUpdateName?: (name: string) => void;
};

export default function ProfilePage({ onBack, onContinue, userEmail, userName, onUpdateName }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [originalInfo, setOriginalInfo] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: userName || 'Admin User',
    email: userEmail || 'admin@techpune.com',
    mobile: '+91 9876543210',
    address: '123 Tech Park, Pune, Maharashtra',
    dob: '15 Aug 1995',
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalInfo.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    if (personalInfo.mobile.length < 10) {
      Alert.alert('Invalid Mobile', 'Mobile number should be at least 10 digits.');
      return false;
    }
    if (!personalInfo.fullName.trim()) {
      Alert.alert('Required Field', 'Full Name cannot be empty.');
      return false;
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
          if (onUpdateName) onUpdateName(personalInfo.fullName);
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
      { text: 'Upload from Files', onPress: () => console.log('Files') },
      { text: 'Capture Photo', onPress: () => console.log('Camera') },
    ]);
  };

  const handleDateSelect = (day: number, month: string, year: number) => {
    setPersonalInfo({ ...personalInfo, dob: `${day} ${month} ${year}` });
    setShowDatePicker(false);
  };

  const renderDetailRow = (icon: any, label: string, value: string, key: string, isLast = false) => (
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
      <View style={styles.stickyHeader}>
        <AnimatedPressable onPress={onBack} style={styles.iconBtn}>
          <Heroicon name="chevron-left" size={22} color="#1a1c1c" />
        </AnimatedPressable>
        <Text style={styles.stickyTitle}>USER PROFILE</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <AnimatedPressable
                onPress={handleChangePicture}
                activeOpacity={0.9}
                style={styles.avatarContainer}
              >
              <View style={styles.avatarImageBg}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarPlaceholder}>{personalInfo.fullName.charAt(0)}</Text>
                )}
              </View>
              <View style={styles.cameraOverlay}>
                <Heroicon name="camera-solid" size={14} color="#ffffff" />
              </View>
            </AnimatedPressable>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={personalInfo.fullName}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, fullName: text })}
              textAlign="center"
            />
          ) : (
            <Text style={styles.userNameText}>{personalInfo.fullName}</Text>
          )}
        </View>

        {/* Account Details Section */}
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
              <AnimatedPressable 
                onPress={handleEditPress} 
                style={styles.editToggleBtn}
                disabled={isSaving}
              >
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
            {renderDetailRow('mail-solid', 'Email', personalInfo.email, 'email')}
            {renderDetailRow('phone-solid', 'Mobile Number', personalInfo.mobile, 'mobile')}
            {renderDetailRow('calendar-solid', 'Date of Birth', personalInfo.dob, 'dob')}
            {renderDetailRow('location-solid', 'Address', personalInfo.address, 'address', true)}
          </View>
        </View>


      </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowDatePicker(false)}
          >
            <BlurView intensity={40} style={StyleSheet.absoluteFill} tint="dark" />
          </TouchableOpacity>

          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Set Date of Birth</Text>

            <View style={styles.calendarContainer}>
              {/* Day Selection */}
              <View style={styles.calendarColumn}>
                <Text style={styles.calendarColumnLabel}>Day</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {[...Array(31)].map((_, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.calendarItem}
                      onPress={() => {
                        const newDay = i + 1;
                        const [_, m, y] = personalInfo.dob.split(' ');
                        setPersonalInfo({ ...personalInfo, dob: `${newDay} ${m} ${y}` });
                      }}
                    >
                      <Text style={[
                        styles.calendarItemText,
                        personalInfo.dob.startsWith(`${i + 1} `) && styles.calendarItemTextSelected
                      ]}>
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Month Selection */}
              <View style={styles.calendarColumn}>
                <Text style={styles.calendarColumnLabel}>Month</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={styles.calendarItem}
                      onPress={() => {
                        const [d, _, y] = personalInfo.dob.split(' ');
                        setPersonalInfo({ ...personalInfo, dob: `${d} ${m} ${y}` });
                      }}
                    >
                      <Text style={[
                        styles.calendarItemText,
                        personalInfo.dob.includes(` ${m} `) && styles.calendarItemTextSelected
                      ]}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Selection */}
              <View style={styles.calendarColumn}>
                <Text style={styles.calendarColumnLabel}>Year</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {[...Array(60)].map((_, i) => {
                    const y = 2024 - i;
                    return (
                      <TouchableOpacity
                        key={y}
                        style={styles.calendarItem}
                        onPress={() => {
                          const [d, m, _] = personalInfo.dob.split(' ');
                          setPersonalInfo({ ...personalInfo, dob: `${d} ${m} ${y}` });
                        }}
                      >
                        <Text style={[
                          styles.calendarItemText,
                          personalInfo.dob.endsWith(` ${y}`) && styles.calendarItemTextSelected
                        ]}>
                          {y}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            <AnimatedPressable
              style={styles.confirmBtn}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.confirmBtnText}>Confirm Date</Text>
            </AnimatedPressable>
          </View>
        </View>
      </Modal>

      {/* Footer Button */}
      <View style={styles.fixedFooter}>
        <BlurView intensity={90} tint="light" style={styles.footerBlur}>
          <AnimatedPressable 
            style={styles.primaryBtn} 
            onPress={onContinue}
          >
            <Text style={styles.btnText}>Proceed to Dashboard</Text>
            <Heroicon name="chevron-right" size={18} color="#ffffff" />
          </AnimatedPressable>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  stickyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyTitle: {
    fontFamily: 'ClashDisplay-Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    color: '#1a1c1c',
    opacity: 0.8,
  },
  scrollBody: {
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  avatarWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    width: 110,
    height: 110,
  },
  avatarImageBg: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1a1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    fontSize: 44,
    fontFamily: 'ClashDisplay-Bold',
    color: '#ffffff',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#1a1c1c',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  userNameText: {
    fontSize: 28,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
  },
  nameInput: {
    fontSize: 28,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    paddingVertical: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1a1c1c',
    minWidth: 200,
  },
  sectionWrapper: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'CabinetGrotesk-Bold',
    color: '#1a1c1c',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionSubtitle: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
    marginTop: 2,
  },
  editToggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f5f5f7',
  },
  editToggleText: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
  },
  saveToggleText: {
    color: '#00c853',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabelText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  detailValueText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
  },
  detailInput: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#f5f5f7',
    marginHorizontal: 16,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e2e2e2',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendarContainer: {
    flexDirection: 'row',
    height: 280,
    marginBottom: 20,
    backgroundColor: '#f8f8fa',
    borderRadius: 20,
    padding: 10,
  },
  calendarColumn: {
    flex: 1,
    alignItems: 'center',
  },
  calendarColumnLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#9a9a9a',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  calendarItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
  },
  calendarItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1a1c1c',
    opacity: 0.5,
  },
  calendarItemTextSelected: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1a1c1c',
    opacity: 1,
  },
  confirmBtn: {
    paddingVertical: 16,
    backgroundColor: '#1a1c1c',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#1a1c1c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerBlur: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  primaryBtn: {
    height: 58,
    borderRadius: 16,
    backgroundColor: '#1a1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});





