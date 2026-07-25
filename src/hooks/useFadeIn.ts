import { useRef, useLayoutEffect } from 'react';
import { Animated } from 'react-native';

type FadeInOptions = {
  duration?: number;
  slideFrom?: number;
};

/**
 * Returns animated values for a fade-in + slide-up effect.
 * Uses useLayoutEffect so the animation starts before the first paint,
 * preventing a visible flash of invisible content.
 */
export function useFadeIn(opts?: FadeInOptions) {
  const { duration = 400, slideFrom = 20 } = opts ?? {};
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(slideFrom)).current;

  useLayoutEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return { fadeAnim, slideAnim };
}
