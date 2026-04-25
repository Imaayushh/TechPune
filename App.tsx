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
import TermsAndConditions from './src/TermsAndConditions';

type ViewKey = 'login' | 'dashboard' | 'profile' | 'terms';

export default function App() {
  const [view, setView] = useState<ViewKey>('login');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [email, setEmail] = useState('');

  const [userName, setUserName] = useState('');

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
    setView('profile');
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
            userName={userName}
          />
        ) : view === 'profile' ? (
          <ProfilePage 
            onBack={() => setView('dashboard')} 
            userEmail={email} 
            onContinue={() => setView('dashboard')}
            userName={userName}
            onUpdateName={setUserName}
          />
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
             onTermsClick={() => {
               setIsMenuVisible(false);
               setView('terms');
             }}
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
    backgroundColor: '#f8fafc',
  },
});

