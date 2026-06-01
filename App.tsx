import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import ErrorBoundary from './src/components/ErrorBoundary';
import type { RootStackParamList } from './src/types';

import LoginPage from './src/LoginPage';
import MainTabs from './src/navigation/MainTabs';
import Hamburger from './src/Hamburger';
import ProfilePage from './src/ProfilePage';
import AccountSettings from './src/AccountSettings';
import ChangePassword from './src/ChangePassword';
import SecurityPrivacy from './src/SecurityPrivacy';
import Notifications from './src/Notifications';
import TermsAndConditions from './src/TermsAndConditions';
import UploadHackathon from './src/UploadHackathon';
import UploadCourse from './src/UploadCourse';
import UploadLecture from './src/UploadLecture';
import { useAppContext } from './src/context/AppContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const { isMenuVisible } = useAppContext();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacy} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Terms" component={TermsAndConditions} />
          <Stack.Screen name="UploadHackathon" component={UploadHackathon} />
          <Stack.Screen name="UploadCourse" component={UploadCourse} />
          <Stack.Screen name="UploadLecture" component={UploadLecture} />
        </Stack.Navigator>

        {isMenuVisible && <Hamburger />}
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'ClashDisplay-Bold': require('./src/assets/fonts/ClashDisplay-Bold.ttf'),
    'CabinetGrotesk-Medium': require('./src/assets/fonts/CabinetGrotesk-Medium.ttf'),
    'CabinetGrotesk-Bold': require('./src/assets/fonts/CabinetGrotesk-Bold.ttf'),
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Semibold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1a1c1c" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
});
