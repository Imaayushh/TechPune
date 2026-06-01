import { useRef } from 'react';
import { Animated } from 'react-native';

export function useFadeIn(_opts?: unknown) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  return { fadeAnim, slideAnim };
}
