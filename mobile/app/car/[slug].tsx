import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { Image as ExpoImage } from 'expo-image';

import type { Car } from '@/constants/carData';
import { mapFirestoreCar, getStaticCarBySlug, type CarFromFirestore } from '@/lib/carMapping';
import { db } from '@/lib/firebase';
import CloseSvg from '@/assets/images/close-icon.svg';
import { TopMenu } from '@/components/TopMenu';
import { Footer } from '@/components/Footer';

const COLORS = {
  background: '#222',
  card: '#2c2c2c',
  stroke: '#323232',
  text: '#f5f5f5',
  muted: '#c7c7c7',
  accent: '#d8b074',
  tableBg: '#2a2a2a',
};

export default function CarDetailsScreen() {
  const { slug: slugParam } = useLocalSearchParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const headerOffset = insets.top + 60; // align with TopMenu height

  const [car, setCar] = useState<CarFromFirestore | Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const [fullScreenSource, setFullScreenSource] = useState<any>(null);
  const mainScrollRef = useRef<ScrollView>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [readMoreOffsetY, setReadMoreOffsetY] = useState<number | null>(null);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [returnTime, setReturnTime] = useState<Date | null>(null);
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showReturnTimePicker, setShowReturnTimePicker] = useState(false);
  const pickUpLocations = [
    { label: 'Office - Bokserska 64', cost: 0 },
    { label: 'Chopin Airport', cost: 99 },
    { label: 'Modlin Airport', cost: 199 },
  ];
  const OUT_OF_HOURS_FEE = 89;
  const WORKING_HOURS = { start: 9, end: 19 };
  const [pickupLocation, setPickupLocation] = useState<string>('Office - Bokserska 64');
  const [returnLocation, setReturnLocation] = useState<string>('Office - Bokserska 64');
  const [locationPickerTarget, setLocationPickerTarget] = useState<'pickup' | 'return' | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      if (!slug) {
        setCar(null);
        setLoading(false);
        return;
      }

      // optimistic local data first so UI has something instantly
      const local = getStaticCarBySlug(slug);
      if (local) {
        const localGallery =
          (local as any).gallery?.length
            ? (local as any).gallery
            : local.mobileImage
            ? [local.mobileImage]
            : local.images
            ? [local.images]
            : [];
        setCar({ ...local, gallery: localGallery });
      }

      try {
        const carsCollection = collection(db, 'cars');
        const q = query(carsCollection, where('pageUrl', '==', `/${slug}`), limit(1));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setCar(mapFirestoreCar(snapshot.docs[0]));
        } else if (!local) {
          const fallback = getStaticCarBySlug(slug);
          if (fallback) {
            const localGallery =
              (fallback as any).gallery?.length
                ? (fallback as any).gallery
                : fallback.mobileImage
                ? [fallback.mobileImage]
                : fallback.images
                ? [fallback.images]
                : [];
            setCar({ ...fallback, gallery: localGallery });
          } else {
            setCar(null);
          }
        }
      } catch {
        if (!local) {
          const fallback = getStaticCarBySlug(slug);
          if (fallback) {
            const localGallery =
              (fallback as any).gallery?.length
                ? (fallback as any).gallery
                : fallback.mobileImage
                ? [fallback.mobileImage]
                : fallback.images
                ? [fallback.images]
                : [];
            setCar({ ...fallback, gallery: localGallery });
          } else {
            setCar(null);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
    setReadMoreOffsetY(null);
  }, [slug]);

  useEffect(() => {
    // seed default dates similar to web (today 12:00 and +1 day 12:00)
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(12);
    const ret = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    setPickupDate(now);
    setPickupTime(now);
    setReturnDate(ret);
    setReturnTime(ret);
  }, []);

  const parsePriceNumber = useCallback((value?: string | null) => {
    if (!value) return null;
    const cleaned = String(value).replace(/[^\d.,-]/g, '').replace(/\s+/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : null;
  }, []);

  const parseKmNumber = useCallback((value?: string | null) => {
    if (!value) return null;
    const cleaned = String(value).replace(/[^\d.]/g, '').replace(/\s+/g, '');
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  }, []);

  const combineDateTime = useCallback((dateVal: Date | null, timeVal: Date | null) => {
    if (!dateVal) return null;
    const base = new Date(dateVal);
    if (timeVal) base.setHours(timeVal.getHours(), timeVal.getMinutes(), 0, 0);
    return base;
  }, []);

  const formatDate = useCallback(
    (value: Date | null) =>
      value ? value.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select date',
    [],
  );

  const formatTime = useCallback(
    (value: Date | null) =>
      value
        ? value.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
        : 'Select time',
    [],
  );

  const rentalDays = useMemo(() => {
    const start = combineDateTime(pickupDate, pickupTime);
    const end = combineDateTime(returnDate, returnTime);
    if (!start || !end) return null;
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : null;
  }, [pickupDate, returnDate, pickupTime, returnTime, combineDateTime]);

  const gallerySources = useMemo(() => {
    if (!car) return [] as (string | any)[];
    const details = car as any;
    const candidate = details.gallery as (string | any)[] | undefined;
    if (candidate && candidate.length > 0) return candidate;
    if (car.mobileImage) return [car.mobileImage];
    if (car.images) return [car.images];
    return [];
  }, [car]);

  const selectPerDay = useCallback(
    (days: number | null, details: any) => {
      if (!days || days <= 0) return { num: null as number | null, display: null as string | null };
      const tiers = [
        { min: 1, max: 3, key: '1-3days', fallback: 'oneThreeDays' },
        { min: 4, max: 6, key: '4-6days', fallback: 'fourSixDays' },
        { min: 7, max: 13, key: '7-13days', fallback: 'sevenThirteenDays' },
        { min: 14, max: 29, key: '14-29days', fallback: 'fourteenTwentyNineDays' },
      ];
      for (const tier of tiers) {
        if (days >= tier.min && days <= tier.max) {
          const raw = details[tier.key] ?? details[tier.fallback];
          return { num: parsePriceNumber(raw), display: raw ?? null };
        }
      }
      return { num: null, display: null };
    },
    [parsePriceNumber],
  );

  const priceSelection = useMemo(() => {
    if (!car || !rentalDays || rentalDays <= 0)
      return { numeric: null as number | null, display: null as string | null };
    const details = car as any;
    // if >=30, show monthly per-day hint if month exists
    if (rentalDays >= 30) {
      const rawMonth = details.Month ?? details.monthPrice;
      const monthNumeric = parsePriceNumber(rawMonth);
      if (monthNumeric !== null) {
        const perDay = Math.round(monthNumeric / 30);
        return { numeric: perDay, display: `${perDay} PLN/day (monthly)` };
      }
    }
    const sel = selectPerDay(rentalDays, details);
    if (sel.num !== null) return { numeric: sel.num, display: sel.display };
    return { numeric: parsePriceNumber(details.price), display: details.price ?? null };
  }, [car, rentalDays, parsePriceNumber, selectPerDay]);

  const mileageLimitTotal = useMemo(() => {
    if (!car) return null;
    const details = car as any;
    const daily = details.dailyLimit ?? details['Daily-limit'];
    const weekly = details.weeklyLimit ?? details['Weekly-limit'];
    const twoWeeks = details.twoWeeksLimit ?? details['two-weeks-limit'];
    const monthly = details.monthlyLimit ?? details['Monthly-limit'];
    const annual = details.annualLimit ?? details['Annually-limit'] ?? details['Annualy-limit'];

    const dailyNum = parseKmNumber(daily);
    const weeklyNum = parseKmNumber(weekly);
    const twoWeeksNum = parseKmNumber(twoWeeks);
    const monthlyNum = parseKmNumber(monthly);
    const annualNum = parseKmNumber(annual);

    if (!rentalDays) return daily ?? weekly ?? twoWeeks ?? monthly ?? annual ?? null;

    const formatKm = (num: number | null, fallbackStr?: string | null) => {
      if (num === null) return fallbackStr ?? null;
      return `${num} km`;
    };

    if (rentalDays <= 1) return formatKm(dailyNum, daily) ?? weekly ?? twoWeeks ?? monthly ?? annual ?? null;
    if (rentalDays <= 7) return formatKm(weeklyNum, weekly) ?? daily ?? twoWeeks ?? monthly ?? annual ?? null;
    if (rentalDays <= 14) return formatKm(twoWeeksNum, twoWeeks) ?? weekly ?? daily ?? monthly ?? annual ?? null;
    if (rentalDays <= 30) return formatKm(monthlyNum, monthly) ?? twoWeeks ?? weekly ?? daily ?? annual ?? null;

    // over a month: if monthly limit numeric, scale by months; else prorate annual
    if (monthlyNum !== null) {
      const months = Math.ceil(rentalDays / 30);
      return `${monthlyNum * months} km`;
    }
    if (annualNum !== null) {
      const prorated = Math.ceil((annualNum * rentalDays) / 365);
      return `${prorated} km`;
    }
    return monthly ?? annual ?? twoWeeks ?? weekly ?? daily ?? null;
  }, [car, rentalDays, parseKmNumber]);

  const isOutOfHours = useCallback(
    (dateVal: Date | null, timeVal: Date | null) => {
      const dt = combineDateTime(dateVal, timeVal);
      if (!dt) return false;
      const hour = dt.getHours();
      return hour < WORKING_HOURS.start || hour >= WORKING_HOURS.end;
    },
    [combineDateTime, WORKING_HOURS.start, WORKING_HOURS.end],
  );

  const pickupCostBase = pickUpLocations.find((l) => l.label === pickupLocation)?.cost ?? 0;
  const returnCostBase = pickUpLocations.find((l) => l.label === returnLocation)?.cost ?? 0;
  const pickupOutHours = isOutOfHours(pickupDate, pickupTime) ? OUT_OF_HOURS_FEE : 0;
  const returnOutHours = isOutOfHours(returnDate, returnTime) ? OUT_OF_HOURS_FEE : 0;
  const pickupCost = pickupCostBase + pickupOutHours;
  const returnCost = returnCostBase + returnOutHours;

  const amountDue = useMemo(() => {
    if (!car || !rentalDays || rentalDays <= 0) return null;
    const details = car as any;
    const monthRaw = details.Month ?? details.monthPrice;
    const monthNum = parsePriceNumber(monthRaw);

    if (monthNum !== null && rentalDays >= 30) {
      const months = Math.floor(rentalDays / 30);
      const remainder = rentalDays - months * 30;
      const remainderSel = selectPerDay(remainder, details);
      const remainderRate = remainder > 0 ? remainderSel.num ?? monthNum / 30 : 0;
      const total =
        months * monthNum +
        (remainder > 0 && remainderRate ? remainder * remainderRate : 0) +
        pickupCost +
        returnCost;
      return Number.isFinite(total) ? total : null;
    }

    const rate = selectPerDay(rentalDays, details).num ?? parsePriceNumber(details.price);
    if (!rate) return null;
    return rentalDays * rate + pickupCost + returnCost;
  }, [car, rentalDays, parsePriceNumber, selectPerDay, pickupCost, returnCost]);
  const handleSubmitBooking = async () => {
    if (submitting) return;
    if (!pickupDate || !returnDate) {
      Alert.alert('Missing dates', 'Please choose pick-up and return dates.');
      return;
    }

    setSubmitting(true);

    // Navigate to booking page with prefilled data
    router.push({
      pathname: '/booking/[slug]',
      params: {
        slug: car.slug,
        pickupDate: combineDateTime(pickupDate, pickupTime)?.toISOString() ?? '',
        returnDate: combineDateTime(returnDate, returnTime)?.toISOString() ?? '',
        pickupLocation,
        returnLocation,
      },
    });

    setSubmitting(false);
  };
  const handleSelectLocation = (label: string) => {
    if (locationPickerTarget === 'pickup') {
      setPickupLocation(label);
    } else if (locationPickerTarget === 'return') {
      setReturnLocation(label);
    }
    setLocationPickerTarget(null);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Loading car...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!car) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Car not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const priceRows = [
    { label: '1-3 days', value: (car as any)['1-3days'] ?? (car as any).oneThreeDays },
    { label: '4-6 days', value: (car as any)['4-6days'] ?? (car as any).fourSixDays },
    { label: '7-13 days', value: (car as any)['7-13days'] ?? (car as any).sevenThirteenDays },
    { label: '14-29 days', value: (car as any)['14-29days'] ?? (car as any).fourteenTwentyNineDays },
    { label: '1 month', value: (car as any).Month ?? (car as any).monthPrice },
  ].filter((row) => row.value);

  const renderGalleryImage = (img: any, idx: number) => {
    const source = typeof img === 'string' ? { uri: img } : img;
    const key = typeof img === 'string' ? img : JSON.stringify(img);
    return (
      <Pressable
        key={key}
        onPress={() => {
          setActiveImageIndex(idx);
          setFullScreenSource(source);
          setFullScreenVisible(true);
        }}
        style={{ width }}>
        <ExpoImage
          source={source}
          style={[styles.galleryImage, { width }]}
          contentFit="cover"
          transition={150}
          cachePolicy="memory-disk"
        />
      </Pressable>
    );
  };

  const handleSelectImage = (idx: number) => {
    setActiveImageIndex(idx);
    requestAnimationFrame(() => {
      mainScrollRef.current?.scrollTo({ x: idx * width, animated: true });
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopMenu />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={[styles.container, { paddingTop: headerOffset }]}>
        {/* Title + Gallery */}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{car.name}</Text>
          <View style={styles.heroAccent} />
        </View>
        <View style={styles.titleSpacer} />

        {gallerySources.length > 0 && (
          <>
            <ScrollView
              ref={mainScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const idx = Math.round(e.nativeEvent.contentOffset.x / width);
                setActiveImageIndex(idx);
              }}>
              {gallerySources.map((img, idx) => renderGalleryImage(img, idx))}
            </ScrollView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.thumbRow}
              contentContainerStyle={styles.thumbContent}>
              {gallerySources.map((img, idx) => {
                const source = typeof img === 'string' ? { uri: img } : img;
                return (
                  <Pressable key={idx} onPress={() => handleSelectImage(idx)} style={styles.thumb}>
                    <ExpoImage
                      source={source}
                      style={[styles.thumbImage, activeImageIndex === idx && styles.thumbActive]}
                      contentFit="cover"
                      transition={100}
                      cachePolicy="memory-disk"
                    />
                  </Pressable>
                );
              })}
            </ScrollView>
          </>
        )}

        {/* Meta + features chips */}
        <View style={styles.chipsCard}>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{car.year}</Text>
            <Text style={styles.meta}>{car.transmission}</Text>
            <Text style={styles.meta}>{car.engine}</Text>
            <Text style={styles.meta}>{car.fuel}</Text>
          </View>
          {car.features && car.features.length > 0 && (
            <View style={styles.featuresWrap}>
              {car.features.map((feat) => (
                <Text key={feat} style={styles.meta}>
                  {feat}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Description (web-like placement) */}
        {car.description && (
          <View style={styles.block}>
            <Text style={[styles.bodyText, { marginTop: 0 }]}>{car.description}</Text>
            {car.descriptionMore ? <Text style={[styles.bodyText, { marginTop: 12 }]}>{car.descriptionMore}</Text> : null}
            <Pressable
              style={styles.readMoreBtn}
              onPress={() => {
                if (readMoreOffsetY != null) {
                  scrollRef.current?.scrollTo({ y: readMoreOffsetY, animated: true });
                }
              }}>
              <Text style={styles.readMoreText}>Read more</Text>
            </Pressable>
          </View>
        )}

        {/* Promo block */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <View style={styles.blockAccentVertical} />
            <Text style={styles.blockTitle}>Special Offer</Text>
          </View>
          <Text style={styles.bodyText}>
            Book now and get priority delivery plus concierge support. Ask our team for current promo details.
          </Text>
        </View>

        {/* Gross prices */}
        {priceRows.length > 0 && (
          <View style={styles.block}>
            <View style={styles.blockHeader}>
              <View style={styles.blockAccentVertical} />
              <Text style={styles.blockTitle}>Gross Prices</Text>
            </View>
            <View style={styles.grossTable}>
              {priceRows.map((row, idx) => (
                <View key={row.label} style={[styles.grossRow, idx === priceRows.length - 1 && styles.grossRowLast]}>
                  <View style={styles.grossCellLeft}>
                    <Text style={styles.grossLabel}>{row.label.toUpperCase()}</Text>
                  </View>
                  <View style={styles.grossDivider} />
                  <View style={styles.grossCellRight}>
                    <Text style={styles.grossValue}>{row.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Deposit summary */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <View style={styles.blockAccentVertical} />
            <Text style={styles.blockTitle}>Gross Refundable Deposit</Text>
          </View>
          <View style={styles.grossTable}>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>PAYMENT AT THE OFFICE</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).deposit ?? (car as any).Deposit ?? '-'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Insurance */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <View style={styles.blockAccentVertical} />
            <Text style={styles.blockTitle}>Insurance</Text>
          </View>
          <View style={styles.grossTable}>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>LIABILITY INSURANCE, COMPREHENSIVE INSURANCE, ACCIDENT INSURANCE</Text>
              </View>
            </View>
            <View style={styles.grossRowLast}>
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>Include in the price</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <View style={styles.blockAccentVertical} />
            <Text style={styles.blockTitle}>Requirements</Text>
          </View>
          <View style={styles.grossTable}>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>MINIMUM DRIVER&apos;S AGE</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).age ?? (car as any).Age ?? '-'}</Text>
              </View>
            </View>
            <View style={styles.grossRowLast}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>HAVING A DRIVER&apos;S LICENSE</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).license ?? (car as any).License ?? '-'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <View style={styles.blockAccentVertical} />
            <Text style={styles.blockTitle}>24/7 Service</Text>
          </View>
          <View style={styles.grossTable}>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>MAINTENANCE, INSPECTIONS, TYRES</Text>
              </View>
            </View>
            <View style={styles.grossRowLast}>
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>Included in the price</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Mileage */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <View style={styles.blockAccentVertical} />
            <Text style={styles.blockTitle}>Mileage Limit</Text>
          </View>
          <View style={styles.grossTable}>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>DAILY</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).dailyLimit ?? (car as any)['Daily-limit'] ?? '-'}</Text>
              </View>
            </View>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>WEEKLY</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).weeklyLimit ?? (car as any)['Weekly-limit'] ?? '-'}</Text>
              </View>
            </View>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>TWO WEEKS</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).twoWeeksLimit ?? (car as any)['two-weeks-limit'] ?? '-'}</Text>
              </View>
            </View>
            <View style={styles.grossRow}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>MONTHLY</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).monthlyLimit ?? (car as any)['Monthly-limit'] ?? '-'}</Text>
              </View>
            </View>
            <View style={styles.grossRowLast}>
              <View style={styles.grossCellLeft}>
                <Text style={styles.grossLabel}>ANNUALLY</Text>
              </View>
              <View style={styles.grossDivider} />
              <View style={styles.grossCellRight}>
                <Text style={styles.grossValue}>{(car as any).annualLimit ?? (car as any)['Annually-limit'] ?? (car as any)['Annualy-limit'] ?? '-'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Booking form */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <View style={styles.blockAccentVertical} />
          <Text style={styles.blockTitle}>Booking</Text>
        </View>
        <Text style={styles.bookingCarName}>{car.name}</Text>
        <View style={styles.heroAccent} />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Pick-up</Text>
            <View style={styles.dateRow}>
              <Pressable
              style={[styles.input, styles.pressable, styles.dateHalf, pickupDate && styles.inputSelected]}
              onPress={() => setShowPickupDatePicker(true)}>
              <Text style={styles.inputLabel}>Date</Text>
              <Text style={styles.inputText}>{formatDate(pickupDate)}</Text>
            </Pressable>
            <Pressable
              style={[styles.input, styles.pressable, styles.dateHalf, pickupTime && styles.inputSelected]}
              onPress={() => setShowPickupTimePicker(true)}>
              <Text style={styles.inputLabel}>Time</Text>
              <Text style={styles.inputText}>{formatTime(pickupTime)}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Return</Text>
          <View style={styles.dateRow}>
            <Pressable
              style={[styles.input, styles.pressable, styles.dateHalf, returnDate && styles.inputSelected]}
              onPress={() => setShowReturnDatePicker(true)}>
              <Text style={styles.inputLabel}>Date</Text>
              <Text style={styles.inputText}>{formatDate(returnDate)}</Text>
            </Pressable>
            <Pressable
              style={[styles.input, styles.pressable, styles.dateHalf, returnTime && styles.inputSelected]}
              onPress={() => setShowReturnTimePicker(true)}>
              <Text style={styles.inputLabel}>Time</Text>
              <Text style={styles.inputText}>{formatTime(returnTime)}</Text>
            </Pressable>
          </View>
          {(pickupDate || pickupTime || returnDate || returnTime) && (
            <View style={styles.dateSummaryBox}>
              {pickupDate || pickupTime ? (
                <Text style={styles.dateSummaryText}>
                  Pick-up: {formatDate(pickupDate)} {formatTime(pickupTime)}
                </Text>
              ) : null}
              {returnDate || returnTime ? (
                <Text style={styles.dateSummaryText}>
                  Return: {formatDate(returnDate)} {formatTime(returnTime)}
                </Text>
              ) : null}
            </View>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Pick-up Location</Text>
          <Pressable
            style={styles.selectInput}
            onPress={() => setLocationPickerTarget('pickup')}>
            <Text style={styles.selectInputText}>{pickupLocation}</Text>
            <Text style={styles.selectInputHint}>Tap to choose location</Text>
          </Pressable>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Return Location</Text>
          <Pressable
            style={styles.selectInput}
            onPress={() => setLocationPickerTarget('return')}>
            <Text style={styles.selectInputText}>{returnLocation}</Text>
            <Text style={styles.selectInputHint}>Tap to choose location</Text>
          </Pressable>
        </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Days</Text>
              <Text style={styles.tableValue}>{rentalDays ?? '-'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Price per day</Text>
              <Text style={styles.tableValue}>
                {priceSelection.display ?? car.price ?? '-'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Refundable deposit</Text>
              <Text style={styles.tableValue}>{(car as any).deposit ?? (car as any).Deposit ?? '-'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Total mileage limit</Text>
              <Text style={styles.tableValue}>{mileageLimitTotal ?? (car as any).dailyLimit ?? '-'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Pick-up location</Text>
              <Text style={styles.tableValue}>
                {pickupLocation} ({pickupCostBase} PLN{pickupOutHours ? ` + ${pickupOutHours} PLN` : ''})
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Return location</Text>
              <Text style={styles.tableValue}>
                {returnLocation} ({returnCostBase} PLN{returnOutHours ? ` + ${returnOutHours} PLN` : ''})
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Car pick-up outside of office hours</Text>
              <Text style={styles.tableValue}>{pickupOutHours ? `${pickupOutHours} PLN` : '0 PLN'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Car return outside of office hours</Text>
              <Text style={styles.tableValue}>{returnOutHours ? `${returnOutHours} PLN` : '0 PLN'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>AMOUNT DUE</Text>
              <Text style={styles.tableValue}>{amountDue ? `${amountDue} PLN` : '-'}</Text>
            </View>
          </View>

          <Pressable
            style={[styles.primaryButton, submitting && styles.buttonDisabled]}
            onPress={handleSubmitBooking}
            disabled={submitting}>
            <Text style={styles.primaryButtonText}>{submitting ? 'Sending...' : 'Send booking request'}</Text>
          </Pressable>
        </View>

        {/* Long description */}
        {(car.readMore1 || car.readMore2) && (
          <View
            style={styles.block}
            onLayout={(e) => setReadMoreOffsetY(e.nativeEvent.layout.y)}>
            <Text style={styles.blockTitle}>{car.name}</Text>
            {car.readMore1 ? <Text style={[styles.bodyText, { marginTop: 12 }]}>{car.readMore1}</Text> : null}
            {car.readMore2 ? <Text style={[styles.bodyText, { marginTop: 12 }]}>{car.readMore2}</Text> : null}
          </View>
        )}

        <View style={styles.footerSpace} />
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

      {showPickupDatePicker && (
        <View style={styles.pickerSheet}>
          <DateTimePicker
            mode="date"
            display="spinner"
            themeVariant="dark"
            value={pickupDate ?? new Date()}
            onChange={(event: DateTimePickerEvent, date?: Date) => {
              if (event.type === 'set' && date) setPickupDate(date);
            }}
          />
          <Pressable style={styles.doneButton} onPress={() => setShowPickupDatePicker(false)}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      )}
      {showPickupTimePicker && (
        <View style={styles.pickerSheet}>
          <DateTimePicker
            mode="time"
            display="spinner"
            themeVariant="dark"
            value={pickupTime ?? new Date()}
            minuteInterval={5}
            onChange={(event: DateTimePickerEvent, date?: Date) => {
              if (event.type === 'set' && date) setPickupTime(date);
            }}
          />
          <Pressable style={styles.doneButton} onPress={() => setShowPickupTimePicker(false)}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      )}
      {showReturnDatePicker && (
        <View style={styles.pickerSheet}>
          <DateTimePicker
            mode="date"
            display="spinner"
            themeVariant="dark"
            value={returnDate ?? new Date()}
            onChange={(event: DateTimePickerEvent, date?: Date) => {
              if (event.type === 'set' && date) setReturnDate(date);
            }}
          />
          <Pressable style={styles.doneButton} onPress={() => setShowReturnDatePicker(false)}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      )}
      {showReturnTimePicker && (
        <View style={styles.pickerSheet}>
          <DateTimePicker
            mode="time"
            display="spinner"
            themeVariant="dark"
            value={returnTime ?? new Date()}
            minuteInterval={5}
            onChange={(event: DateTimePickerEvent, date?: Date) => {
              if (event.type === 'set' && date) setReturnTime(date);
            }}
          />
          <Pressable style={styles.doneButton} onPress={() => setShowReturnTimePicker(false)}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      )}

      {/* Location picker modal */}
      <Modal
        visible={!!locationPickerTarget}
        transparent
        animationType="fade"
        onRequestClose={() => setLocationPickerTarget(null)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalInner} onPress={() => setLocationPickerTarget(null)}>
            <View style={styles.sheet}>
              <Text style={styles.sheetTitle}>Choose location</Text>
              {pickUpLocations.map((loc) => (
                <Pressable
                  key={loc.label}
                  style={[
                    styles.sheetRow,
                    (locationPickerTarget === 'pickup' ? pickupLocation : returnLocation) === loc.label &&
                      styles.sheetRowActive,
                  ]}
                  onPress={() => handleSelectLocation(loc.label)}>
                  <Text style={styles.sheetRowText}>{loc.label}</Text>
                  <Text style={styles.sheetRowSub}>{`${loc.cost} PLN`}</Text>
                </Pressable>
              ))}
              <Pressable style={styles.sheetCancel} onPress={() => setLocationPickerTarget(null)}>
                <Text style={styles.sheetCancelText}>Cancel</Text>
              </Pressable>
            </View>
          </Pressable>
        </View>
      </Modal>

      {/* iOS date-time picker */}
      <Modal
        visible={fullScreenVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFullScreenVisible(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalInner} onPress={() => setFullScreenVisible(false)}>
            <Pressable style={styles.modalCloseIcon} onPress={() => setFullScreenVisible(false)}>
              <CloseSvg width={22} height={22} fill={COLORS.accent} color={COLORS.accent} />
            </Pressable>
            {gallerySources.length > 0 ? (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ width, height: '100%' }}
                contentContainerStyle={{ alignItems: 'center' }}
                contentOffset={{ x: activeImageIndex * width, y: 0 }}
                onMomentumScrollEnd={(e) => {
                  const idx = Math.round(e.nativeEvent.contentOffset.x / width);
                  setActiveImageIndex(idx);
                  const nextSource = gallerySources[idx];
                  setFullScreenSource(typeof nextSource === 'string' ? { uri: nextSource } : nextSource);
                }}>
                {gallerySources.map((img, idx) => {
                  const source = typeof img === 'string' ? { uri: img } : img;
                  return (
                    <ScrollView
                      key={idx}
                      style={{ width, height: '100%' }}
                      maximumZoomScale={3}
                      minimumZoomScale={1}
                      centerContent>
                      <ExpoImage
                        source={source}
                        style={[styles.modalImage, { width }]}
                        contentFit="contain"
                        transition={150}
                        cachePolicy="memory-disk"
                      />
                    </ScrollView>
                  );
                })}
              </ScrollView>
            ) : fullScreenSource ? (
              <ExpoImage source={fullScreenSource} style={styles.modalImage} contentFit="contain" />
            ) : null}
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingBottom: 24,
    backgroundColor: COLORS.background,
  },
  scroll: {
    backgroundColor: COLORS.background,
  },
  heroCard: {
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.stroke,
  },
  galleryImage: {
    width: 360,
    height: 240,
    backgroundColor: '#111',
  },
  heroContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
  },
  titleSpacer: {
    height: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  titleWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
  },
  heroAccent: {
    width: 120,
    height: 4,
    backgroundColor: COLORS.accent,
  },
  thumbRow: {
    marginTop: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
  },
  thumbContent: { gap: 10 },
  thumb: {
    width: 80,
    height: 56,
    borderWidth: 1,
    borderColor: '#444',
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  thumbActive: {
    borderColor: COLORS.accent,
    opacity: 1,
  },
  formGroup: {
    marginTop: 12,
  },
  formLabel: {
    color: COLORS.text,
    marginBottom: 6,
  },
  selectInput: {
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#1f1f1f',
  },
  input: {
    width: '100%',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#1f1f1f',
    color: COLORS.text,
  },
  pressable: {
    justifyContent: 'center',
  },
  inputSelected: {
    borderColor: COLORS.accent,
  },
  inputLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 4,
  },
  inputText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateHalf: {
    flexBasis: '50%',
  },
  dateSummaryBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: '#1f1f1f',
    gap: 4,
  },
  dateSummaryText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  doneButton: {
    marginTop: 8,
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  doneText: {
    color: '#111',
    fontWeight: '700',
  },
  pickerSheet: {
    padding: 12,
    backgroundColor: COLORS.background,
  },
  selectInputText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  selectInputHint: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
  },
  bookingCarName: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 6,
  },
  locationRow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    marginTop: 8,
    borderRadius: 4,
  },
  locationRowActive: {
    borderColor: COLORS.accent,
  },
  locationText: {
    color: COLORS.text,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 6,
  },
  meta: {
    color: COLORS.text,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    fontWeight: '700',
  },
  chipsCard: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 14,
    gap: 12,
  },
  featuresWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  block: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: COLORS.background,
  },
  blockHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blockTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
  },
  blockAccentVertical: {
    width: 4,
    height: 22,
    backgroundColor: COLORS.accent,
  },
  table: {
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.tableBg,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.stroke,
  },
  tableRowSingle: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.stroke,
  },
  tableLabel: {
    color: COLORS.text,
    fontWeight: '700',
    flexShrink: 1,
    fontSize: 13,
  },
  tableValue: {
    color: COLORS.accent,
    fontWeight: '800',
    fontSize: 13,
  },
  grossRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.stroke,
  },
  grossRowLast: {
    borderBottomWidth: 0,
    flexDirection: 'row',
  },
  grossCellLeft: {
    flex: 1,
    backgroundColor: '#353535',
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grossCellRight: {
    flex: 1,
    backgroundColor: '#2d2c2c',
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grossLabel: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  grossValue: {
    color: COLORS.accent,
    fontWeight: '800',
    fontSize: 14,
    textAlign: 'center',
  },
  grossDivider: {
    width: 1,
    backgroundColor: COLORS.stroke,
  },
  grossTable: {
    borderWidth: 1,
    borderColor: COLORS.stroke,
    marginTop: 8,
  },
  bodyText: {
    color: COLORS.muted,
    lineHeight: 22,
    marginTop: 8,
  },
  footerSpace: {
    height: 24,
  },
  readMoreBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.accent,
    borderRadius: 6,
  },
  readMoreText: {
    color: '#111',
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  modalInner: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalCloseIcon: {
    position: 'absolute',
    top: -20,
    right: 0,
    padding: 10,
    zIndex: 10,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  notFoundText: {
    color: COLORS.text,
    fontSize: 18,
  },
  sheet: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 16,
    gap: 8,
  },
  sheetTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  sheetRow: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  sheetRowActive: {
    borderColor: COLORS.accent,
    backgroundColor: '#1f1f1f',
  },
  sheetRowText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  sheetRowSub: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  sheetCancel: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    alignItems: 'center',
  },
  sheetCancelText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#111',
    fontWeight: '800',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  iosPickerCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
  },
  pickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 12,
  },
});
