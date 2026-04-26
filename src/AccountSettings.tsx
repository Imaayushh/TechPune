import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

// Reusable Animated Button Wrapper
const AnimatedPressable = ({ children, onPress, style, activeOpacity = 0.7 }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
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
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export type AccountSettingsProps = {
  onBack: () => void;
  onNavigate: (screen: string) => void;
};

export default function AccountSettings({ onBack, onNavigate }: AccountSettingsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;
  const modalScale = useRef(new Animated.Value(0.95)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (showDeleteModal) {
      Animated.parallel([
        Animated.spring(modalScale, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true }),
        Animated.timing(modalOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      modalScale.setValue(0.95);
      modalOpacity.setValue(0);
    }
  }, [showDeleteModal]);

  const SettingRow = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    isDanger = false, 
    showArrow = true 
  }: { 
    icon: string, 
    title: string, 
    description?: string, 
    onPress: () => void, 
    isDanger?: boolean,
    showArrow?: boolean
  }) => (
    <AnimatedPressable style={styles.row} onPress={onPress}>
      <View style={[styles.iconContainer, isDanger && styles.dangerIconContainer]}>
        <Heroicon name={icon} size={18} color={isDanger ? '#ff4b4b' : '#9a9a9a'} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowTitle, isDanger && styles.dangerText]}>{title}</Text>
        {description && <Text style={styles.rowDescription}>{description}</Text>}
      </View>
      {showArrow && !isDanger && <Heroicon name="chevron-right" size={16} color="#333333" />}
    </AnimatedPressable>
  );

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    Alert.alert("Account Deleted", "Your account has been permanently removed.");
    onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#ffffff" />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Security Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SECURITY</Text>
            <View style={styles.card}>
              <SettingRow 
                icon="lock-solid" 
                title="Change Password" 
                onPress={() => onNavigate('changePassword')} 
              />
            </View>
          </View>

          {/* Account Control Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT CONTROL</Text>
            <View style={styles.card}>
              <SettingRow 
                icon="x-solid" 
                title="Log out from all devices" 
                description="Securely sign out from every active session"
                onPress={() => {
                  Alert.alert(
                    "Log out from all devices?",
                    "You will be signed out from all active sessions on other phones and computers.",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Log Out", onPress: () => Alert.alert("Success", "You have been logged out from all other devices.") }
                    ]
                  );
                }}
                showArrow={false}
              />
            </View>
          </View>

          {/* Danger Zone */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DANGER ZONE</Text>
            <View style={[styles.card, styles.dangerCard]}>
              <SettingRow 
                icon="trash-solid" 
                title="Delete Account" 
                onPress={() => setShowDeleteModal(true)} 
                isDanger={true}
                showArrow={false}
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          <Animated.View style={[
            styles.modalContent, 
            { opacity: modalOpacity, transform: [{ scale: modalScale }] }
          ]}>
            <View style={styles.modalIcon}>
              <Heroicon name="trash-solid" size={32} color="#ff4b4b" />
            </View>
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalDescription}>
              This action is permanent and cannot be undo. All your data will be wiped from our servers.
            </Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteBtn} 
                onPress={handleDeleteAccount}
              >
                <Text style={styles.deleteText}>Delete Forever</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'ClashDisplay-Bold',
    color: '#ffffff',
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#444444',
    letterSpacing: 1.5,
    marginBottom: 16,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#0a0a0a',
    borderRadius: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  dangerCard: {
    borderColor: 'rgba(255, 75, 75, 0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 18,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dangerIconContainer: {
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontFamily: 'Inter-Semibold',
    color: '#ffffff',
  },
  rowDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginTop: 2,
  },
  dangerText: {
    color: '#ff4b4b',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 32,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#0a0a0a',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'ClashDisplay-Bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#ff4b4b',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});
