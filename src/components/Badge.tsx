import { StyleSheet, View, Text } from 'react-native';

type BadgeProps = {
  label: string;
  bgColor?: string;
};

export default function Badge({ label, bgColor = '#ffffff' }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#d6d4d3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    color: '#1b1c1c',
    fontFamily: 'Inter-Semibold',
    letterSpacing: 1.0,
  },
});
