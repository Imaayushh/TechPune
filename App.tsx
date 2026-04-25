import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

import LoginPage from './src/LoginPage';
import Dashboard from './src/Dashboard';
import ProfilePage from './src/ProfilePage';
import Hamburger from './src/Hamburger';

type ViewKey = 'login' | 'dashboard' | 'profile';

export default function App() {
  const [view, setView] = useState<ViewKey>('login');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [email, setEmail] = useState('');

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
    setView('dashboard');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

        {view === 'dashboard' ? (
          <Dashboard
            onLogout={() => setView('login')}
            onProfileClick={() => setView('profile')}
            onMenuClick={() => setIsMenuVisible(true)}
          />
        ) : view === 'profile' ? (
          <ProfilePage onBack={() => setView('dashboard')} userEmail={email} />
        ) : (
          <LoginPage onSignIn={handleSignIn} />
        )}

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
            userEmail={email}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});

