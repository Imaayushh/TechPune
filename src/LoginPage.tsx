import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';

type LoginPageProps = {
  onSignIn: (email: string) => void;
  onTermsPress?: () => void;
};

export default function LoginPage({ onSignIn, onTermsPress }: LoginPageProps) {
  const [email, setEmail] = useState('');

  const canSubmit = useMemo(() => email.trim().length > 0, [email]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandBlock}>
            <Text style={styles.brandTitle}>TechPune</Text>
            <Text style={styles.brandSubtitle}>
              Platform for Hackathons And Daily Updates
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Join our community Today.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputShell}>
                <TextInput
                  style={styles.input}
                  placeholder="scholar@university.edu"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#9a9a9a"
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
                onPress={() => {
                  if (!canSubmit) {
                    Alert.alert('Error', 'Please enter your email address');
                    return;
                  }
                  onSignIn(email.trim());
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>

              <View style={styles.orRow}>
                <View style={styles.orSpacer} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orSpacer} />
              </View>

              <View style={styles.socialStack}>
                <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
                  <Heroicon name="google-solid" size={20} color="#1a1c1c" />
                  <Text style={styles.secondaryButtonText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
                  <Heroicon name="github-solid" size={20} color="#1a1c1c" />
                  <Text style={styles.secondaryButtonText}>Continue with GitHub</Text>
                </TouchableOpacity>
              </View>

               <TouchableOpacity
                 style={styles.termsText}
                 activeOpacity={0.8}
                 onPress={onTermsPress}
               >
                 <Text>
                   By joining, you agree to our{' '}
                   <Text style={styles.termsLink}>
                     Terms & Conditions
                   </Text>
                 </Text>
               </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 28,
    backgroundColor: '#f9f9f9',
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 26,
  },
  brandTitle: {
    fontSize: 34,
    color: '#1a1c1c',
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 0.2,
  },
  brandSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#5f5e5e',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 26,
  },
  cardTitle: {
    fontSize: 44,
    lineHeight: 50,
    color: '#1a1c1c',
    fontFamily: 'ClashDisplay-Bold',
    marginBottom: 22,
  },
  form: {
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    color: '#1a1c1c',
    fontFamily: 'CabinetGrotesk-Medium',
    marginBottom: 10,
  },
  inputShell: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: '#1a1c1c',
    fontFamily: 'Inter-Regular',
  },
  primaryButton: {
    marginTop: 18,
    height: 58,
    borderRadius: 999,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: '#e2e2e2',
    fontSize: 16,
    fontFamily: 'Inter-Semibold',
    letterSpacing: 0.2,
  },
  orRow: {
    marginTop: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  orSpacer: {
    flex: 1,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#eeeeee',
  },
  orText: {
    fontSize: 12,
    color: '#5f5e5e',
    fontFamily: 'Inter-Medium',
    letterSpacing: 1.4,
  },
   socialStack: {
     gap: 12,
   },
   secondaryButton: {
     height: 56,
     borderRadius: 999,
     backgroundColor: '#e2e2e2',
     paddingHorizontal: 18,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     gap: 10,
   },
   secondaryButtonText: {
     fontSize: 15,
     color: '#1a1c1c',
     fontFamily: 'Inter-Medium',
   },
  termsText: {
    marginTop: 18,
    fontSize: 12,
    color: '#5f5e5e',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  termsLink: {
    textDecorationLine: 'underline',
    color: '#1a1c1c',
    fontFamily: 'Inter-Medium',
  },
});

