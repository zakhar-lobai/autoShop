import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Footer } from '@/components/Footer';
import { TopMenu } from '@/components/TopMenu';

const COLORS = {
  background: '#222',
  card: '#3e3e3e',
  stroke: '#2a2a2a',
  text: '#f9fafb',
  muted: '#9ca3af',
  accent: '#d8b074',
};

export default function SpecialOfferScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (submitting) return;
    const name = firstName.trim() || 'No name provided';
    const phone = phoneNumber.trim() || 'No phone provided';
    const emailVal = email.trim() || 'No email provided';
    const msg = message.trim() || 'No message provided';

    if (emailVal !== 'No email provided') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        Alert.alert('Check email', 'Please enter a valid email address.');
        return;
      }
    }

    setSubmitting(true);

    const payload = {
      name,
      phone,
      email: emailVal,
      message: msg,
      source: 'special-offer',
    };

    const endpoint = process.env.EXPO_PUBLIC_CONTACT_ENDPOINT;
    if (!endpoint) {
      Alert.alert(
        'Service not configured',
        'Please set EXPO_PUBLIC_CONTACT_ENDPOINT to enable automatic form delivery.',
      );
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Contact submission failed (${res.status})`);
      }

      router.push({
        pathname: '/thanks',
        params: {
          name,
          phone,
          email: emailVal,
          message: msg,
          origin: 'Special offer',
        },
      });
    } catch (err) {
      console.warn('Contact submission error', err);
      Alert.alert('Error', 'Could not submit your request. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ flex: 1 }}>
          <TopMenu />
          <ScrollView
            contentContainerStyle={[styles.container, { paddingTop: insets.top + 70 }]}
            showsVerticalScrollIndicator={false}>
          {/* Contact details / Offers */}
          <View style={[styles.section, styles.topSpacing]}>
            <Text style={styles.sectionTitle}>Contact details</Text>
            <View style={styles.accentLine} />

            <View style={[styles.card, { marginTop: 20 }]}>
              <Text style={styles.cardTitle}>Airport transfers</Text>
              <View style={[styles.accentLine, styles.smallAccent]} />
              <Text style={styles.sectionText}>
                Rent any car from our fleet for more than 3 months and get a tank of fuel for free! This is no joke!
                You don&apos;t have to worry about the cost of fuel, which is increasing day by day. We will cover your
                first fueling for you! Choose from a wide range of models and brands of luxury and comfortable cars. All
                our cars are new, well-maintained and equipped with the latest technology. Don&apos;t delay! Take advantage
                of our promotion and enjoy the freedom of driving at no extra cost!
              </Text>
            </View>

            <View style={[styles.card, { marginTop: 16 }]}>
              <Text style={styles.cardTitle}>2+1 for weekend</Text>
              <View style={[styles.accentLine, styles.smallAccent]} />
              <Text style={[styles.sectionText, { fontWeight: '700' }]}>
                Rent a car on Friday until 6 pm, return it on Monday by noon and pay for two days!
              </Text>
              <Text style={[styles.sectionText, { marginTop: 8 }]}>
                *offer for selected car models, details from consultants{'\n'}
                List of cars available in the promotion:{'\n'}
                BMW 5 Series{'\n'}
                BMW X4{'\n'}
                Mercedes-Benz C-class{'\n'}
                Mercedes-Benz E-class{'\n'}
                Mercedes-Benz GLC
              </Text>
            </View>
          </View>

          {/* Write us */}
          <View style={[styles.section, { paddingBottom: 20 }]}>
            <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>Write us</Text>
            <View style={[styles.accentLine, styles.centerLine]} />
            <Text style={styles.callText}>
              Or call us <Text style={styles.link}>+48 720 889 788</Text>
            </Text>

            <View style={styles.form}>
              <TextInput
                placeholder="Your Name"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                placeholder="Enter your message"
                placeholderTextColor={COLORS.muted}
                style={[styles.input, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

              <Pressable style={[styles.primaryButton, submitting && { opacity: 0.7 }]} onPress={onSubmit} disabled={submitting}>
                <Text style={styles.primaryButtonText}>{submitting ? 'Sending...' : 'Submit'}</Text>
              </Pressable>
            </View>
          </View>

          <Footer onNavigate={(path) => router.push(path as any)} openUrl={(url) => {}} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  topSpacing: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  accentLine: { width: 85, height: 4, backgroundColor: COLORS.accent, marginTop: 6 },
  smallAccent: { width: 125, marginTop: 8 },
  centerLine: { alignSelf: 'center', width: 85 },
  sectionText: {
    color: COLORS.text,
    lineHeight: 20,
  },
  callText: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 16,
    gap: 10,
  },
  cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  form: { marginTop: 18, gap: 12 },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: COLORS.text,
  },
  textArea: { height: 140 },
  primaryButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: { color: '#0b0b0b', fontWeight: '800', fontSize: 16 },
  link: { color: COLORS.accent, fontWeight: '700' },
});
