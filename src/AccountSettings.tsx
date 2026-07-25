import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Heroicon } from './Heroicon';
import { BlurView } from 'expo-blur';
import { useFadeIn } from './hooks/useFadeIn';
import SettingRow from './components/SettingRow';
import PageHeader from './components/PageHeader';
import { useAppContext } from './context/AppContext';
import { colors } from './constants/theme';
import type { RootStackParamList } from './types';

export default function AccountSettings() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { resetUser } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });
  const modalScale = useRef(new Animated.Value(0.95)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

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

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    Alert.alert("Account Deleted", "We're sad to see you go. Your account and data will be removed.", [
      { text: "OK", onPress: () => {
        resetUser();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
<PageHeader title="Account Settings" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SECURITY</Text>
            <View style={styles.card}>
              <SettingRow icon="lock" title="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT CONTROL</Text>
            <View style={styles.card}>
              <SettingRow
                icon="x"
                title="Log out from all devices"
                description="Securely sign out from every active session"
                onPress={() => {
                  Alert.alert("Log out from all devices?", "You will be signed out from all active sessions.", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Log Out", onPress: () => Alert.alert("Success", "You have been logged out from all other devices.") },
                  ]);
                }}
                showArrow={false}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DANGER ZONE</Text>
            <View style={[styles.card, styles.dangerCard]}>
              <SettingRow icon="trash" title="Delete Account" onPress={() => setShowDeleteModal(true)} isDanger={true} showArrow={false} />
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          <Animated.View style={[styles.modalContent, { opacity: modalOpacity, transform: [{ scale: modalScale }] }]}>
            <View style={styles.modalIcon}>
              <Heroicon name="trash" size={32} color="#ff4b4b" />
            </View>
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalDescription}>
              This action is permanent and cannot be undone. All your data will be wiped from our servers.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
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
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 10 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 10, fontFamily: 'Inter-Bold', color: colors.textMuted, letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 },
  card: { backgroundColor: colors.surface, borderRadius: 20, paddingVertical: 4 },
  dangerCard: { borderWidth: 1, borderColor: colors.dangerBorder },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.overlay, padding: 32 },
  modalContent: { width: '100%', backgroundColor: colors.surface, borderRadius: 28, padding: 24, alignItems: 'center' },
  modalIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.dangerBg, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontFamily: 'ClashDisplay-Bold', color: colors.primary, marginBottom: 12 },
  modalDescription: { fontSize: 14, fontFamily: 'Inter-Medium', color: colors.textSubtitle, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  modalActions: { flexDirection: 'row', gap: 12 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, backgroundColor: colors.surfaceTint, alignItems: 'center' },
  cancelText: { fontSize: 14, fontFamily: 'Inter-Bold', color: colors.primary },
  deleteBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, backgroundColor: colors.danger, alignItems: 'center' },
  deleteText: { fontSize: 14, fontFamily: 'Inter-Bold', color: colors.white },
});

