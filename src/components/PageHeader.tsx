import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Heroicon } from '../Heroicon';
import { useAppContext } from '../context/AppContext';
import AnimatedPressable from './AnimatedPressable';
import type { RootStackParamList } from '../types';

type PageHeaderProps = {
  title: string;
  showProfile?: boolean;
  showBack?: boolean;
  dark?: boolean;
};

export default function PageHeader({ title, showProfile = true, showBack, dark }: PageHeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setMenuVisible } = useAppContext();
  const color = dark ? '#ffffff' : '#1a1c1c';

  return (
    <View style={[styles.header, dark && styles.darkHeader]}>
      <View style={styles.leftGroup}>
        <AnimatedPressable onPress={() => setMenuVisible(true)} style={dark ? styles.darkBtn : styles.btn}>
          <Heroicon name="menu" size={24} color={color} strokeWidth={2.5} />
        </AnimatedPressable>
        {showBack && (
          <AnimatedPressable onPress={() => navigation.goBack()} style={[dark ? styles.darkBtn : styles.btn, { marginLeft: 8 }]}>
            <Heroicon name="chevron-left" size={24} color={color} />
          </AnimatedPressable>
        )}
      </View>
      <Text style={[styles.title, dark && styles.darkTitle]}>{title}</Text>
      {showProfile ? (
        <AnimatedPressable onPress={() => navigation.navigate('Profile')} style={dark ? styles.darkBtn : styles.btn}>
          <Heroicon name="user" size={22} color={color} />
        </AnimatedPressable>
      ) : (
        <View style={dark ? styles.darkBtn : styles.btn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkHeader: {
    backgroundColor: 'transparent',
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 2,
    color: '#1a1c1c',
  },
  darkTitle: {
    fontSize: 18,
    letterSpacing: 0,
    color: '#ffffff',
  },
});
