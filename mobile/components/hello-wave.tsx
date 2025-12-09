import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Lightweight non-animated fallback for environments where react-native-reanimated
// is not available or causes build/runtime issues. This keeps the UI similar
// while avoiding worklet-related errors during app startup.
export function HelloWave() {
  return <Text style={styles.wave}>👋</Text>;
}

const styles = StyleSheet.create({
  wave: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
