import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import Hackathons from '../Hackathons';
import News from '../News';
import Courses from '../Courses';
import { Heroicon, type IconName } from '../Heroicon';

type TabConfig = {
  name: string;
  component: React.ComponentType;
  icon: IconName;
  activeIcon: IconName;
};

const tabs: TabConfig[] = [
  { name: 'Dashboard', component: Dashboard, icon: 'home', activeIcon: 'home' },
  { name: 'Hackathons', component: Hackathons, icon: 'code-bracket', activeIcon: 'code-bracket' },
  { name: 'News', component: News, icon: 'newspaper', activeIcon: 'newspaper' },
  { name: 'Courses', component: Courses, icon: 'book-stack', activeIcon: 'book-stack' },
];

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <Heroicon name={focused ? tab.activeIcon : tab.icon} size={20} color={focused ? '#ffffff' : '#666666'} />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fcfcfc',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    height: 72,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  iconContainer: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  iconContainerActive: { backgroundColor: '#1a1c1c' },
});
