import React, { useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Footer } from '@/components/Footer';

export const COLORS = {
  background: '#222',
  card: '#3e3e3e',
  stroke: '#2a2a2a',
  text: '#f9fafb',
  muted: '#9ca3af',
  accent: '#d8b074',
};

const heroSlides = [
  {
    key: 'premium',
    title: 'Premium car rental',
    description: 'Extensive fleet of premium cars. Best rental terms.',
    cta: 'Rent now!',
    route: '/our-fleet',
    image: require('../../assets/images/home/slider/mob1.png'),
  },
  {
    key: 'limo',
    title: 'Limo & chauffeur rental',
    description: 'Call and order a luxury ride.',
    cta: 'Rent now!',
    route: '/our-fleet',
    image: require('../../assets/images/home/slider/mob2.png'),
  },
  {
    key: 'minibus',
    title: 'Premium minibus & chauffeur rental',
    description: 'Luxury Mercedes V minibus rental and trips.',
    cta: 'Rent now!',
    route: '/our-fleet',
    image: require('../../assets/images/home/slider/mob3.png'),
  },
  {
    key: 'sport',
    title: 'Sport car rental',
    description: 'Extensive fleet of premium cars. Best rental terms.',
    cta: 'Rent now!',
    route: '/our-fleet',
    image: require('../../assets/images/home/slider/mob4.png'),
  },
  {
    key: 'weekend',
    title: '2+1 on weekend',
    description: 'Rent a car on Friday until 6 pm, return it on Monday by noon and pay for two days!',
    cta: 'Rent now!',
    route: '/special-offer',
    image: require('../../assets/images/home/slider/mob5.png'),
  },
];

const whyWeItems = [
  { title: 'Extensive fleet', copy: 'Our car fleet keeps growing to provide our customers with a suitable vehicle.' },
  { title: 'Rental WITHOUT a deposit', copy: 'Pay online by credit card to rent a car without any deposit.' },
  { title: 'Car delivery', copy: 'We can sign the agreement remotely and deliver the car to you.' },
  { title: 'Transparent agreement', copy: 'Agreements are free from any legal loopholes or fine print.' },
  { title: 'Perfect cars', copy: 'We maintain our fleet, washing and disinfecting the cars after every rental.' },
  { title: 'Anywhere in Canada', copy: 'We deliver cars all over Canada.' },
];

const services = [
  { key: 'airport', title: 'Airport transfers', image: require('../../assets/images/home/services/airport-transfer.jpg'), route: '/rental-with-driver' },
  { key: 'minibus', title: 'Premium minibus & driver rental', image: require('../../assets/images/home/services/minibus.jpg'), route: '/rental-with-driver' },
  { key: 'limo', title: 'Limo & driver rental', image: require('../../assets/images/home/services/limo.jpg'), route: '/limo' },
  { key: 'wedding', title: 'Wedding car rental', image: require('../../assets/images/home/services/wedding-car.jpg'), route: '/contact' },
];

const specialTiles = [
  { key: 'fuel', title: 'Free fuel tank', copy: 'For rent a minimum of 3 months.' },
  { key: 'weekend', title: '2+1 for weekend', copy: '*details from consultants' },
];

const partnerLogos = [
  require('../../assets/images/home/partners/samyoung.png'),
  require('../../assets/images/home/partners/concierge.png'),
  require('../../assets/images/home/partners/dinamo.png'),
  require('../../assets/images/home/partners/intercontinental.png'),
  require('../../assets/images/home/partners/kyivstar.png'),
  require('../../assets/images/home/partners/marykay.png'),
  require('../../assets/images/home/partners/ukrzaliz.png'),
  require('../../assets/images/home/partners/sunevents.png'),
  require('../../assets/images/home/partners/mata.png'),
  require('../../assets/images/home/partners/vpiska.png'),
  require('../../assets/images/home/partners/fozzy.png'),
  require('../../assets/images/home/partners/novapost.png'),
  require('../../assets/images/home/partners/soiitz.png'),
];

const checkIcon = require('../../assets/images/home/icons/check.png');
const giftImage = require('../../assets/images/home/special/special-offer.png');
const newsletterImage = require('../../assets/images/home/newsletter/newsletter.png');

type NavigateFn = (route?: string) => void;

export function Section({ children }: { children: React.ReactNode }) {
  return <View style={styles.section}>{children}</View>;
}

export function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function HeroSlider({
  heroWidth,
  heroHeight,
  onNavigate,
}: {
  heroWidth: number;
  heroHeight: number;
  onNavigate: NavigateFn;
}) {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroRef = useRef<ScrollView | null>(null);

  return (
    <View style={styles.sliderWrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={heroRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setHeroIndex(Math.round(x / heroWidth));
        }}>
        {heroSlides.map((slide) => (
          <ImageBackground
            key={slide.key}
            source={slide.image}
            style={[styles.heroCard, { width: heroWidth, height: heroHeight }]}
            imageStyle={styles.heroImage}>
            <View style={styles.heroOverlay} />
            <View style={styles.heroInner}>
              <Text style={styles.heroBadge}>Premium car rental</Text>
              <Text style={styles.heroTitle}>{slide.title}</Text>
              <Text style={styles.heroSubtitle}>{slide.description}</Text>

              <Pressable style={styles.angledBtn} onPress={() => onNavigate(slide.route)}>
                <View style={styles.angledInner}>
                  <Text style={styles.angledText}>{slide.cta}</Text>
                </View>
              </Pressable>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={[styles.dotsRow, styles.heroDots]}>
        {heroSlides.map((slide, idx) => (
          <View key={slide.key} style={[styles.dot, heroIndex === idx ? styles.dotActive : styles.dotInactive]} />
        ))}
      </View>
    </View>
  );
}

export function WhyCarousel({ contentWidth }: { contentWidth: number }) {
  const [whyIndex, setWhyIndex] = useState(0);
  const whyRef = useRef<ScrollView | null>(null);

  return (
    <Section>
      <SectionTitle>Premium car rental service</SectionTitle>
      <View style={styles.whyWrapper}>
        <ScrollView
          ref={whyRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setWhyIndex(Math.round(x / contentWidth));
          }}>
          {whyWeItems.map((item) => (
            <View key={item.title} style={[styles.whyCard, { width: contentWidth }]}>
              <View style={styles.whyTitleRow}>
                <Image source={checkIcon} style={styles.checkIcon} />
                <Text style={styles.whyTitle}>{item.title}</Text>
              </View>
              <Text style={styles.sectionText}>{item.copy}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotsRow}>
          {whyWeItems.map((_, idx) => (
            <View key={idx} style={[styles.dot, whyIndex === idx ? styles.dotActive : styles.dotInactive]} />
          ))}
        </View>
      </View>
    </Section>
  );
}

export function ServicesSection({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <Section>
      <SectionTitle>Our Services</SectionTitle>
      <View style={styles.serviceStack}>
        {services.map((service) => (
          <Pressable key={service.key} style={styles.serviceCard} onPress={() => onNavigate(service.route)}>
            <Image source={service.image} style={styles.serviceImage} resizeMode="cover" />
            <View style={styles.serviceCopy}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <View style={styles.accentLine} />
            </View>
          </Pressable>
        ))}
      </View>
    </Section>
  );
}

export function SpecialOffersSection({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <Section>
      <SectionTitle>Special offers</SectionTitle>
      <View style={styles.specialGrid}>
        {specialTiles.map((tile) => (
          <View key={tile.key} style={styles.specialCard}>
            <Text style={styles.specialHeading}>{tile.title}</Text>
            <View style={styles.accentLine} />
            <Text style={styles.sectionText}>{tile.copy}</Text>
          </View>
        ))}
      </View>
      <View style={styles.giftCard}>
        <View style={styles.giftCopy}>
          <Text style={styles.giftTitle}>Gift cards for rental and services</Text>
          <View style={[styles.accentLine, styles.accentLineWide]} />
          <Text style={styles.sectionText}>
            The certificate is valid for 1 year. We also offer VIP transport services tailored to your needs.
          </Text>
          <Pressable style={styles.primaryButton} onPress={() => onNavigate('/contact')}>
            <Text style={styles.primaryButtonText}>Buy Now</Text>
          </Pressable>
        </View>
        <Image source={giftImage} style={styles.giftImage} resizeMode="contain" />
      </View>
    </Section>
  );
}

export function NewsletterSection() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  return (
    <Section>
      <View style={[styles.newsCard, styles.section]}>
        <Image source={newsletterImage} style={styles.newsImage} resizeMode="cover" />
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle}>Sign up for our newsletter for a 10% discount</Text>
          <View style={[styles.accentLine, styles.accentLineWide, styles.newsAccent]} />
          <View style={styles.newsForm}>
            <TextInput
              value={newsletterEmail}
              onChangeText={setNewsletterEmail}
              placeholder="john@acme.com"
              placeholderTextColor={COLORS.muted}
              style={styles.newsInput}
            />
            <Pressable style={styles.primaryButton} onPress={() => {}}>
              <Text style={styles.primaryButtonText}>Subscribe</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Section>
  );
}

export function PartnersSection() {
  return (
    <Section>
      <SectionTitle>Our partners</SectionTitle>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.partnersRow}>
        {partnerLogos.map((logo, idx) => (
          <View key={idx} style={styles.partnerItem}>
            <Image source={logo} style={styles.partnerLogo} resizeMode="contain" />
          </View>
        ))}
      </ScrollView>
    </Section>
  );
}

export function AboutSection() {
  return (
    <Section>
      <View style={styles.aboutBox}>
        <Text style={[styles.sectionTitle, styles.aboutTitle]}>Premium car rental in Victoria</Text>
        <Text style={styles.sectionText}>
          BlackCars car rental in Victoria offers premium cars. All vehicles from our fleet have rich equipment and unusual
          design, which makes traveling even more enjoyable. Premium car hire has never been so easy. At your disposal, we
          have such brands as: Mercedes, BMW, Audi or Porsche.
        </Text>
        <Text style={[styles.sectionText, { marginTop: 12 }]}>
          Our car rental company provides its customers with short-term, medium-term and long-term car rental. You can rent a
          car from us for a wedding or for another occasion. We offer bus rental and car rental with a driver. Just a few
          minutes to rent your dream car. Call and pick up the selected model or indicate the place where we will deliver the
          vehicle. We also provide airport transfers throughout the country.
        </Text>
        <Text style={[styles.sectionTitle, styles.aboutHeading, styles.aboutTitle]}>Premium car hire - We operate throughout the country</Text>
        <Text style={styles.sectionText}>
          BlackCars premium car rental offers its vehicles to both individuals and companies. If you are interested in car
          rental in Victoria, it is enough that you have completed 20 years and a minimum driving license of 1 year. Have you
          found a premium car that interests you in our offer? Do not hesitate a moment longer and contact us now.
        </Text>
        <Text style={[styles.sectionText, { marginTop: 12 }]}>
          Using our premium car rental you are guaranteed that you will always get exactly the model that interests you, and
          the car will always be efficient and well-groomed. It doesn't matter if you plan to rent cars for a single trip or
          for a longer period - our car rental service in Victoria will meet all your needs!
        </Text>
        <Text style={[styles.sectionTitle, styles.aboutHeading, styles.aboutTitle]}>Why is it necessary to use our rental service?</Text>
        <Text style={styles.sectionText}>
          Premium car hire in BlackCars is a pure pleasure, a luxurious car hire experience and a minimum of formality. For the
          convenience of our customers, we allow the issuance and return the car outside office hours (for an additional fee).
          Our cars are always well-groomed and prepared for even the longest journey. Take a look at our rental offer and find a
          premium car for yourself.
        </Text>
      </View>
    </Section>
  );
}

export function HomeFooter({
  onNavigate,
  openUrl,
}: {
  onNavigate: NavigateFn;
  openUrl: (url: string) => void;
}) {
  return <Footer onNavigate={onNavigate} openUrl={openUrl} />;
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  sliderWrapper: { marginBottom: 32, position: 'relative' },
  heroCard: {
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 0,
  },
  heroImage: { transform: [{ scale: 1.02 }] },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroInner: { padding: 24, justifyContent: 'flex-end', flex: 1 },
  heroBadge: {
    color: COLORS.accent,
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 14,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },
  heroSubtitle: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 20,
  },
  angledBtn: { marginTop: 20, marginBottom: 28 },
  angledInner: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 44,
    transform: [{ skewX: '-12deg' }],
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  angledText: {
    color: '#0b0b0b',
    fontWeight: '800',
    fontSize: 16,
    transform: [{ skewX: '12deg' }],
  },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  heroDots: { position: 'absolute', bottom: 24, left: 0, right: 0, marginTop: 0 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 5 },
  dotActive: { backgroundColor: COLORS.accent },
  dotInactive: { backgroundColor: '#4b5563' },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  sectionText: {
    color: COLORS.muted,
    lineHeight: 20,
  },
  whyWrapper: {
    marginTop: 6,
    position: 'relative',
  },
  whyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  whyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: { width: 20, height: 20, marginRight: 10 },
  whyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },
  serviceStack: { marginTop: 6, gap: 18 },
  serviceCard: {
    backgroundColor: COLORS.background,
    borderRadius: 0,
    overflow: 'hidden',
    borderWidth: 0,
  },
  serviceImage: { width: '100%', height: 210 },
  serviceCopy: { paddingHorizontal: 0, paddingVertical: 14 },
  serviceTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 8 },
  accentLine: { width: 100, height: 4, backgroundColor: COLORS.accent, marginBottom: 10 },
  accentLineWide: { width: 190 },
  specialGrid: { flexDirection: 'column', gap: 12, marginTop: 6, marginBottom: 12 },
  specialCard: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  specialHeading: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  giftCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    flexDirection: 'column',
    gap: 14,
  },
  giftCopy: { flex: 1 },
  giftTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0b0b0b',
    fontWeight: '800',
    fontSize: 15,
  },
  giftImage: { width: '100%', height: 180, alignSelf: 'center' },
  newsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 0,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  newsImage: { width: '100%', height: 210, alignSelf: 'stretch' },
  newsContent: { padding: 18 },
  newsTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 10 },
  newsAccent: { marginBottom: 12 },
  newsForm: { marginTop: 4, gap: 12 },
  newsInput: {
    backgroundColor: '#0f1117',
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: COLORS.text,
  },
  aboutHeading: { marginTop: 12, borderLeftWidth: 0, paddingLeft: 0 },
  aboutTitle: { borderLeftWidth: 0, paddingLeft: 0 },
  aboutBox: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    paddingLeft: 10,
    gap: 12,
  },
  partnersRow: { marginTop: 12 },
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
});

