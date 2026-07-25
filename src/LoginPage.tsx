import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
  Modal,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

import { Heroicon } from './Heroicon';
import { useAppContext } from './context/AppContext';
import { PUNE_COLLEGES } from './constants/colleges';
import { colors } from './constants/theme';
import { useResponsive } from './hooks/useResponsive';
import type { RootStackParamList } from './types';
import { supabase } from './lib/supabase';

// This is needed for expo-web-browser
WebBrowser.maybeCompleteAuthSession();

type Step = 'auth' | 'identity' | 'academic' | 'complete';

export default function LoginPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { updateUser } = useAppContext();
  const { sp, fs } = useResponsive();
  const [step, setStep] = useState<Step>('auth');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');

  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const canSubmitIdentity = name.trim().length > 0;

  const stepOrder: Step[] = ['auth', 'identity', 'academic', 'complete'];

  const animateToStep = (nextStep: Step) => {
    const currentIdx = stepOrder.indexOf(step);
    const nextIdx = stepOrder.indexOf(nextStep);
    const isForward = nextIdx > currentIdx;
    const outSlide = isForward ? -20 : 20;
    const inSlide = isForward ? 20 : -20;

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: outSlide, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      slideAnim.setValue(inSlide);
      setStep(nextStep);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setEmail(session.user.email || '');
        setName(session.user.user_metadata?.full_name || '');
        animateToStep('identity');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && step === 'auth') {
        setEmail(session.user.email || '');
        setName(session.user.user_metadata?.full_name || '');
        animateToStep('identity');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No redirect URL returned');

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
      
      if (result.type === 'success') {
        // Parse the URL to get the hash or query params
        const urlParams = new URL(result.url);
        const hashParams = new URLSearchParams(urlParams.hash.replace('#', '?'));
        
        const accessToken = hashParams.get('access_token') || urlParams.searchParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') || urlParams.searchParams.get('refresh_token');

        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) throw sessionError;
        } else {
           // Fallback for some flows where Supabase handles the session natively through deep links
           // We'll let the onAuthStateChange listener handle it if the session is picked up
        }
      }
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  const handleComplete = () => {
    updateUser({ email, fullName: name, college, isProfileComplete: false });
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  };

  const [showCollegePicker, setShowCollegePicker] = useState(false);

  const renderAuthStep = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Join our community Today.</Text>
      <View style={styles.form}>
        
        <View style={styles.socialStack}>
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => handleOAuthLogin('google')}
          >
            <Heroicon name="google" size={20} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => handleOAuthLogin('github')}
          >
            <Heroicon name="github" size={20} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Continue with GitHub</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.termsText}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Terms')}
        >
          <Text>
            By joining, you agree to our{' '}
            <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderIdentityStep = () => (
    <View style={styles.noCardContent}>
      <View style={styles.centeredContent}>
        <Text style={[styles.cardTitle, { textAlign: 'center' }]}>First, your name.</Text>
        <Text style={[styles.stepSubtitle, { textAlign: 'center' }]}>What should we call you in the community?</Text>

        <View style={styles.inputShell}>
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="e.g. Ayush Singh"
            placeholderTextColor="#9a9a9a"
            value={name}
            onChangeText={setName}
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, !canSubmitIdentity && styles.primaryButtonDisabled, { width: '100%' }]}
          onPress={() => animateToStep('academic')}
          activeOpacity={0.85}
          disabled={!canSubmitIdentity}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAcademicStep = () => (
    <View style={styles.noCardContent}>
      <View style={styles.centeredContent}>
        <Text style={[styles.cardTitle, { textAlign: 'center' }]}>Where do you study?</Text>
        <Text style={[styles.stepSubtitle, { textAlign: 'center' }]}>Tell us about your current academic home.</Text>

        <TouchableOpacity
          style={[styles.inputShell, { width: '100%' }]}
          onPress={() => setShowCollegePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.input, { textAlign: 'center' }, !college && { color: '#666666' }]}>
            {college || 'Select your College'}
          </Text>
          <Heroicon name="chevron-down" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, !college && styles.primaryButtonDisabled, { width: '100%' }]}
          onPress={() => college && animateToStep('complete')}
          activeOpacity={0.85}
          disabled={!college}
        >
          <Text style={styles.primaryButtonText}>Finish Setup</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showCollegePicker} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowCollegePicker(false)} />
          <View style={styles.pickerContent}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setShowCollegePicker(false)} style={styles.modalBackButton}>
                <Heroicon name="chevron-left" size={20} color="#5f5e5e" />
                <Text style={styles.modalBackText}>Back</Text>
              </TouchableOpacity>
              <View style={styles.pickerHandle} />
              <View style={{ width: 60 }} />
            </View>
            <Text style={styles.pickerTitle}>Select College</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {PUNE_COLLEGES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={styles.pickerItem}
                  onPress={() => {
                    setCollege(c);
                    setShowCollegePicker(false);
                  }}
                >
                  <Text style={[styles.pickerItemText, college === c && styles.pickerItemTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );

  const renderCompleteStep = () => (
    <View style={styles.noCardContent}>
      <View style={[styles.centeredContent, { paddingVertical: 40 }]}>
        <View style={styles.iconCircle}>
          <Heroicon name="check" size={32} color={colors.primary} />
        </View>
        <Text style={[styles.cardTitle, { textAlign: 'center' }]}>You're all set!</Text>
        <Text style={[styles.stepSubtitle, { textAlign: 'center', marginBottom: 30 }]}>
          Ready to discover premium opportunities tailored for you.
        </Text>

        <View style={[styles.completeContent, { marginVertical: 30 }]}>
          <Text style={[styles.summaryText, { textAlign: 'center' }]}>Welcoming {name} from {college}.</Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { width: '100%', marginTop: 20 }]}
          onPress={handleComplete}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 28 + insets.bottom }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step !== 'auth' && step !== 'complete' && (
            <TouchableOpacity
              style={styles.topBackButton}
              onPress={() => animateToStep(step === 'identity' ? 'auth' : 'identity')}
            >
              <Heroicon name="chevron-left" size={20} color="#5f5e5e" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}

          <View style={styles.brandBlock}>
            <Text style={styles.brandTitle}>TechPune</Text>
            <Text style={styles.brandSubtitle}>
              Platform for Hackathons And Daily Updates
            </Text>
          </View>

          <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {step === 'auth' && renderAuthStep()}
            {step === 'identity' && renderIdentityStep()}
            {step === 'academic' && renderAcademicStep()}
            {step === 'complete' && renderCompleteStep()}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
  brandBlock: { alignItems: 'center', marginBottom: 26 },
  brandTitle: { fontSize: 34, color: colors.primary, fontFamily: 'ClashDisplay-Bold', letterSpacing: 0.2 },
  brandSubtitle: { marginTop: 8, fontSize: 14, color: colors.textLight, textAlign: 'center', fontFamily: 'Inter-Regular' },
  card: {
    backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: 22, paddingVertical: 26,
    shadowColor: colors.black, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 2,
  },
  cardTitle: { fontSize: 38, lineHeight: 44, color: colors.primary, fontFamily: 'ClashDisplay-Bold', marginBottom: 12 },
  stepSubtitle: { fontSize: 15, color: colors.textLight, fontFamily: 'Inter-Regular', marginBottom: 8, lineHeight: 22 },
  form: { marginTop: 2 },
  label: { fontSize: 13, color: colors.primary, fontFamily: 'CabinetGrotesk-Medium', marginBottom: 10 },
  inputShell: {
    height: 56, borderRadius: 14, backgroundColor: colors.inputBg, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
  },
  input: { flex: 1, fontSize: 16, color: colors.primary, fontFamily: 'Inter-Regular' },
  primaryButton: { marginTop: 8, height: 58, borderRadius: 999, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  primaryButtonDisabled: { opacity: 0.55 },
  primaryButtonText: { color: '#e2e2e2', fontSize: 16, fontFamily: 'Inter-Semibold', letterSpacing: 0.2 },
  socialStack: { gap: 12, marginTop: 16, marginBottom: 16 },
  secondaryButton: {
    height: 56, borderRadius: 999, backgroundColor: '#f0f0f0', paddingHorizontal: 18,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  secondaryButtonText: { fontSize: 15, color: colors.primary, fontFamily: 'Inter-Medium' },
  termsText: { marginTop: 18, fontSize: 12, color: colors.textLight, textAlign: 'center', fontFamily: 'Inter-Regular' },
  termsLink: { textDecorationLine: 'underline', color: colors.primary, fontFamily: 'Inter-Medium' },
  backText: { fontSize: 14, color: colors.textLight, fontFamily: 'Inter-Medium', marginLeft: 4 },
  iconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.surfaceTint, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  noCardContent: { flex: 1, paddingTop: 10, minHeight: 400 },
  centeredContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 40 },
  topBackButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 5 },
  pickerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  modalBackButton: { flexDirection: 'row', alignItems: 'center', width: 60 },
  modalBackText: { fontSize: 14, color: colors.textLight, fontFamily: 'Inter-Medium', marginLeft: 2 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  pickerContent: {
    backgroundColor: colors.surface, borderTopLeftRadius: 32, borderTopRightRadius: 32,
    paddingTop: 12, paddingHorizontal: 22, paddingBottom: 40, maxHeight: '70%',
  },
  pickerHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: colors.divider, alignSelf: 'center', marginBottom: 20 },
  pickerTitle: { fontSize: 20, fontFamily: 'ClashDisplay-Bold', color: colors.primary, marginBottom: 20, textAlign: 'center' },
  pickerItem: { paddingVertical: 16 },
  pickerItemText: { fontSize: 16, fontFamily: 'Inter-Medium', color: colors.textLight },
  pickerItemTextActive: { color: colors.primary, fontFamily: 'Inter-Bold' },
  completeContent: { marginBottom: 20 },
  summaryText: { fontFamily: 'Inter-Medium', fontSize: 15, color: '#444', lineHeight: 22 },
});
