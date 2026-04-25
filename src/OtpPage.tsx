import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type OtpPageProps = {
  email: string;
  onVerify: () => void;
  onBack: () => void;
};

export default function OtpPage({ email, onVerify, onBack }: OtpPageProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [sendStatus, setSendStatus] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue === '123456') onVerify();
    else setError('Invalid OTP. Please try again.');
  };

  const handleSendOtp = () => {
    setSendStatus(`OTP sent to ${email}`);
    setTimeout(() => setSendStatus(''), 3000);
  };

  const handleTryAgain = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    handleSendOtp();
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
          <Text style={styles.emailText}>{email}</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleChange(value.replace(/[^0-9]/g, '').slice(-1), index)}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          {!!error && <Text style={styles.errorText}>{error}</Text>}
          {!!sendStatus && <Text style={styles.statusText}>{sendStatus}</Text>}

          <TouchableOpacity style={styles.verifyButton} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={handleTryAgain} activeOpacity={0.85}>
              <Text style={styles.linkText}>Send again</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onBack} activeOpacity={0.85}>
              <Text style={styles.linkText}>Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
  title: { fontSize: 34, color: '#1a1c1c', fontFamily: 'ClashDisplay-Bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#5f5e5e', fontFamily: 'Inter-Regular' },
  emailText: { fontSize: 14, color: '#1a1c1c', fontFamily: 'Inter-Medium', marginTop: 4, marginBottom: 18 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 14 },
  otpInput: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#f3f3f3',
    textAlign: 'center',
    fontSize: 18,
    color: '#1a1c1c',
    fontFamily: 'Inter-Semibold',
  },
  errorText: { color: '#b91c1c', fontFamily: 'Inter-Regular', marginTop: 6 },
  statusText: { color: '#5f5e5e', fontFamily: 'Inter-Regular', marginTop: 6 },
  verifyButton: {
    marginTop: 18,
    height: 58,
    borderRadius: 999,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: { color: '#e2e2e2', fontSize: 16, fontFamily: 'Inter-Semibold' },
  actionsRow: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' },
  linkText: { color: '#1a1c1c', textDecorationLine: 'underline', fontFamily: 'Inter-Medium' },
});

