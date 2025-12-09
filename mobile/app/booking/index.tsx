import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { carData } from '@/constants/carData';
import { getLocalCars } from '@/lib/carMapping';

export default function BookingIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const localCars = getLocalCars();
    const fallbackCars = carData.cars;
    const first = (localCars && localCars[0]) || (fallbackCars && fallbackCars[0]);
    const slug = first?.slug;

    if (slug) {
      router.replace({ pathname: '/booking/[slug]', params: { slug } });
    }
  }, [router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#1f1f1f', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#f5f5f5' }}>Redirecting to booking...</Text>
    </View>
  );
}

