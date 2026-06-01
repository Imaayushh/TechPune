import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

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
        placeholderTextColor="#9a9a9a"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { width: '100%' },
  label: {
    fontSize: 10, fontFamily: 'Inter-Bold', color: '#666666',
    letterSpacing: 1, marginBottom: 8, marginLeft: 4,
  },
  input: {
    backgroundColor: '#fcfcfc', borderRadius: 16, paddingHorizontal: 16,
    fontSize: 15, fontFamily: 'Inter-Medium', color: '#1a1c1c',
  },
});
