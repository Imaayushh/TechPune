import { StyleSheet, View, Text } from 'react-native';
import AnimatedPressable from './AnimatedPressable';

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
    color: '#1a1c1c',
    fontFamily: 'CabinetGrotesk-Bold',
  },
  viewAll: {
    fontSize: 14,
    color: '#1a1c1c',
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Medium',
  },
});
