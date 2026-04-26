import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

import LoginPage from './src/LoginPage';
import Dashboard from './src/Dashboard';
import ProfilePage from './src/ProfilePage';
import Hamburger from './src/Hamburger';
import AccountSettings from './src/AccountSettings';
import ChangePassword from './src/ChangePassword';
import SecurityPrivacy from './src/SecurityPrivacy';
import Notifications from './src/Notifications';
import Hackathons from './src/Hackathons';
import News from './src/News';
import Courses from './src/Courses';
import TermsAndConditions from './src/TermsAndConditions';
import OnboardingPage from './src/OnboardingPage';

type ViewKey = 'login' | 'onboarding' | 'dashboard' | 'profile' | 'settings' | 'changePassword' | 'securityPrivacy' | 'notifications' | 'hackathons' | 'news' | 'courses' | 'terms';

export default function App() {
  const [view, setView] = useState<ViewKey>('login');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userCollege, setUserCollege] = useState('');
  const [userYear, setUserYear] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(10);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [view]);

  const [fontsLoaded] = useFonts({
    'ClashDisplay-Bold': require('./src/assets/fonts/ClashDisplay-Bold.ttf'),
    'CabinetGrotesk-Medium': require('./src/assets/fonts/CabinetGrotesk-Medium.ttf'),
    'CabinetGrotesk-Bold': require('./src/assets/fonts/CabinetGrotesk-Bold.ttf'),
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Semibold': Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const handleSignIn = (userEmail: string) => {
    setEmail(userEmail);
    setView('onboarding');
  };

  const handleOnboardingComplete = (data: any) => {
    setUserName(data.name);
    setUserCollege(data.college);
    setUserYear(data.year);
    setView('dashboard');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {view === 'dashboard' ? (
            <Dashboard
              onLogout={() => setView('login')}
              onProfileClick={() => setView('profile')}
              onMenuClick={() => setIsMenuVisible(true)}
              onNavigate={(screen) => setView(screen as ViewKey)}
              userName={userName}
            />
          ) : view === 'onboarding' ? (
            <OnboardingPage
              onComplete={handleOnboardingComplete}
            />
          ) : view === 'profile' ? (
            <ProfilePage 
              onBack={() => setView('dashboard')} 
              userEmail={email} 
              onContinue={() => setView('dashboard')}
              userName={userName}
              onUpdateName={setUserName}
            />
          ) : view === 'settings' ? (
            <AccountSettings 
              onBack={() => setView('dashboard')}
              onNavigate={(screen) => setView(screen as ViewKey)}
            />
          ) : view === 'changePassword' ? (
            <ChangePassword onBack={() => setView('settings')} />
          ) : view === 'securityPrivacy' ? (
            <SecurityPrivacy onBack={() => setView('dashboard')} />
          ) : view === 'notifications' ? (
            <Notifications onBack={() => setView('dashboard')} />
          ) : view === 'hackathons' ? (
            <Hackathons onBack={() => setView('dashboard')} />
          ) : view === 'news' ? (
            <News onBack={() => setView('dashboard')} />
          ) : view === 'courses' ? (
            <Courses onBack={() => setView('dashboard')} />
          ) : view === 'terms' ? (
            <TermsAndConditions 
              onBack={() => setView('dashboard')}
              onAccept={() => setView('dashboard')}
            />
          ) : (
            <LoginPage 
              onSignIn={handleSignIn}
              onTermsPress={() => setView('terms')}
            />
          )}
        </Animated.View>

        {isMenuVisible && (
          <Hamburger
            onBack={() => setIsMenuVisible(false)}
            onLogout={() => {
              setIsMenuVisible(false);
              setView('login');
            }}
            onProfileClick={() => {
              setIsMenuVisible(false);
              setView('profile');
            }}
            onSettingsClick={() => {
              setIsMenuVisible(false);
              setView('settings');
            }}
            onSecurityClick={() => {
              setIsMenuVisible(false);
              setView('securityPrivacy');
            }}
            onNotificationsClick={() => {
              setIsMenuVisible(false);
              setView('notifications');
            }}
            onHackathonsClick={() => {
              setIsMenuVisible(false);
              setView('hackathons');
            }}
            onNewsClick={() => {
              setIsMenuVisible(false);
              setView('news');
            }}
            onCoursesClick={() => {
              setIsMenuVisible(false);
              setView('courses');
            }}
            onDashboardClick={() => {
              setIsMenuVisible(false);
              setView('dashboard');
            }}
            onTermsClick={() => {
              setIsMenuVisible(false);
              setView('terms');
            }}
            currentView={view}
            userEmail={email}
            userName={userName}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
