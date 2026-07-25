import { StyleSheet, TouchableOpacity, Text, type ViewStyle } from 'react-native';
import { Heroicon } from '../Heroicon';
import { colors } from '../constants/theme';

type ActionButtonProps = {
  label: string;
  icon?: 'arrow-right' | 'chevron-right';
  onPress?: () => void;
  style?: ViewStyle;
};

export default function ActionButton({ label, icon = 'arrow-right', onPress, style }: ActionButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.label}>{label}</Text>
      <Heroicon name={icon} size={16} color="#ffffff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  label: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
});
