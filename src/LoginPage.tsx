import React, { useMemo, useState, useRef } from 'react';
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
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Modal,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';

const { width } = Dimensions.get('window');

type Step = 'email' | 'identity' | 'academic' | 'complete';

type LoginPageProps = {
  onComplete: (data: { email: string; name: string; college: string; year: string }) => void;
  onTermsPress?: () => void;
};

export default function LoginPage({ onComplete, onTermsPress }: LoginPageProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');

  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  

  
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;


  const canSubmitEmail = useMemo(() => email.trim().length > 0 && email.includes('@'), [email]);

  const canSubmitIdentity = useMemo(() => name.trim().length > 0, [name]);
  const canSubmitAcademic = useMemo(() => college.trim().length > 0 && year !== '', [college, year]);

  const animateToStep = (nextStep: Step) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -20, duration: 200, useNativeDriver: true })
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true })
      ]).start();
    });
  };

  const handleEmailSubmit = () => {
    if (!canSubmitEmail) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    animateToStep('identity');
  };



  const renderEmailStep = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Join our community Today.</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputShell}>
          <TextInput
            style={styles.input}
            placeholder="email id"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#9a9a9a"
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, !canSubmitEmail && styles.primaryButtonDisabled]}
          onPress={handleEmailSubmit}
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

        <TouchableOpacity style={styles.termsText} activeOpacity={0.8} onPress={onTermsPress}>
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
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [showCollegePicker, setShowCollegePicker] = useState(false);
  const puneColleges = [
    'Mukunddas Lohia College Of Engineering',
    'College of Engineering Pune (COEP)',
    'Pune Institute of Computer Technology (PICT)',
    'Vishwakarma Institute of Technology (VIT)',
    'MIT World Peace University (MIT-WPU)',
    'Cummins College of Engineering for Women',
    'D.Y. Patil College of Engineering',
    'AISSMS College of Engineering',
    'Bharati Vidyapeeth College of Engineering',
    'Symbiosis Institute of Technology (SIT)',
    'Other'
  ];

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
          <Text style={[styles.input, { textAlign: 'center' }, !college && { color: '#9a9a9a' }]}>
            {college || 'Select your College'}
          </Text>
          <Heroicon name="chevron-down" size={20} color="#9a9a9a" />
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
              {puneColleges.map((c) => (
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
          <Heroicon name="check-solid" size={32} color="#000" />
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
          onPress={() => onComplete({ email, name, college, year })}
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
          {step !== 'email' && step !== 'complete' && (
            <TouchableOpacity 
              style={styles.topBackButton} 
              onPress={() => animateToStep(step === 'identity' ? 'email' : 'identity')}
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
            {step === 'email' && renderEmailStep()}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 38,
    lineHeight: 44,
    color: '#1a1c1c',
    fontFamily: 'ClashDisplay-Bold',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontSize: 15,
    color: '#5f5e5e',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
    lineHeight: 22,
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1c1c',
    fontFamily: 'Inter-Regular',
  },
  primaryButton: {
    marginTop: 8,
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
  backText: {
    fontSize: 14,
    color: '#5f5e5e',
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  noCardContent: {
    flex: 1,
    paddingTop: 10,
    minHeight: 400,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  topBackButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  modalBackText: {
    fontSize: 14,
    color: '#5f5e5e',
    fontFamily: 'Inter-Medium',
    marginLeft: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: 22,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  pickerHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e2e2e2',
    alignSelf: 'center',
    marginBottom: 20,
  },
  pickerTitle: {
    fontSize: 20,
    fontFamily: 'ClashDisplay-Bold',
    color: '#1a1c1c',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerItem: {
    paddingVertical: 16,
    // No-Line Rule: Removed border
  },
  pickerItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#5f5e5e',
  },
  pickerItemTextActive: {
    color: '#1a1c1c',
    fontFamily: 'Inter-Bold',
  },
  completeContent: {
    marginBottom: 20,
  },
  summaryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});
