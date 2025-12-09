import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Preloader({ visible = true }: { visible?: boolean }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (visible) {
      // show for a short moment to avoid flashing
      setShow(true);
      t = setTimeout(() => setShow(false), 700);
    } else {
      setShow(false);
    }
    return () => t && clearTimeout(t);
  }, [visible]);

  if (!show) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#facc15" />
        <Text style={styles.text}>Loading…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2,6,23,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  box: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    color: '#f9fafb',
    marginTop: 12,
  },
});
