import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';


import LoginPage from './src/LoginPage';
import Dashboard from './src/Dashboard';
import ProfilePage from './src/ProfilePage';

export default function App() {
  const [view, setView] = useState('login'); // 'login', 'dashboard', 'profile'
  const [email, setEmail] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'ClashDisplay-Bold': require('./src/assets/fonts/ClashDisplay-Bold.ttf'),
          'CabinetGrotesk-Medium': require('./src/assets/fonts/CabinetGrotesk-Medium.ttf'),
          'CabinetGrotesk-Bold': require('./src/assets/fonts/CabinetGrotesk-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  const handleSignIn = (userEmail) => {
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
          />
        ) : view === 'profile' ? (
          <ProfilePage 
            onBack={() => setView('dashboard')} 
            userEmail={email}
          />
        ) : (
          <LoginPage onSignIn={handleSignIn} />
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
