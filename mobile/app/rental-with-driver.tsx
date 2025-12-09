import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Footer } from '@/components/Footer';
import { TopMenu } from '@/components/TopMenu';

const COLORS = {
  background: '#222',
  text: '#f9fafb',
  muted: '#9ca3af',
  accent: '#d8b074',
  card: '#3e3e3e',
  stroke: '#2a2a2a',
};

const heroSlides = [
  { key: 'limo', title: 'Premium car hire with driver', image: require('../assets/images/rent-with-driver/1.jpg') },
  { key: 'minivan', title: 'Premium minivan hire with a driver', image: require('../assets/images/rent-with-driver/2.jpg') },
  { key: 'airport', title: 'Airport transfers with pick-up service', image: require('../assets/images/rent-with-driver/3.jpg') },
  { key: 'corporate', title: 'Corporate Travel', image: require('../assets/images/rent-with-driver/4.jpg') },
  { key: 'wedding', title: 'Wedding car hire', image: require('../assets/images/rent-with-driver/5.jpg') },
];

const services = [
  { key: 'limousine', label: 'Limousine with driver', icon: require('../assets/images/rent-with-driver/services/limousine-with-driver.png') },
  { key: 'minivan', label: 'Premium minivan hire with a driver', icon: require('../assets/images/rent-with-driver/services/minivan.png') },
  { key: 'airport', label: 'Airport transfers with pick-up service', icon: require('../assets/images/rent-with-driver/services/airport-transfer.png') },
  { key: 'corporate', label: 'Corporate Travel', icon: require('../assets/images/rent-with-driver/services/corporate-travel.png') },
  { key: 'special', label: 'Special events support', icon: require('../assets/images/rent-with-driver/services/special-event.png') },
  { key: 'wedding', label: 'Wedding car hire', icon: require('../assets/images/rent-with-driver/services/wedding.png') },
];

const driverImage = require('../assets/images/rent-with-driver/our-driver.jpg');
const partnerLogos = [
  require('../assets/images/home/partners/samyoung.png'),
  require('../assets/images/home/partners/concierge.png'),
  require('../assets/images/home/partners/dinamo.png'),
  require('../assets/images/home/partners/intercontinental.png'),
  require('../assets/images/home/partners/kyivstar.png'),
  require('../assets/images/home/partners/marykay.png'),
  require('../assets/images/home/partners/ukrzaliz.png'),
  require('../assets/images/home/partners/sunevents.png'),
  require('../assets/images/home/partners/mata.png'),
  require('../assets/images/home/partners/vpiska.png'),
  require('../assets/images/home/partners/fozzy.png'),
  require('../assets/images/home/partners/novapost.png'),
  require('../assets/images/home/partners/soiitz.png'),
];

export default function RentalWithDriverScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [heroIndex, setHeroIndex] = useState(0);
  const heroRef = useRef<ScrollView | null>(null);
  const { width } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={{ flex: 1 }}>
        <TopMenu />
        <ScrollView
          contentContainerStyle={[styles.container, { paddingTop: insets.top + 60 }]}
          showsVerticalScrollIndicator={false}>
          {/* Hero slider */}
          <View style={styles.sliderWrapper}>
            <ScrollView
              horizontal
              pagingEnabled
              ref={heroRef}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                setHeroIndex(Math.round(x / width));
              }}>
              {heroSlides.map((slide) => (
                <ImageBackground
                  key={slide.key}
                  source={slide.image}
                  style={[styles.heroCard, { width, height: Math.round(width * 0.7) }]}
                  imageStyle={styles.heroImage}>
                  <View style={styles.heroOverlay} />
                  <View style={styles.heroInner}>
                    <Text style={styles.heroTitle}>{slide.title}</Text>
                    <Pressable style={styles.heroButton} onPress={() => {}}>
                      <Text style={styles.heroButtonText}>Check the offer</Text>
                    </Pressable>
                  </View>
                </ImageBackground>
              ))}
            </ScrollView>
            <View style={[styles.dotsRow, styles.heroDots]}>
              {heroSlides.map((slide, idx) => (
                <View
                  key={slide.key}
                  style={[styles.dot, heroIndex === idx ? styles.dotActive : styles.dotInactive]}
                />
              ))}
            </View>
          </View>

        {/* Our services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.accentLine} />
          <Text style={[styles.sectionText, { marginTop: 12, marginBottom: 18 }]}>
            In our offer you will find well-known and appreciated luxury brands and models of cars-limousines,
            comfortable SUVs and vans. For our clients, we offer premium class car hire with a top-class drivers,
            appreciated by users who love the combination of comfort and safety.
          </Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <View key={service.key} style={styles.serviceItem}>
                <Image source={service.icon} style={styles.serviceIcon} resizeMode="contain" />
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Our Drivers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Drivers</Text>
          <View style={styles.accentLine} />
          <View style={styles.driversRow}>
            <View style={styles.driversText}>
              <Text style={styles.sectionText}>
                Cars are a genuine passion for many people, and this passion does not fade with age - on the contrary,
                the more we use cars, the higher our expectations regarding the vehicle we drive. If you are an
                enthusiast of luxury cars, we have great news for you. Our premium car rental service offers premium
                cars of the top brands for both short-term and long-term rental.
              </Text>
              <Text style={[styles.sectionText, { marginTop: 12 }]}>
                Sounds good? Check out our offering of premium car rental for an unforgettable experience thanks to the
                cars available in our fleet. Don&apos;t hesitate! Book now for an exclusive experience at an affordable price.
              </Text>
            </View>
            <Image source={driverImage} style={styles.driverImage} resizeMode="cover" />
          </View>
        </View>

        {/* Partners slider */}
        <View style={[styles.section, styles.partnersSection]}>
          <Text style={[styles.sectionTitle, styles.partnersHeading]}>Our partners</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.partnersRow}>
            {partnerLogos.map((logo, idx) => (
              <View key={idx} style={styles.partnerItem}>
                <Image source={logo} style={styles.partnerLogo} resizeMode="contain" />
              </View>
            ))}
          </ScrollView>
        </View>

        <Footer
          onNavigate={(path) => router.push(path as any)}
          openUrl={async (url) => {
            try {
              await Linking.openURL(url);
            } catch {
              // ignore failures
            }
          }}
        />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingBottom: 24, backgroundColor: COLORS.background },
  sliderWrapper: { marginBottom: 32, position: 'relative' },
  heroCard: {
    width: '100%',
    height: 240,
    marginBottom: 12,
    borderRadius: 0,
    overflow: 'hidden',
    borderWidth: 0,
  },
  heroImage: { transform: [{ scale: 1.02 }] },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heroInner: { flex: 1, justifyContent: 'flex-end', padding: 20 },
  heroTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  heroButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 42,
    alignSelf: 'flex-start',
    borderRadius: 8,
    transform: [{ skewX: '-12deg' }],
    marginBottom: 20,
  },
  heroButtonText: { color: '#0b0b0b', fontWeight: '800', transform: [{ skewX: '12deg' }] },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  heroDots: { position: 'absolute', bottom: 24, left: 0, right: 0, marginTop: 0 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 5 },
  dotActive: { backgroundColor: COLORS.accent },
  dotInactive: { backgroundColor: '#4b5563' },
  section: { paddingHorizontal: 16, marginBottom: 28 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  accentLine: { width: 125, height: 4, backgroundColor: COLORS.accent, marginTop: 6, marginBottom: 10 },
  sectionText: { color: COLORS.muted, lineHeight: 20 },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  serviceItem: {
    width: '50%',
    paddingVertical: 16,
    alignItems: 'center',
  },
  serviceIcon: { width: 110, height: 110, marginBottom: 10 },
  serviceLabel: { color: COLORS.text, textAlign: 'center', fontWeight: '700' },
  driversRow: { flexDirection: 'column-reverse', gap: 14 },
  driversText: { gap: 12 },
  driverImage: { width: '100%', height: 240, borderRadius: 10, borderWidth: 1, borderColor: COLORS.stroke },
  partnersRow: { marginTop: 10 },
  partnerItem: {
    width: 160,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  partnerLogo: { width: '100%', height: 56 },
  partnersSection: {
    paddingBottom: 36,
  },
  partnersHeading: {
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
});
