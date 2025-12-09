import React from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

import type { Car } from '@/constants/carData';

interface Props {
  car: Car;
}

export function CarCard({ car }: Props) {
  const router = useRouter();

  const handleOpenDetails = () => {
    if (!car.slug) return;
    router.push({ pathname: '/car/[slug]', params: { slug: car.slug } });
  };

  const handleOpenBooking = () => {
    if (!car.slug) return;
    router.push({
      pathname: '/booking/[slug]',
      params: {
        slug: car.slug,
        carName: car.name,
        basePrice: car.price,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.imageWrapper} onPress={handleOpenDetails}>
        {(() => {
          const galleryImage = (car as any).gallery?.[0];
          const src =
            car['mobileImage'] ||
            (galleryImage
              ? typeof galleryImage === 'string'
                ? { uri: galleryImage }
                : galleryImage
              : car.images
              ? { uri: car.images }
              : null);
          if (src) {
            return (
              <ExpoImage
                source={src as any}
                style={styles.image}
                contentFit="cover"
                transition={150}
                cachePolicy="memory-disk"
              />
            );
          }
          return (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>{car.name}</Text>
            </View>
          );
        })()}
      </Pressable>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{car.name}</Text>
        <View style={styles.accent} />
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{car.year}</Text>
          <Text style={styles.meta}>{car.transmission}</Text>
          <Text style={styles.meta}>{car.engine}</Text>
          <Text style={styles.meta}>{car.fuel}</Text>
        </View>
      </View>
      <View style={styles.actionsWrapper}>
        <Text style={styles.price}>{car.price}</Text>
        <Pressable style={styles.buttonOutline} onPress={handleOpenDetails}>
          <Text style={styles.buttonOutlineText}>Find out more</Text>
        </Pressable>
        <Pressable style={styles.buttonPrimary} onPress={handleOpenBooking}>
          <Text style={styles.buttonPrimaryText}>Book</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#3e3e3e',
    marginBottom: 24,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3e3e3e',
  },
  imageWrapper: {
    width: '100%',
    height: 210,
    backgroundColor: '#111',
  },
  image: { width: '100%', height: 210 },
  placeholderImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  placeholderText: {
    color: '#e5e7eb',
    fontWeight: '600',
    textAlign: 'center',
  },
  infoWrapper: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f9fafb',
    marginBottom: 8,
  },
  accent: {
    width: 90,
    height: 4,
    backgroundColor: '#d8b074',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  meta: {
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#d8b074',
    color: '#d1d5db',
    marginRight: 8,
  },
  actionsWrapper: {
    width: '100%',
    paddingHorizontal: 18,
    paddingBottom: 18,
    alignItems: 'center',
  },
  price: {
    color: '#d8b074',
    fontWeight: '800',
    fontSize: 19,
    marginBottom: 14,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  buttonOutlineText: {
    color: '#f9fafb',
    fontWeight: '600',
  },
  buttonPrimary: {
    backgroundColor: '#d8b074',
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonPrimaryText: {
    color: '#111827',
    fontWeight: '700',
  },
});
