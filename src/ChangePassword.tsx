import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from './Heroicon';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

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
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export type ChangePasswordProps = {
  onBack: () => void;
};

export default function ChangePassword({ onBack }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Your password has been updated successfully.', [
        { text: 'OK', onPress: onBack }
      ]);
    }, 2000);
  };

  const PasswordInput = ({ 
    label, 
    value, 
    onChange, 
    show, 
    setShow 
  }: { 
    label: string, 
    value: string, 
    onChange: (t: string) => void, 
    show: boolean, 
    setShow: (s: boolean) => void 
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Heroicon name="lock-solid" size={18} color="#444444" />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          secureTextEntry={!show}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#444444"
        />
        <AnimatedPressable onPress={() => setShow(!show)} style={styles.eyeBtn}>
          <Heroicon name={show ? 'eye-solid' : 'eye-slash-solid'} size={18} color="#666666" />
        </AnimatedPressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AnimatedPressable onPress={onBack} style={styles.backBtn}>
          <Heroicon name="chevron-left" size={24} color="#ffffff" />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.infoCard}>
            <Heroicon name="shield-lock-solid" size={24} color="#ffffff" />
            <Text style={styles.infoText}>
              Strong passwords include a mix of letters, numbers, and symbols.
            </Text>
          </View>

          <View style={styles.formCard}>
            <PasswordInput 
              label="Current Password" 
              value={currentPassword} 
              onChange={setCurrentPassword} 
              show={showCurrent} 
              setShow={setShowCurrent} 
            />
            <View style={styles.divider} />
            <PasswordInput 
              label="New Password" 
              value={newPassword} 
              onChange={setNewPassword} 
              show={showNew} 
              setShow={setShowNew} 
            />
            <View style={styles.divider} />
            <PasswordInput 
              label="Confirm New Password" 
              value={confirmPassword} 
              onChange={setConfirmPassword} 
              show={showConfirm} 
              setShow={setShowConfirm} 
            />
          </View>

          <AnimatedPressable 
            style={[styles.updateBtn, isLoading && styles.disabledBtn]} 
            onPress={handleUpdate}
            disabled={isLoading}
          >
            <LinearGradient
              colors={isLoading ? ['#333333', '#333333'] : ['#1a1c1c', '#333333']}
              style={styles.btnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
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
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#9a9a9a',
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
    marginBottom: 40,
  },
  inputGroup: {
    paddingVertical: 12,
  },
  inputLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#444444',
    letterSpacing: 1.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontFamily: 'Inter-Semibold',
    color: '#ffffff',
  },
  eyeBtn: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginVertical: 4,
  },
  updateBtn: {
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
  },
  disabledBtn: {
    opacity: 0.7,
  },
  btnGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});
