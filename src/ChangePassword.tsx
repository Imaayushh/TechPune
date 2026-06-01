import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Heroicon } from './Heroicon';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedPressable from './components/AnimatedPressable';
import { useFadeIn } from './hooks/useFadeIn';
import PageHeader from './components/PageHeader';

export default function ChangePassword() {
  const navigation = useNavigation();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { fadeAnim, slideAnim } = useFadeIn({ duration: 400, slideFrom: 20 });

  const getPasswordStrength = (pw: string): { label: string; color: string; score: number } => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    if (score <= 2) return { label: 'Weak', color: '#ff4b4b', score };
    if (score <= 3) return { label: 'Medium', color: '#ffa500', score };
    return { label: 'Strong', color: '#00c853', score };
  };

  const handleUpdate = () => {
    if (!currentPw || !newPw || !confirmPw) {
      Alert.alert('Error', 'Please fill in all fields.'); return;
    }
    if (newPw.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters long.'); return;
    }
    if (getPasswordStrength(newPw).score < 3) {
      Alert.alert('Weak Password', 'Use a mix of uppercase, lowercase, numbers, and symbols.'); return;
    }
    if (newPw !== confirmPw) {
      Alert.alert('Error', 'Passwords do not match.'); return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Your password has been updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 2000);
  };

  const PasswordInput = ({
    label, value, onChangeText, show, setShow, placeholder,
  }: {
    label: string; value: string; onChangeText: (t: string) => void; show: boolean; setShow: (s: boolean) => void; placeholder?: string;
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Heroicon name="lock" size={18} color="#444444" />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!show}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          placeholderTextColor="#444444"
        />
        <AnimatedPressable onPress={() => setShow(!show)} style={styles.eyeBtn}>
          <Heroicon name={show ? 'eye' : 'eye-slash'} size={18} color="#666666" />
        </AnimatedPressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
<PageHeader title="Change Password" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.infoCard}>
            <Heroicon name="shield-lock" size={24} color="#1a1c1c" />
            <Text style={styles.infoText}>
              Strong passwords include a mix of letters, numbers, and symbols.
            </Text>
          </View>

          <View style={styles.formCard}>
            <PasswordInput label="Current Password" value={currentPw} onChangeText={setCurrentPw} show={showCurrent} setShow={setShowCurrent} />
            <View style={styles.divider} />
            <PasswordInput label="New Password" value={newPw} onChangeText={setNewPw} show={showNew} setShow={setShowNew} placeholder="Min 8 chars, mix of cases, numbers & symbols" />
            <View style={styles.divider} />
            <PasswordInput label="Confirm New Password" value={confirmPw} onChangeText={setConfirmPw} show={showConfirm} setShow={setShowConfirm} />
          </View>

          <AnimatedPressable style={[styles.updateBtn, { opacity: isLoading ? 0.7 : 1 }]} onPress={handleUpdate} disabled={isLoading}>
            <LinearGradient colors={isLoading ? ['#333333', '#333333'] : ['#1a1c1c', '#333333']} style={styles.btnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.updateText}>Update Password</Text>
              )}
            </LinearGradient>
          </AnimatedPressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  content: { padding: 20 },
  infoCard: { flexDirection: 'row', backgroundColor: '#ffffff', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 32, gap: 16 },
  infoText: { flex: 1, fontSize: 13, fontFamily: 'Inter-Medium', color: '#666666', lineHeight: 18 },
  formCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 20, marginBottom: 40 },
  inputGroup: { paddingVertical: 12 },
  inputLabel: { fontSize: 10, fontFamily: 'Inter-Bold', color: '#9a9a9a', letterSpacing: 1.5, marginBottom: 12, textTransform: 'uppercase' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f7', borderRadius: 16, paddingHorizontal: 16, height: 56 },
  input: { flex: 1, marginLeft: 12, fontSize: 15, fontFamily: 'Inter-Semibold', color: '#1a1c1c' },
  eyeBtn: { padding: 8 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 4 },
  updateBtn: { height: 60, borderRadius: 20, overflow: 'hidden' },
  btnGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  updateText: { fontSize: 16, fontFamily: 'Inter-Bold', color: '#ffffff' },
});

