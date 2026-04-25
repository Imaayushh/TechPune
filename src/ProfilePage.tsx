import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ProfilePageProps = {
  onBack: () => void;
  userEmail?: string;
};

type PersonalInfo = {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  dob: string;
};

export default function ProfilePage({ onBack, userEmail }: ProfilePageProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'Admin User',
    email: userEmail || 'admin@techpune.com',
    mobile: '+91 9876543210',
    address: '123 Tech Park, Pune, Maharashtra',
    dob: '15 August 1995',
  });

  const handleChangePicture = () => {
    Alert.alert('Change Picture', 'This feature will be available soon.');
  };

  const toggleEdit = () => {
    if (isEditing) Alert.alert('Success', 'Profile information updated.');
    setIsEditing(!isEditing);
  };

  const handleAction = (action: string) => {
    Alert.alert(action, `Redirecting to ${action} settings...`);
  };

  const renderField = (
    label: string,
    value: string,
    key: keyof PersonalInfo,
    isLast = false,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
  ) => (
    <View key={key} style={[styles.fieldItem, !isLast && styles.fieldItemSpacing]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <View style={styles.fieldInputShell}>
          <TextInput
            style={styles.fieldInput}
            value={value}
            onChangeText={(text) => setPersonalInfo({ ...personalInfo, [key]: text })}
            keyboardType={keyboardType}
            autoCapitalize="none"
          />
        </View>
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.headerIcon} activeOpacity={0.8}>
          <Text style={styles.headerIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE</Text>
        <View style={styles.headerIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeaderSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarPlaceholder}>⌁</Text>
              )}
            </View>
            <TouchableOpacity style={styles.penIconContainer} onPress={handleChangePicture} activeOpacity={0.85}>
              <Text style={styles.penIcon}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userInfoTop}>
            <Text style={styles.userNameText}>{personalInfo.fullName}</Text>
            <Text style={styles.userEmailText}>{personalInfo.email}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoSectionHeader}>
            <Text style={styles.sectionHeading}>Personal Information</Text>
            <TouchableOpacity style={styles.editBtn} onPress={toggleEdit} activeOpacity={0.85}>
              <Text style={styles.editBtnText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoFields}>
            {renderField('Full Name', personalInfo.fullName, 'fullName')}
            {renderField('Email Address', personalInfo.email, 'email', false, 'email-address')}
            {renderField('Mobile Number', personalInfo.mobile, 'mobile')}
            {renderField('Address', personalInfo.address, 'address')}
            {renderField('Date of Birth', personalInfo.dob, 'dob', true)}
          </View>
        </View>

        <View style={styles.additionalSettings}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => handleAction('Change Password')}
            activeOpacity={0.85}
          >
            <View style={styles.actionLeft}>
              <View style={styles.iconBox}>
                <Text style={styles.blackIcon}>▦</Text>
              </View>
              <Text style={styles.actionText}>Change Password</Text>
            </View>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>

          <View style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <View style={styles.iconBox}>
                <Text style={styles.blackIcon}>▤</Text>
              </View>
              <Text style={styles.actionText}>Two-Factor Authentication</Text>
            </View>
            <Switch
              value={is2FAEnabled}
              onValueChange={setIs2FAEnabled}
              trackColor={{ false: '#e2e2e2', true: '#3b3b3b' }}
              thumbColor={'#ffffff'}
            />
          </View>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => handleAction('Help & Support')}
            activeOpacity={0.85}
          >
            <View style={styles.actionLeft}>
              <View style={styles.iconBox}>
                <Text style={styles.blackIcon}>?</Text>
              </View>
              <Text style={styles.actionText}>Help & Support</Text>
            </View>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  headerIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 18,
    color: '#1a1c1c',
    fontFamily: 'Inter-Medium',
  },
  headerTitle: {
    fontSize: 11,
    letterSpacing: 2.2,
    color: '#1a1c1c',
    fontFamily: 'Inter-Semibold',
  },
  scrollContent: {
    paddingBottom: 48,
  },
  profileHeaderSection: {
    alignItems: 'center',
    paddingTop: 26,
    paddingBottom: 18,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    fontSize: 28,
    color: '#1a1c1c',
    fontFamily: 'Inter-Semibold',
  },
  penIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1a1c1c',
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  penIcon: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter-Semibold',
  },
  userInfoTop: {
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 28,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
  },
  userEmailText: {
    fontSize: 14,
    color: '#5f5e5e',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  infoContainer: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 22,
    marginBottom: 24,
  },
  infoSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: 'CabinetGrotesk-Bold',
    color: '#1a1c1c',
  },
  editBtn: {
    backgroundColor: '#e2e2e2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  editBtnText: {
    color: '#1a1c1c',
    fontSize: 12,
    fontFamily: 'Inter-Semibold',
  },
  infoFields: {},
  fieldItem: {
    paddingVertical: 10,
  },
  fieldItemSpacing: { marginBottom: 14 },
  fieldLabel: {
    fontSize: 11,
    color: '#5f5e5e',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: 'Inter-Semibold',
    marginBottom: 6,
  },
  fieldValue: {
    fontSize: 15,
    color: '#1a1c1c',
    fontFamily: 'Inter-Medium',
  },
  fieldInputShell: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  fieldInput: {
    fontSize: 15,
    color: '#1a1c1c',
    fontFamily: 'Inter-Regular',
  },
  additionalSettings: {
    marginHorizontal: 20,
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  blackIcon: {
    fontSize: 15,
    color: '#1a1c1c',
    fontFamily: 'Inter-Semibold',
  },
  actionText: {
    fontSize: 14,
    color: '#1a1c1c',
    fontFamily: 'Inter-Medium',
  },
  chevron: {
    fontSize: 16,
    color: '#5f5e5e',
    fontFamily: 'Inter-Medium',
  },
});

