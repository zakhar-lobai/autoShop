import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Sign up</Text>
        <Text style={styles.subheading}>Create an account to manage bookings.</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Full name</Text>
          <TextInput placeholder="Full name" placeholderTextColor="#6b7280" style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <TextInput placeholder="you@example.com" placeholderTextColor="#6b7280" style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Password</Text>
          <TextInput placeholder="Password" placeholderTextColor="#6b7280" secureTextEntry style={styles.input} />
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>Create account</Text>
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
  input: { borderWidth: 1, borderColor: '#374151', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, color: '#f9fafb', backgroundColor: '#222' },
  button: { marginTop: 8, backgroundColor: '#facc15', paddingVertical: 14, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#111827', fontWeight: '700', fontSize: 16 },
  footerSpace: { height: 48 },
});
