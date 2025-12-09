import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getStaticCarBySlug } from '@/lib/carMapping';
import { TopMenu } from '@/components/TopMenu';

const COLORS = {
  background: '#222',
  card: '#2d2d2d',
  stroke: '#3b3b3b',
  text: '#f5f5f5',
  muted: '#9ca3af',
  accent: '#d8b074',
};

const OUT_OF_HOURS_FEE = 89;
const WORKING_HOURS = { start: 9, end: 19 };

export default function BookingScreen() {
  const {
    slug,
    pickupDate: pickupDateParam,
    returnDate: returnDateParam,
    pickupLocation: pickupLocParam,
    returnLocation: returnLocParam,
    carName: carNameParam,
    basePrice: basePriceParam,
  } =
    useLocalSearchParams<{
      slug?: string;
      pickupDate?: string;
      returnDate?: string;
      pickupLocation?: string;
      returnLocation?: string;
      carName?: string;
      basePrice?: string;
  }>();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const headerOffset = insets.top + 60; // keep in sync with TopMenu height
  const staticCar = slug ? getStaticCarBySlug(slug) : undefined;
  const heroSource =
    (staticCar as any)?.gallery?.[0]
      ? typeof (staticCar as any).gallery[0] === 'string'
        ? { uri: (staticCar as any).gallery[0] }
        : (staticCar as any).gallery[0]
      : (staticCar as any)?.mobileImage
      ? (staticCar as any).mobileImage
      : (staticCar as any)?.images
      ? { uri: (staticCar as any).images }
      : null;

  const [carName, setCarName] = useState<string | null>(carNameParam ?? null);
  const [basePriceFrom, setBasePriceFrom] = useState<string | null>(basePriceParam ?? null);
  const [deposit, setDeposit] = useState<string | null>(null);
  const [pricing, setPricing] = useState<{
    oneThreeDays?: string;
    fourSixDays?: string;
    sevenThirteenDays?: string;
    fourteenTwentyNineDays?: string;
    monthPrice?: string;
  }>({});
  const [mileageLimits, setMileageLimits] = useState<{
    daily?: string;
    weekly?: string;
    twoWeeks?: string;
    monthly?: string;
    annually?: string;
  }>({});
  const [loadingCar, setLoadingCar] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [memberCode, setMemberCode] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [personalIdentityNumber, setPersonalIdentityNumber] = useState('');
  const parseDateParam = (value?: string | null) => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  };
  const [pickupDate, setPickupDate] = useState<Date | null>(parseDateParam(pickupDateParam));
  const [returnDate, setReturnDate] = useState<Date | null>(parseDateParam(returnDateParam));
  const [pickupTime, setPickupTime] = useState<Date | null>(parseDateParam(pickupDateParam));
  const [returnTime, setReturnTime] = useState<Date | null>(parseDateParam(returnDateParam));
  const [extraInfo, setExtraInfo] = useState('');
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showReturnTimePicker, setShowReturnTimePicker] = useState(false);

  const pickUpLocations = React.useMemo(
    () => [
      { label: 'Office - Bokserska 64', cost: 0 },
      { label: 'Chopin Airport', cost: 99 },
      { label: 'Modlin Airport', cost: 199 },
    ],
    [],
  );

  const [pickupLocation, setPickupLocation] = useState<string>(
    pickupLocParam ?? 'Office - Bokserska 64',
  );
  const [returnLocation, setReturnLocation] = useState<string>(
    returnLocParam ?? 'Office - Bokserska 64',
  );

  const formatDate = (value: Date | null) =>
    value ? value.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select date';
  const formatTime = (value: Date | null) =>
    value
      ? value.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
      : 'Select time';

  const combineDateTime = (dateVal: Date | null, timeVal: Date | null) => {
    if (!dateVal) return null;
    const base = new Date(dateVal);
    if (timeVal) {
      base.setHours(timeVal.getHours(), timeVal.getMinutes(), 0, 0);
    } else {
      base.setHours(12, 0, 0, 0);
    }
    return base;
  };

  const formatDateTime = (dateVal: Date | null, timeVal: Date | null) => {
    const dt = combineDateTime(dateVal, timeVal);
    if (!dt) return undefined;
    return dt.toLocaleString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const rentalDays = useMemo(() => {
    const start = combineDateTime(pickupDate, pickupTime);
    const end = combineDateTime(returnDate, returnTime);
    if (!start || !end) return null;
    const diffMs = end.getTime() - start.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return days > 0 ? days : null;
  }, [pickupDate, returnDate, pickupTime, returnTime]);

  const parsePriceNumber = (value?: string | null) => {
    if (!value) return null;
    const cleaned = value.replace(/[^\d.,-]/g, '').replace(',', '.');
    const num = Number(cleaned);
    return Number.isNaN(num) ? null : num;
  };

  const formatDeposit = (value?: string | null) => {
    if (!value) return undefined;
    const numeric = value.replace(/[^\d]/g, '');
    if (!numeric) return value.trim();
    const withSpaces = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${withSpaces} PLN`;
  };

  const selectedDailyPrice = useMemo(() => {
    if (!rentalDays || rentalDays <= 0) return null;

    if (rentalDays >= 1 && rentalDays <= 3) return parsePriceNumber(pricing.oneThreeDays);
    if (rentalDays >= 4 && rentalDays <= 6) return parsePriceNumber(pricing.fourSixDays);
    if (rentalDays >= 7 && rentalDays <= 13) return parsePriceNumber(pricing.sevenThirteenDays);
    if (rentalDays >= 14 && rentalDays <= 29) return parsePriceNumber(pricing.fourteenTwentyNineDays);

    if (rentalDays >= 30) {
      const monthNum = parsePriceNumber(pricing.monthPrice);
      if (monthNum !== null) {
        return Math.round(monthNum / 30);
      }
    }

    return parsePriceNumber(basePriceFrom);
  }, [rentalDays, pricing, basePriceFrom]);

  const isOutOfHours = (dateVal: Date | null, timeVal: Date | null) => {
    const dt = combineDateTime(dateVal, timeVal);
    if (!dt) return false;
    const hour = dt.getHours();
    return hour < WORKING_HOURS.start || hour >= WORKING_HOURS.end;
  };

  const pickupCostBase = pickUpLocations.find((item) => item.label === pickupLocation)?.cost ?? 0;
  const returnCostBase = pickUpLocations.find((item) => item.label === returnLocation)?.cost ?? 0;
  const pickupOutHours = isOutOfHours(pickupDate, pickupTime) ? OUT_OF_HOURS_FEE : 0;
  const returnOutHours = isOutOfHours(returnDate, returnTime) ? OUT_OF_HOURS_FEE : 0;
  const pickupCost = pickupCostBase + pickupOutHours;
  const returnCost = returnCostBase + returnOutHours;

  const estimatedTotalPrice = useMemo(() => {
    if (!rentalDays) return null;
    const monthNum = parsePriceNumber(pricing.monthPrice);
    if (monthNum !== null && rentalDays >= 30) {
      const months = Math.floor(rentalDays / 30);
      const remainder = rentalDays - months * 30;
      // pick best rate for remainder
      let remainderRate: number | null = null;
      if (remainder > 0) {
        if (remainder <= 3) remainderRate = parsePriceNumber(pricing.oneThreeDays);
        else if (remainder <= 6) remainderRate = parsePriceNumber(pricing.fourSixDays);
        else if (remainder <= 13) remainderRate = parsePriceNumber(pricing.sevenThirteenDays);
        else remainderRate = parsePriceNumber(pricing.fourteenTwentyNineDays);
        if (remainderRate === null) remainderRate = Math.round(monthNum / 30);
      }
      const total =
        months * monthNum +
        (remainder > 0 && remainderRate ? remainder * remainderRate : 0) +
        pickupCost +
        returnCost;
      return Number.isFinite(total) ? total : null;
    }

    const perDay = selectedDailyPrice ?? parsePriceNumber(basePriceFrom);
    if (!perDay) return null;
    return rentalDays * perDay + pickupCost + returnCost;
  }, [rentalDays, pricing, selectedDailyPrice, basePriceFrom, pickupCost, returnCost]);

  const totalMileageLimit = useMemo(() => {
    const toStr = (value?: string | number) => {
      if (value === undefined || value === null) return undefined;
      return typeof value === 'number' ? `${value}` : value;
    };
    if (!rentalDays) return toStr(mileageLimits.daily);
    if (rentalDays <= 1) return toStr(mileageLimits.daily);
    if (rentalDays <= 7) return toStr(mileageLimits.weekly);
    if (rentalDays <= 14) return toStr(mileageLimits.twoWeeks);
    if (rentalDays <= 30) return toStr(mileageLimits.monthly);
    return toStr(mileageLimits.annually);
  }, [rentalDays, mileageLimits]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailPattern = /.+@.+\..+/;
      if (!emailPattern.test(email.trim())) {
        errors.email = 'Enter a valid email';
      }
    }

    if (!phone.trim()) errors.phone = 'Phone number is required';
    if (!address.trim()) errors.address = 'Address is required';
    if (!postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!city.trim()) errors.city = 'City/town is required';
    if (!driverLicenseNumber.trim()) errors.driverLicenseNumber = 'Driver license is required';
    if (!idNumber.trim()) errors.idNumber = 'ID number is required';
    if (!personalIdentityNumber.trim())
      errors.personalIdentityNumber = 'Personal identity number is required';

    const start = combineDateTime(pickupDate, pickupTime);
    const end = combineDateTime(returnDate, returnTime);

    if (!pickupDate) errors.pickupDate = 'Pickup date is required';
    if (!returnDate) errors.returnDate = 'Return date is required';
    if (!pickupTime) errors.pickupDate = 'Pickup time is required';
    if (!returnTime) errors.returnDate = 'Return time is required';

    if (start && end && end <= start) {
      errors.returnDate = 'Return date must be after pickup date';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchCar = async () => {
      const staticCarData = slug ? getStaticCarBySlug(slug) : undefined;
      if (!slug && !staticCarData) {
        setCarName(carNameParam ?? null);
        setBasePriceFrom(basePriceParam ?? null);
        setPricing({});
        setLoadingCar(false);
        return;
      }

      if (staticCarData) {
        setCarName((staticCarData as any).name ?? carNameParam ?? null);
        setBasePriceFrom((staticCarData as any).price ?? basePriceParam ?? null);
        setDeposit((staticCarData as any).Deposit ?? (staticCarData as any).deposit ?? null);
        setPricing({
          oneThreeDays: (staticCarData as any).oneThreeDays,
          fourSixDays: (staticCarData as any).fourSixDays,
          sevenThirteenDays: (staticCarData as any).sevenThirteenDays,
          fourteenTwentyNineDays: (staticCarData as any).fourteenTwentyNineDays,
          monthPrice: (staticCarData as any).monthPrice,
        });
        setMileageLimits({
          daily:
            (staticCarData as any)['Daily-limit'] ??
            (staticCarData as any).dailyLimit,
          weekly:
            (staticCarData as any)['Weekly-limit'] ??
            (staticCarData as any).weeklyLimit,
          twoWeeks:
            (staticCarData as any)['two-weeks-limit'] ??
            (staticCarData as any).twoWeeksLimit,
          monthly:
            (staticCarData as any)['Monthly-limit'] ??
            (staticCarData as any).monthlyLimit,
          annually:
            (staticCarData as any)['Annually-limit'] ??
            (staticCarData as any).annualLimit,
        });
      }

      if (!slug) {
        setLoadingCar(false);
        return;
      }

      try {
        const carsCollection = collection(db, 'cars');
        const q = query(carsCollection, where('pageUrl', '==', `/${slug}`));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          const data = docSnap.data() as any;
          setCarName(
            (data.carName as string | undefined) ??
              (data.name as string | undefined) ??
              carNameParam ??
              staticCarData?.name ??
              null,
          );
          setBasePriceFrom(
            (data.Price as string | undefined) ??
              (data.price as string | undefined) ??
              basePriceParam ??
              (staticCarData as any)?.price ??
              null,
          );
          setDeposit(
            (data.Deposit as string | undefined) ??
              (staticCarData as any)?.Deposit ??
              (staticCarData as any)?.deposit ??
              null,
          );
          setPricing({
            oneThreeDays:
              (data['1-3days'] as string | undefined) ?? (staticCarData as any)?.oneThreeDays,
            fourSixDays:
              (data['4-6days'] as string | undefined) ?? (staticCarData as any)?.fourSixDays,
            sevenThirteenDays:
              (data['7-13days'] as string | undefined) ?? (staticCarData as any)?.sevenThirteenDays,
            fourteenTwentyNineDays:
              (data['14-29days'] as string | undefined) ??
              (staticCarData as any)?.fourteenTwentyNineDays,
            monthPrice: (data.Month as string | undefined) ?? (staticCarData as any)?.monthPrice,
          });
          setMileageLimits({
            daily:
              (data['Daily-limit'] as string | undefined) ??
              (staticCarData as any)?.['Daily-limit'] ??
              (staticCarData as any)?.dailyLimit,
            weekly:
              (data['Weekly-limit'] as string | undefined) ??
              (staticCarData as any)?.['Weekly-limit'] ??
              (staticCarData as any)?.weeklyLimit,
            twoWeeks:
              (data['two-weeks-limit'] as string | undefined) ??
              (staticCarData as any)?.['two-weeks-limit'] ??
              (staticCarData as any)?.twoWeeksLimit,
            monthly:
              (data['Monthly-limit'] as string | undefined) ??
              (staticCarData as any)?.['Monthly-limit'] ??
              (staticCarData as any)?.monthlyLimit,
            annually:
              (data['Annually-limit'] as string | undefined) ??
              (staticCarData as any)?.['Annually-limit'] ??
              (staticCarData as any)?.annualLimit,
          });
        }
      } catch {
        // keep static/param values
      } finally {
        setLoadingCar(false);
      }
    };

    fetchCar();
  }, [slug, carNameParam, basePriceParam]);

  useEffect(() => {
    if (pickupDateParam && !pickupDate) setPickupDate(parseDateParam(pickupDateParam));
    if (returnDateParam && !returnDate) setReturnDate(parseDateParam(returnDateParam));
    if (pickupDateParam && !pickupTime) setPickupTime(parseDateParam(pickupDateParam));
    if (returnDateParam && !returnTime) setReturnTime(parseDateParam(returnDateParam));
    if (pickupLocParam && pickupLocation === 'Office - Bokserska 64') setPickupLocation(pickupLocParam);
    if (returnLocParam && returnLocation === 'Office - Bokserska 64') setReturnLocation(returnLocParam);
  }, [pickupDateParam, returnDateParam, pickupLocParam, returnLocParam, pickupDate, returnDate, pickupTime, returnTime, pickupLocation, returnLocation]);

  if (loadingCar) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Loading car…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!carName) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Car not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={{ flex: 1 }}>
        <TopMenu />
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerOffset }]}>

          <View style={styles.topBar}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backIcon}>{'<'}</Text>
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          </View>

          {heroSource && (
            <ExpoImage
              source={heroSource}
              style={styles.hero}
              contentFit="cover"
              transition={200}
            />
          )}

          <View style={styles.header}>
            <Text style={styles.heading}>{carName}</Text>
            <View style={styles.accent} />
            {basePriceFrom && <Text style={styles.basePrice}>From {basePriceFrom}</Text>}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>Pick-up</Text>
            <View style={styles.dateRow}>
              <Pressable
                style={[
                  styles.input,
                  styles.pressable,
                  pickupDate && styles.inputSelected,
                  fieldErrors.pickupDate && styles.inputErrorBorder,
                ]}
                onPress={() => setShowPickupDatePicker(true)}>
                <Text style={styles.inputLabel}>Date</Text>
                <Text style={styles.inputText}>{formatDate(pickupDate)}</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.input,
                  styles.pressable,
                  pickupTime && styles.inputSelected,
                  fieldErrors.pickupDate && styles.inputErrorBorder,
                ]}
                onPress={() => setShowPickupTimePicker(true)}>
                <Text style={styles.inputLabel}>Time</Text>
                <Text style={styles.inputText}>{formatTime(pickupTime)}</Text>
              </Pressable>
            </View>
            {fieldErrors.pickupDate && <Text style={styles.errorText}>{fieldErrors.pickupDate}</Text>}

            <Text style={[styles.sectionHeading, { marginTop: 12 }]}>Return</Text>
            <View style={styles.dateRow}>
              <Pressable
                style={[
                  styles.input,
                  styles.pressable,
                  returnDate && styles.inputSelected,
                  fieldErrors.returnDate && styles.inputErrorBorder,
                ]}
                onPress={() => setShowReturnDatePicker(true)}>
                <Text style={styles.inputLabel}>Date</Text>
                <Text style={styles.inputText}>{formatDate(returnDate)}</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.input,
                  styles.pressable,
                  returnTime && styles.inputSelected,
                  fieldErrors.returnDate && styles.inputErrorBorder,
                ]}
                onPress={() => setShowReturnTimePicker(true)}>
                <Text style={styles.inputLabel}>Time</Text>
                <Text style={styles.inputText}>{formatTime(returnTime)}</Text>
              </Pressable>
            </View>
            {fieldErrors.returnDate && <Text style={styles.errorText}>{fieldErrors.returnDate}</Text>}

            {showPickupDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                themeVariant="dark"
                value={pickupDate ?? new Date()}
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  setShowPickupDatePicker(false);
                  if (event.type === 'set' && date) setPickupDate(date);
                }}
              />
            )}
            {showPickupTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                themeVariant="dark"
                value={pickupTime ?? new Date()}
                minuteInterval={5}
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  setShowPickupTimePicker(false);
                  if (event.type === 'set' && date) setPickupTime(date);
                }}
              />
            )}
            {showReturnDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                themeVariant="dark"
                value={returnDate ?? new Date()}
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  setShowReturnDatePicker(false);
                  if (event.type === 'set' && date) setReturnDate(date);
                }}
              />
            )}
            {showReturnTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                themeVariant="dark"
                value={returnTime ?? new Date()}
                minuteInterval={5}
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  setShowReturnTimePicker(false);
                  if (event.type === 'set' && date) setReturnTime(date);
                }}
              />
            )}

            <Text style={[styles.sectionHeading, { marginTop: 12 }]}>Pick-up Location</Text>
            <View style={styles.choiceColumn}>
              {pickUpLocations.map((loc) => (
                <Pressable
                  key={loc.label}
                  onPress={() => setPickupLocation(loc.label)}
                  style={[
                    styles.choiceRow,
                    pickupLocation === loc.label && styles.choiceRowSelected,
                  ]}>
                  <Text
                    style={[
                      styles.choiceText,
                      pickupLocation === loc.label && styles.choiceTextSelected,
                    ]}>
                    {loc.label} - {loc.cost} PLN
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionHeading, { marginTop: 12 }]}>Return Location</Text>
            <View style={styles.choiceColumn}>
              {pickUpLocations.map((loc) => (
                <Pressable
                  key={loc.label}
                  onPress={() => setReturnLocation(loc.label)}
                  style={[
                    styles.choiceRow,
                    returnLocation === loc.label && styles.choiceRowSelected,
                  ]}>
                  <Text
                    style={[
                      styles.choiceText,
                      returnLocation === loc.label && styles.choiceTextSelected,
                    ]}>
                    {loc.label} - {loc.cost} PLN
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>Summary</Text>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Price per day</Text>
              <Text style={styles.pricingValue}>
                {selectedDailyPrice
                  ? `${selectedDailyPrice} PLN`
                  : basePriceFrom ?? '—'}
              </Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Refundable deposit</Text>
              <Text style={styles.pricingValue}>{formatDeposit(deposit) ?? '—'}</Text>
            </View>
            {deposit && (
              <Text style={styles.pricingHint}>Deposit shown for info, not added to total.</Text>
            )}
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Total mileage limit</Text>
              <Text style={styles.pricingValue}>
                {totalMileageLimit
                  ? totalMileageLimit.toLowerCase().includes('km')
                    ? totalMileageLimit
                    : `${totalMileageLimit} km`
                  : '—'}
              </Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Pick-up location</Text>
              <Text style={styles.pricingValue}>
                {pickupLocation} ({pickupCostBase} PLN{pickupOutHours ? ` + ${pickupOutHours} PLN` : ''})
              </Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Return location</Text>
              <Text style={styles.pricingValue}>
                {returnLocation} ({returnCostBase} PLN{returnOutHours ? ` + ${returnOutHours} PLN` : ''})
              </Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Pick-up outside office hours</Text>
              <Text style={styles.pricingValue}>{pickupOutHours ? `${pickupOutHours} PLN` : '0 PLN'}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Return outside office hours</Text>
              <Text style={styles.pricingValue}>{returnOutHours ? `${returnOutHours} PLN` : '0 PLN'}</Text>
            </View>
            <View style={[styles.pricingRow, styles.amountRow]}>
              <Text style={[styles.pricingLabel, styles.amountLabel]}>AMOUNT DUE</Text>
              <Text style={[styles.pricingValue, styles.amountValue]}>
                {estimatedTotalPrice ? `${estimatedTotalPrice} PLN` : '—'}
              </Text>
            </View>
            {!estimatedTotalPrice && (
              <Text style={styles.pricingHint}>
                Select pickup and return dates to see an estimated total price.
              </Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeading}>Booking</Text>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>First name</Text>
                <TextInput
                  style={[styles.input, fieldErrors.firstName && styles.inputErrorBorder]}
                  placeholder="First name"
                  placeholderTextColor={COLORS.muted}
                  value={firstName}
                  onChangeText={setFirstName}
                />
                {fieldErrors.firstName && (
                  <Text style={styles.errorText}>{fieldErrors.firstName}</Text>
                )}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Last name</Text>
                <TextInput
                  style={[styles.input, fieldErrors.lastName && styles.inputErrorBorder]}
                  placeholder="Last name"
                  placeholderTextColor={COLORS.muted}
                  value={lastName}
                  onChangeText={setLastName}
                />
                {fieldErrors.lastName && (
                  <Text style={styles.errorText}>{fieldErrors.lastName}</Text>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>Address of permanent residence</Text>
                <TextInput
                  style={[styles.input, fieldErrors.address && styles.inputErrorBorder]}
                  placeholder="Street, number, apartment"
                  placeholderTextColor={COLORS.muted}
                  value={address}
                  onChangeText={setAddress}
                />
                {fieldErrors.address && <Text style={styles.errorText}>{fieldErrors.address}</Text>}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Postal code</Text>
                <TextInput
                  style={[styles.input, fieldErrors.postalCode && styles.inputErrorBorder]}
                  placeholder="00-000"
                  placeholderTextColor={COLORS.muted}
                  value={postalCode}
                  onChangeText={setPostalCode}
                />
                {fieldErrors.postalCode && (
                  <Text style={styles.errorText}>{fieldErrors.postalCode}</Text>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>City/Town</Text>
                <TextInput
                  style={[styles.input, fieldErrors.city && styles.inputErrorBorder]}
                  placeholder="City"
                  placeholderTextColor={COLORS.muted}
                  value={city}
                  onChangeText={setCity}
                />
                {fieldErrors.city && <Text style={styles.errorText}>{fieldErrors.city}</Text>}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Membership code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Optional"
                  placeholderTextColor={COLORS.muted}
                  value={memberCode}
                  onChangeText={setMemberCode}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                  style={[styles.input, fieldErrors.phone && styles.inputErrorBorder]}
                  placeholder="+48 720 889 788"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
                {fieldErrors.phone && <Text style={styles.errorText}>{fieldErrors.phone}</Text>}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, fieldErrors.email && styles.inputErrorBorder]}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                {fieldErrors.email && <Text style={styles.errorText}>{fieldErrors.email}</Text>}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>Driver license</Text>
                <TextInput
                  style={[styles.input, fieldErrors.driverLicenseNumber && styles.inputErrorBorder]}
                  placeholder="Number"
                  placeholderTextColor={COLORS.muted}
                  value={driverLicenseNumber}
                  onChangeText={setDriverLicenseNumber}
                />
                {fieldErrors.driverLicenseNumber && (
                  <Text style={styles.errorText}>{fieldErrors.driverLicenseNumber}</Text>
                )}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>ID number</Text>
                <TextInput
                  style={[styles.input, fieldErrors.idNumber && styles.inputErrorBorder]}
                  placeholder="ID number"
                  placeholderTextColor={COLORS.muted}
                  value={idNumber}
                  onChangeText={setIdNumber}
                />
                {fieldErrors.idNumber && <Text style={styles.errorText}>{fieldErrors.idNumber}</Text>}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>Driver license (optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Additional document"
                  placeholderTextColor={COLORS.muted}
                  value={taxNumber}
                  onChangeText={setTaxNumber}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Personal identity number</Text>
                <TextInput
                  style={[
                    styles.input,
                    fieldErrors.personalIdentityNumber && styles.inputErrorBorder,
                  ]}
                  placeholder="PESEL"
                  placeholderTextColor={COLORS.muted}
                  value={personalIdentityNumber}
                  onChangeText={setPersonalIdentityNumber}
                />
                {fieldErrors.personalIdentityNumber && (
                  <Text style={styles.errorText}>{fieldErrors.personalIdentityNumber}</Text>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Additional information</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Flight number, delivery address, special requests..."
                placeholderTextColor={COLORS.muted}
                multiline
                numberOfLines={4}
                value={extraInfo}
                onChangeText={setExtraInfo}
              />
            </View>
          </View>

          {status === 'success' && (
            <Text style={styles.successText}>Booking request sent. We will contact you soon.</Text>
          )}
          {status === 'error' && (
            <Text style={styles.errorText}>
              Something went wrong. Please try again or contact us by phone.
            </Text>
          )}

          <Pressable
            style={[styles.button, submitting && styles.buttonDisabled]}
            disabled={submitting}
            onPress={async () => {
              if (submitting) return;
              if (!validateForm()) {
                return;
              }
              setStatus('idle');
              setSubmitting(true);

              try {
                const pickupDateTime = combineDateTime(pickupDate, pickupTime);
                const returnDateTime = combineDateTime(returnDate, returnTime);

                const bookingApiUrl =
                  process.env.EXPO_PUBLIC_BOOKING_ENDPOINT ||
                  process.env.EXPO_PUBLIC_BOOKING_API_URL ||
                  'https://example.com/api/booking';

                const payload = {
                  carSlug: slug,
                  carName,
                  carPriceFrom: basePriceFrom,
                  firstName,
                  lastName,
                  email,
                  phone,
                  taxNumber,
                  address,
                  postalCode,
                  city,
                  memberCode,
                  driverLicenseNumber,
                  idNumber,
                  personalIdentityNumber,
                  pickupDate: pickupDateTime ? pickupDateTime.toISOString() : null,
                  returnDate: returnDateTime ? returnDateTime.toISOString() : null,
                  pickupLocation,
                  returnLocation,
                  extraInfo,
                  source: 'mobile-app',
                };

                const response = await fetch(bookingApiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                });

                if (!response.ok) {
                  throw new Error('Non-2xx response');
                }

                const formattedPickup = formatDateTime(pickupDate, pickupTime);
                const formattedReturn = formatDateTime(returnDate, returnTime);
                const amountStr = estimatedTotalPrice ? `${estimatedTotalPrice} PLN` : undefined;

                setStatus('success');
                setFieldErrors({});
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setTaxNumber('');
                setAddress('');
                setPostalCode('');
                setCity('');
                setMemberCode('');
                setDriverLicenseNumber('');
                setIdNumber('');
                setPersonalIdentityNumber('');
                setPickupDate(null);
                setReturnDate(null);
                setPickupTime(null);
                setReturnTime(null);
                setExtraInfo('');

                router.push({
                  pathname: '/thanks',
                  params: {
                    origin: 'Booking',
                    car: carName ?? '',
                    pickupDate: formattedPickup ?? '',
                    pickupLocation,
                    returnDate: formattedReturn ?? '',
                    returnLocation,
                    amount: amountStr ?? '',
                    name: `${firstName} ${lastName}`.trim(),
                    phone,
                    email,
                    message: extraInfo,
                  },
                });
              } catch {
                setStatus('error');
              } finally {
                setSubmitting(false);
              }
            }}>
            <Text style={styles.buttonText}>{submitting ? 'Sending…' : 'Submit'}</Text>
          </Pressable>

          <View style={styles.footerSpace} />
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboard: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: COLORS.background,
  },
  topBar: {
    marginBottom: 10,
    marginTop: 6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 6,
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 18,
  },
  backText: {
    color: COLORS.text,
    fontSize: 14,
  },
  hero: {
    width: '100%',
    height: 260,
    borderRadius: 0,
    marginBottom: 16,
    backgroundColor: '#1c1c1c',
  },
  header: {
    marginBottom: 18,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  accent: {
    width: 110,
    height: 4,
    backgroundColor: COLORS.accent,
    marginBottom: 8,
  },
  basePrice: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.stroke,
    borderWidth: 1,
    borderRadius: 6,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeading: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'column',
    gap: 12,
  },
  field: {
    flex: 1,
    width: '100%',
    marginBottom: 12,
  },
  label: {
    color: COLORS.text,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text,
    backgroundColor: '#2b2b2b',
  },
  pressable: {
    justifyContent: 'center',
  },
  inputSelected: {
    borderColor: COLORS.accent,
  },
  inputText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  inputLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 4,
    },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputErrorBorder: {
    borderColor: '#f97373',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  choiceColumn: {
    gap: 8,
  },
  choiceRow: {
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#303030',
  },
  choiceRowSelected: {
    borderColor: COLORS.accent,
    backgroundColor: '#3a3326',
  },
  choiceText: {
    color: COLORS.text,
  },
  choiceTextSelected: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.stroke,
  },
  amountRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
    paddingTop: 12,
    marginTop: 4,
  },
  pricingLabel: {
    color: COLORS.text,
  },
  pricingValue: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  amountLabel: {
    fontWeight: '800',
  },
  amountValue: {
    color: COLORS.accent,
    fontWeight: '800',
  },
  estimateBox: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.stroke,
    paddingTop: 10,
  },
  estimateLabel: {
    color: COLORS.text,
    marginBottom: 4,
  },
  estimateValue: {
    color: COLORS.accent,
    fontWeight: '800',
  },
  pricingHint: {
    marginTop: 6,
    color: COLORS.muted,
    fontSize: 12,
  },
  successText: {
    marginTop: 12,
    color: '#4ade80',
  },
  errorText: {
    marginTop: 6,
    color: '#f97373',
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#111',
    fontWeight: '700',
    fontSize: 16,
  },
  footerSpace: {
    height: 28,
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
});
