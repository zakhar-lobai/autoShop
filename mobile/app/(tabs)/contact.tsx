import React, { useMemo } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Footer } from '@/components/Footer';
import pinIcon from '../../assets/images/contact/pin.webp';
import instagramIcon from '../../assets/images/contact/instagram.webp';
import facebookIcon from '../../assets/images/contact/facebook.webp';
import getKnowImage from '../../assets/images/contact/contact-img.webp';
import WebView from 'react-native-webview';

const COLORS = {
  background: '#222',
  text: '#f9fafb',
  muted: '#9ca3af',
  accent: '#d8b074',
  card: '#3e3e3e',
  stroke: '#2a2a2a',
};

const MAP_URL =
  'https://www.google.com/maps/place/BlackCars.pl+-+Wynajem+Aut+Klasy+Premium/@52.1726714,20.9932295,17z';

export default function ContactScreen() {
  const openUrl = (url: string) => Linking.openURL(url).catch(() => {});
  const router = useRouter();
  const WebViewComponent = useMemo(() => WebView || null, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Contact details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact details</Text>
          <View style={styles.accentLine} />

          <View style={styles.detailsColumn}>
            <InfoRow
              icon={pinIcon}
              text={<Text style={styles.detailText}><Text style={styles.bold}>Car collection:</Text> Bokserska 64/127, 02-690 Warszawa</Text>}
              onPress={() => openUrl(MAP_URL)}
            />
            <InfoRow
              text={<Text style={styles.detailText}>+48 720 889 788</Text>}
              onPress={() => openUrl('tel:+48720889788')}
            />
            <InfoRow
              text={<Text style={styles.detailText}>office@blackcars.pl</Text>}
              onPress={() => openUrl('mailto:office@blackcars.pl')}
            />
            <InfoRow
              text={
                <Text style={styles.detailText}>
                  To see the incorporation details of the owner of the blackcars.pl brand, click{' '}
                  <Text style={styles.link}>download incorporation details.</Text>
                </Text>
              }
            />

            <Text style={[styles.detailText, { marginTop: 6 }]}>
              Like us to receive the latest information and notices of special offers:
            </Text>
            <View style={styles.socialRow}>
              <Pressable onPress={() => openUrl('https://www.instagram.com/blackcars.pl/')}>
                <Image source={instagramIcon} style={styles.socialIcon} />
              </Pressable>
              <Pressable onPress={() => openUrl('https://www.facebook.com/blackcarspl/')}>
                <Image source={facebookIcon} style={styles.socialIcon} />
              </Pressable>
            </View>
          </View>

          <View style={styles.mapCard}>
            {WebViewComponent ? (
              <WebViewComponent
                source={{ uri: MAP_URL }}
                style={styles.mapWebview}
                androidLayerType="hardware"
              />
            ) : (
              <Pressable style={styles.mapPlaceholder} onPress={() => openUrl(MAP_URL)}>
                <Text style={styles.mapHint}>Open map</Text>
                <Text style={styles.mapSmall}>Bokserska 64/127, 02-690 Warszawa</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Get to know us */}
        <View style={[styles.section, { paddingBottom: 24 }]}>
          <Text style={styles.sectionTitle}>Get to know us</Text>
          <View style={styles.getRow}>
            <View style={styles.getTextBlock}>
              <Text style={styles.body}>
                Cars are a genuine passion for many people, and this passion does not fade with age - on the contrary, the more we use cars, the higher our expectations regarding the vehicle we drive.
              </Text>
              <Text style={styles.body}>
                If you are an enthusiast of luxury cars, we have great news for you. Our premium car rental service offers premium cars of top brands for both short-term and long-term rental.
              </Text>
              <Text style={styles.body}>
                Sounds good? Check out our offering of premium car rental for an unforgettable experience. Book now for an exclusive experience at an affordable price.
              </Text>
            </View>
            <Image source={getKnowImage} style={styles.getImage} resizeMode="cover" />
          </View>
        </View>
        <Footer onNavigate={(path) => router.push(path as any)} openUrl={openUrl} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, text, onPress }: { icon?: any; text: React.ReactNode; onPress?: () => void }) {
  const content = (
    <View style={styles.infoRow}>
      {icon ? (
        <Image source={icon} style={styles.infoIcon} />
      ) : (
        <View style={styles.bullet} />
      )}
      {typeof text === 'string' ? <Text style={styles.detailText}>{text}</Text> : text}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.infoRow, pressed && { opacity: 0.8 }]}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  accentLine: { width: 85, height: 4, backgroundColor: COLORS.accent },
  detailsColumn: {
    marginTop: 20,
    gap: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  infoIcon: { width: 28, height: 28, resizeMode: 'contain' },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.accent,
    marginTop: 6,
  },
  detailText: {
    color: COLORS.text,
    flex: 1,
    lineHeight: 20,
  },
  bold: { fontWeight: '700' },
  link: { color: COLORS.accent, fontWeight: '700' },
  socialRow: { flexDirection: 'row', gap: 16, marginTop: 8 },
  socialIcon: { width: 34, height: 34, resizeMode: 'contain' },
  mapCard: {
    marginTop: 18,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  mapPlaceholder: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: COLORS.card,
  },
  mapWebview: { width: '100%', height: 260 },
  mapHint: {
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: 6,
  },
  mapSmall: { color: COLORS.muted, textAlign: 'center' },
  getRow: { flexDirection: 'column-reverse', gap: 16 },
  getTextBlock: { gap: 12 },
  body: { color: COLORS.text, lineHeight: 20 },
  getImage: { width: '100%', height: 220, borderRadius: 10, borderWidth: 1, borderColor: COLORS.stroke },
});
