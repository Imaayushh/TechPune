import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  height?: number;
};

export default function InputField({
  label, value, onChangeText, placeholder, multiline = false, height = 56,
}: InputFieldProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, { height: multiline ? 120 : height }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { width: '100%' },
  label: {
    fontSize: 10, fontFamily: 'Inter-Bold', color: colors.textSubtitle,
    letterSpacing: 1, marginBottom: 8, marginLeft: 4,
  },
  input: {
    backgroundColor: colors.background, borderRadius: 16, paddingHorizontal: 16,
    fontSize: 15, fontFamily: 'Inter-Medium', color: colors.primary,
  },
});
