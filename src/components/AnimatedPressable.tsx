import React, { useRef } from 'react';
import { Animated, TouchableOpacity, ViewStyle } from 'react-native';

type AnimatedPressableProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  activeOpacity?: number;
  disabled?: boolean;
  scaleTo?: number;
};

export default function AnimatedPressable({
  children, onPress, style, activeOpacity = 0.8, disabled, scaleTo = 0.96,
}: AnimatedPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}
