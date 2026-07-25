import { StyleSheet, View, Text } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import { colors } from '../constants/theme';

type SectionHeaderProps = {
  title: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
};

export default function SectionHeader({ title, viewAllLabel, onViewAll }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {viewAllLabel && onViewAll && (
        <AnimatedPressable onPress={onViewAll}>
          <Text style={styles.viewAll}>{viewAllLabel}</Text>
        </AnimatedPressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: 'CabinetGrotesk-Bold',
  },
  viewAll: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Medium',
  },
});
