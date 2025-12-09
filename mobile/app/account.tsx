import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Account</Text>
        <Text style={styles.subheading}>Manage your bookings and profile.</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Signed in as</Text>
          <Text style={styles.bodyText}>— not signed in —</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bookings</Text>
          <Text style={styles.bodyText}>No bookings to show yet.</Text>
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#222' },
  container: { padding: 16 },
  heading: { fontSize: 28, fontWeight: '700', color: '#f9fafb', marginBottom: 8 },
  subheading: { color: '#9ca3af', marginBottom: 16 },
  section: { marginBottom: 16 },
  label: { color: '#e5e7eb', marginBottom: 6 },
  bodyText: { color: '#d1d5db' },
  footerSpace: { height: 48 },
});
