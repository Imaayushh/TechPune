import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fcfcfc' },
  title: { fontSize: 20, fontFamily: 'ClashDisplay-Bold', color: '#1a1c1c', marginBottom: 12 },
  message: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#666', textAlign: 'center', marginBottom: 24 },
  button: { backgroundColor: '#1a1c1c', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  buttonText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 14 },
});
