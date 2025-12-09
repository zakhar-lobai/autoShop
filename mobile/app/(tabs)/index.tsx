import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, InteractionManager, Linking, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { CarCard } from '@/components/CarCard';
import { carData } from '@/constants/carData';
import type { Car } from '@/constants/carData';
import {
  AboutSection,
  COLORS,
  HeroSlider,
  HomeFooter,
  NewsletterSection,
  PartnersSection,
  Section,
  SectionTitle,
  ServicesSection,
  SpecialOffersSection,
  WhyCarousel,
} from '@/features/home/HomeSections';
import { getLocalCars } from '@/lib/carMapping';

const MemoizedCarCard = React.memo(CarCard);

export default function HomeScreen() {
  const [carsReady, setCarsReady] = useState(false);
  const [deferredContentReady, setDeferredContentReady] = useState(false);
  const router = useRouter();
  const openUrl = (url: string) => Linking.openURL(url).catch(() => {});

  const { width } = useWindowDimensions();
  const heroWidth = width;
  const heroHeight = useMemo(() => Math.round(heroWidth * 0.9), [heroWidth]);
  const contentWidth = useMemo(() => width - 32, [width]);

  const handleNavigate = (route?: string) => {
    if (!route) return;
    router.push(route as any);
  };

  useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      setCarsReady(true);
    });

    const timer = setTimeout(() => setDeferredContentReady(true), 320);

    return () => {
      interactionHandle.cancel();
      clearTimeout(timer);
    };
  }, []);

  const renderCarCard = useCallback<ListRenderItem<Car>>(
    ({ item }) => (
      <View style={styles.cardWrapper}>
        <MemoizedCarCard car={item} />
      </View>
    ),
    [],
  );

  const homeCars = useMemo(() => {
    const local = getLocalCars();
    const base = local && local.length > 0 ? local : carData.cars;
    const arr = [...base];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 7);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={carsReady ? homeCars : []}
        keyExtractor={(item) => item.id}
        renderItem={renderCarCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={4}
        initialNumToRender={2}
        updateCellsBatchingPeriod={32}
        ListHeaderComponent={
          <>
            <HeroSlider heroWidth={heroWidth} heroHeight={heroHeight} onNavigate={handleNavigate} />
            <WhyCarousel contentWidth={contentWidth} />
            <Section>
              <SectionTitle>Rent Now</SectionTitle>
            </Section>
          </>
        }
        ListFooterComponent={
          <>
            {!carsReady && (
              <Section>
                <Text style={styles.loadingText}>Loading cars...</Text>
              </Section>
            )}

            <Section>
              <Pressable style={[styles.primaryButton, styles.fleetButton]} onPress={() => handleNavigate('/our-fleet')}>
                <Text style={styles.primaryButtonText}>See all cars</Text>
              </Pressable>
            </Section>

            {deferredContentReady && (
              <>
                <ServicesSection onNavigate={handleNavigate} />
                <SpecialOffersSection onNavigate={handleNavigate} />
                <NewsletterSection />
                <PartnersSection />
                <AboutSection />
              </>
            )}

            <HomeFooter onNavigate={handleNavigate} openUrl={openUrl} />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 32,
    backgroundColor: COLORS.background,
  },
  cardWrapper: { paddingHorizontal: 16 },
  primaryButton: {
    marginTop: 16,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  fleetButton: { alignSelf: 'stretch', marginBottom: 16 },
  primaryButtonText: {
    color: '#0b0b0b',
    fontWeight: '800',
    fontSize: 15,
  },
  loadingText: {
    color: COLORS.muted,
  },
});
