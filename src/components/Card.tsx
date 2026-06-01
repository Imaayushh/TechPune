import { StyleSheet, View, type ViewStyle } from 'react-native';

type CardProps = {
  children: React.ReactNode;
  padding?: number;
  shadow?: boolean;
  style?: ViewStyle;
};

export default function Card({ children, padding = 20, shadow = false, style }: CardProps) {
  return (
    <View style={[styles.card, { padding }, shadow && styles.shadow, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});
