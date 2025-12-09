import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { TopMenu } from '@/components/TopMenu';

const COLORS = {
  background: '#222',
  card: '#2c2c2c',
  stroke: '#323232',
  text: '#f9fafb',
  muted: '#9ca3af',
  accent: '#d8b074',
};

export default function ThanksScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    car?: string;
    origin?: string;
  }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopMenu />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.title}>Thank you!</Text>
          <Text style={styles.subtitle}>We&apos;ll contact you soon.</Text>
          {params.origin ? <Text style={styles.pill}>{params.origin}</Text> : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your request</Text>
          {params.car ? (
            <View style={styles.row}>
              <Text style={styles.label}>Car</Text>
              <Text style={styles.value}>{params.car}</Text>
            </View>
          ) : null}
          {params.pickupDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>Pick-up</Text>
              <Text style={styles.value}>
                {params.pickupDate}
                {params.pickupLocation ? ` (${params.pickupLocation})` : ''}
              </Text>
            </View>
          ) : null}
          {params.returnDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>Return</Text>
              <Text style={styles.value}>
                {params.returnDate}
                {params.returnLocation ? ` (${params.returnLocation})` : ''}
              </Text>
            </View>
          ) : null}
          {params.amount ? (
            <View style={styles.row}>
              <Text style={styles.label}>Estimated amount</Text>
              <Text style={styles.value}>{params.amount}</Text>
            </View>
          ) : null}
          {params.name ? (
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{params.name}</Text>
            </View>
          ) : null}
          {params.phone ? (
            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{params.phone}</Text>
            </View>
          ) : null}
          {params.email ? (
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{params.email}</Text>
            </View>
          ) : null}
          {params.message ? (
            <View style={styles.note}>
              <Text style={styles.label}>Message</Text>
              <Text style={styles.value}>{params.message}</Text>
            </View>
          ) : null}
        </View>

        <Pressable style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Back to home</Text>
        </Pressable>
      </ScrollView>
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
    paddingBottom: 32,
    paddingTop: 90,
    backgroundColor: COLORS.background,
    gap: 18,
  },
  hero: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 18,
    borderRadius: 10,
    gap: 6,
  },
  title: { color: COLORS.text, fontSize: 26, fontWeight: '800' },
  subtitle: { color: COLORS.muted, fontSize: 16 },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    color: '#111',
    fontWeight: '800',
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 16,
    borderRadius: 10,
    gap: 10,
  },
  cardTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.stroke,
    paddingVertical: 10,
  },
  label: { color: COLORS.muted, fontWeight: '700' },
  value: { color: COLORS.text, fontWeight: '800', flexShrink: 1, textAlign: 'right' },
  note: { gap: 6, paddingTop: 6 },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: '#111', fontWeight: '800', fontSize: 16 },
});
