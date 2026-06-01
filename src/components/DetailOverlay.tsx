import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heroicon } from '../Heroicon';

type DetailOverlayProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  bgColor?: string;
};

export default function DetailOverlay({ visible, onClose, title, children, bgColor = '#ffffff' }: DetailOverlayProps) {
  if (!visible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor: bgColor }]}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Heroicon name="x" size={24} color="#1a1c1c" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={{ width: 44 }} />
        </View>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: 'ClashDisplay-Bold',
    letterSpacing: 2,
    color: '#1a1c1c',
  },
});
