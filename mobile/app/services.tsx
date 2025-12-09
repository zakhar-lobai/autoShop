import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Footer } from '@/components/Footer';
import { TopMenu } from '@/components/TopMenu';

const COLORS = {
  background: '#222',
  text: '#f9fafb',
  accent: '#d8b074',
  card: '#3e3e3e',
  stroke: '#2a2a2a',
};

const services = [
  {
    key: 'airport',
    title: 'Airport transfers',
    image: require('../assets/images/home/services/airport-transfer.jpg'),
    route: '/rental-with-driver',
  },
  {
    key: 'minibus',
    title: 'Premium minibus & driver rental',
    image: require('../assets/images/home/services/minibus.jpg'),
    route: '/rental-with-driver',
  },
  {
    key: 'limo',
    title: 'Limo & driver rental',
    image: require('../assets/images/home/services/limo.jpg'),
    route: '/rental-with-driver',
  },
  {
    key: 'wedding',
    title: 'Wedding car rental',
    image: require('../assets/images/home/services/wedding-car.jpg'),
    route: '/rental-with-driver',
  },
];

export default function ServicesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNavigate = (path: string) => {
    if (path) router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={{ flex: 1 }}>
        <TopMenu />
        <ScrollView
          contentContainerStyle={[styles.container, { paddingTop: insets.top + 60 }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our services</Text>
            <View style={styles.accentLine} />
            <Text style={styles.sectionText}>
              In addition to driving premium cars on a day-to-day basis, we also offer VIP transport services.
              Our aim is to make sure that a ride in top-segment cars is associated both with luxury and comfort.
              We will gladly adapt our offer to your needs.
            </Text>
          </View>

          <View style={styles.cards}>
            {services.map((item, idx) => (
              <Pressable
                key={item.key}
                style={[styles.card, idx % 2 === 1 ? styles.cardAlt : null]}
                onPress={() => handleNavigate(item.route)}>
                <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardCopy}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.accentLine} />
                </View>
              </Pressable>
            ))}
          </View>

          <Footer onNavigate={handleNavigate} openUrl={(url) => {}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingHorizontal: 16, paddingBottom: 24, backgroundColor: COLORS.background },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    marginBottom: 8,
  },
  accentLine: { width: 125, height: 4, backgroundColor: COLORS.accent, marginTop: 4, marginBottom: 8 },
  sectionText: { color: COLORS.text, lineHeight: 20 },
  cards: { gap: 16 },
  card: { backgroundColor: COLORS.background },
  cardAlt: {},
  cardImage: { width: '100%', height: 220 },
  cardCopy: { paddingVertical: 12 },
  cardTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 8 },
});
