import { StyleSheet, View, Text } from 'react-native';

type ProgressBarProps = {
  percent: number;
  showLabel?: boolean;
  trackColor?: string;
};

export default function ProgressBar({ percent, showLabel = false, trackColor = '#e2e2e2' }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { backgroundColor: trackColor }]}>
        <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, percent))}%` }]} />
      </View>
      {showLabel && <Text style={styles.label}>{percent}% Complete</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  fill: {
    height: '100%',
    backgroundColor: '#1a1c1c',
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#474747',
  },
});
