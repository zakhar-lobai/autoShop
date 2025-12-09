import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';

import { CarCard } from '@/components/CarCard';
import { Footer } from '@/components/Footer';
import type { Car } from '@/constants/carData';
import { getLocalCars, mapFirestoreCar } from '@/lib/carMapping';
import { db } from '@/lib/firebase';

export default function OurFleetScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsCollection = collection(db, 'cars');
        const snapshot = await getDocs(carsCollection);
        const carsData: Car[] = snapshot.docs.map((doc) => mapFirestoreCar(doc));
        const fallback = getLocalCars();
        setCars(carsData.length > 0 ? carsData : fallback);
      } catch {
        setCars(getLocalCars());
        setError('Failed to load cars.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Our Fleet</Text>
        <Text style={styles.subheading}>Extensive fleet of premium cars. Best rental terms.</Text>
        {loading && <Text style={styles.statusText}>Loading cars...</Text>}
        {error && !loading && <Text style={styles.statusText}>{error}</Text>}
        {!loading && !error && (
          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <CarCard car={item} />}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={<Footer onNavigate={(path) => router.push(path as any)} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 8,
  },
  subheading: {
    color: '#9ca3af',
    marginBottom: 16,
  },
  statusText: {
    color: '#9ca3af',
  },
  listContent: {
    paddingBottom: 24,
  },
});
