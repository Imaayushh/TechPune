import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Heroicon } from './Heroicon';

const { width } = Dimensions.get('window');

interface OnboardingPageProps {
  onComplete: (userData: any) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const steps = [
    {
      id: 'identity',
      title: 'First, your name.',
      subtitle: 'What should we call you in the community?',
      icon: 'user',
      render: () => (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Ayush Singh"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoFocus
          />
        </View>
      )
    },
    {
      id: 'academic',
      title: 'Where do you study?',
      subtitle: 'Tell us about your current academic home.',
      icon: 'academic-cap',
      render: () => (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="College Name"
            placeholderTextColor="#999"
            value={college}
            onChangeText={setCollege}
            autoFocus
          />
          <View style={styles.yearGrid}>
            {['1st Year', '2nd Year', '3rd Year', 'Final Year'].map((y) => (
              <TouchableOpacity 
                key={y} 
                style={[styles.yearChip, year === y && styles.yearChipActive]}
                onPress={() => setYear(y)}
              >
                <Text style={[styles.yearText, year === y && styles.yearTextActive]}>{y}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )
    },
    {
      id: 'complete',
      title: 'You\'re all set!',
      subtitle: 'Ready to discover premium opportunities tailored for you.',
      icon: 'check-solid', // Fixed: 'check-badge' did not exist
      render: () => (
        <View style={styles.completeContent}>
          <Text style={styles.summaryText}>Welcoming {name} from {college} ({year}).</Text>
        </View>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -20, duration: 200, useNativeDriver: true })
      ]).start(() => {
        setStep(step + 1);
        slideAnim.setValue(20);
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true })
        ]).start();
      });
    } else {
      onComplete({ name, college, year });
    }
  };

  const currentStep = steps[step];
  const isNextDisabled = step === 0 ? !name : step === 1 ? (!college || !year) : false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle} />
          <Text style={styles.brandText}>TechPune</Text>
        </View>
        <Text style={styles.stepIndicator}>Step {step + 1} of {steps.length}</Text>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.iconCircle}>
          {Heroicon ? (
            <Heroicon name={currentStep.icon as any} size={32} color="#000" />
          ) : (
            <View style={{ width: 32, height: 32, backgroundColor: '#eee', borderRadius: 16 }} />
          )}
        </View>
        <Text style={styles.title}>{currentStep.title}</Text>
        <Text style={styles.subtitle}>{currentStep.subtitle}</Text>
        
        {currentStep.render()}
      </Animated.View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, isNextDisabled && styles.buttonDisabled]} 
          onPress={handleNext}
          disabled={isNextDisabled}
        >
          <Text style={styles.buttonText}>{step === steps.length - 1 ? 'Get Started' : 'Continue'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    marginRight: 8,
  },
  brandText: {
    fontFamily: 'Inter-Semibold',
    fontSize: 16,
    color: '#000',
    letterSpacing: -0.5,
  },
  stepIndicator: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
  title: {
    fontFamily: 'ClashDisplay-Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 12,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#000',
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 24,
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  yearChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 99,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  yearChipActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  yearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  yearTextActive: {
    color: '#fff',
  },
  completeContent: {
    marginTop: 20,
  },
  summaryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  footer: {
    paddingBottom: 40,
  },
  button: {
    height: 56,
    backgroundColor: '#000',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    fontFamily: 'Inter-Semibold',
    fontSize: 16,
    color: '#fff',
  },
});

export default OnboardingPage;
