import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CarBookingRedirect() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      router.replace({ pathname: '/booking/[slug]', params: { slug } });
    }
  }, [slug, router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#1f1f1f', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#f5f5f5' }}>Redirecting to booking...</Text>
    </View>
  );
}

