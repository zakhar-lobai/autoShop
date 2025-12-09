import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import type { Car } from '@/constants/carData';
import { carData } from '@/constants/carData';

// Local JSON fallback with full car records sourced from Firestore export
let jsonCarsRaw: any[] = [];
try {
jsonCarsRaw = require('../app/car/carData.json') as any[];
} catch {
  jsonCarsRaw = [];
}

const slugify = (val: string) =>
  (val || '')
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

function normalizeSlug(docId: string, pageUrl?: string) {
  const fromPage = pageUrl ? slugify(pageUrl) : '';
  if (fromPage) return fromPage;
  return slugify(docId);
}

const parseArrayField = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value as string[];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
      // fallback: split by comma if it's a serialized list but not valid JSON
      return value
        .split(',')
        .map((s) => s.replace(/^[\s"']+|[\s"']+$/g, ''))
        .filter(Boolean);
    }
  }
  return [];
};

const jsonCars: Car[] = (jsonCarsRaw ?? []).map((item) => {
  const pageUrl: string = item.pageUrl || item['pageUrl'] || '';
  const slug = normalizeSlug(item['Document ID'] ?? item.id ?? item.carId ?? '', pageUrl);
  const imagesArr = parseArrayField(item.images);
  const gallery = imagesArr.length > 0 ? imagesArr : [];

  return {
    id: item.id ?? item['Document ID'] ?? slug,
    slug,
    images: imagesArr[0] ?? '',
    name: item.carName ?? item.name ?? '',
    year: Number(item.Year ?? item.year ?? 0),
    transmission: item.Transmission ?? item.transmission ?? '',
    engine: item.Engine ?? item.engine ?? '',
    fuel: item.Fuel ?? item.fuel ?? '',
    features: parseArrayField(item.Features),
    price: item.Price ?? item.price ?? '',
    oneThreeDays: item['1-3days'],
    fourSixDays: item['4-6days'],
    sevenThirteenDays: item['7-13days'],
    fourteenTwentyNineDays: item['14-29days'],
    monthPrice: item.Month,
    pageUrl: pageUrl ? (pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`) : `/${slug}`,
    book: item.Booking ?? 'booking',
    helmet: item.helmet,
    description: item.Description ?? '',
    descriptionMore: item['Description-more'] ?? '',
    readMore1: item['Read-more1'] ?? '',
    readMore2: item['Read-more2'] ?? '',
    mobileImage: imagesArr[0] ? { uri: imagesArr[0] } : undefined,
    deposit: item.Deposit ?? item.deposit,
    dailyLimit: item['Daily-limit'] ?? item.dailyLimit,
    weeklyLimit: item['Weekly-limit'] ?? item.weeklyLimit,
    twoWeeksLimit: item['two-weeks-limit'] ?? item.twoWeeksLimit,
    monthlyLimit: item['Monthly-limit'] ?? item.monthlyLimit,
    annualLimit: item['Annually-limit'] ?? item['Annualy-limit'] ?? item.annualLimit,
    age: item.Age ?? item.age,
    license: item.License ?? item.license,
    // allow downstream screens to access full gallery
    gallery,
  };
});

const staticCarsBySlug: Record<string, Car> = (() => {
  const acc: Record<string, Car> = {};
  // base static cars
  for (const car of carData.cars) {
    acc[car.slug] = car;
  }
  // merge json-derived cars, but preserve mobile image/gallery fallbacks from static when missing
  for (const car of jsonCars) {
    const existing = acc[car.slug];
    const merged: Car = { ...(existing ?? {}), ...car };
    if (!car.mobileImage && existing?.mobileImage) {
      merged.mobileImage = existing.mobileImage;
    }
    if (!(car as any).gallery && (existing as any)?.gallery) {
      (merged as any).gallery = (existing as any).gallery;
    }
    acc[car.slug] = merged;
  }
  return acc;
})();

export const getLocalCars = () => jsonCars;

export interface CarFromFirestore extends Car {
  gallery: (string | any)[];
  deposit?: string;
  insurance?: string;
  age?: string;
  license?: string;
  dailyLimit?: string;
  weeklyLimit?: string;
  twoWeeksLimit?: string;
  monthlyLimit?: string;
  annualLimit?: string;
  service?: string;
  descriptionMore?: string;
  readMore1?: string;
  readMore2?: string;
}

export const getStaticCarBySlug = (slug?: string) => {
  if (!slug) return undefined;
  return staticCarsBySlug[slugify(slug)];
};

export function mapFirestoreCar(doc: QueryDocumentSnapshot<DocumentData>): CarFromFirestore {
  const data = doc.data() as any;
  const pageUrl = (data.pageUrl as string | undefined) ?? '';
  const slug = normalizeSlug(doc.id, pageUrl);
  const staticCar = getStaticCarBySlug(slug);

  const galleryParsed = parseArrayField(data.images);
  const galleryFromDb = galleryParsed.length > 0 ? galleryParsed : Array.isArray(data.images) ? data.images.filter(Boolean) : [];
  const galleryFallback = staticCar
    ? (staticCar as any).gallery?.length
      ? (staticCar as any).gallery
      : staticCar.mobileImage
      ? [staticCar.mobileImage]
      : []
    : [];

  return {
    id: doc.id,
    slug,
    images: galleryFromDb[0] ?? staticCar?.images ?? '',
    gallery: galleryFromDb.length > 0 ? galleryFromDb : galleryFallback,
    name: (data.carName as string | undefined) ?? (data.name as string | undefined) ?? staticCar?.name ?? '',
    year: (data.Year as number | undefined) ?? (data.year as number | undefined) ?? staticCar?.year ?? 0,
    transmission:
      (data.Transmission as string | undefined) ?? (data.transmission as string | undefined) ?? staticCar?.transmission ?? '',
    engine: (data.Engine as string | undefined) ?? (data.engine as string | undefined) ?? staticCar?.engine ?? '',
    fuel: (data.Fuel as string | undefined) ?? (data.fuel as string | undefined) ?? staticCar?.fuel ?? '',
    features: (data.Features as string[] | undefined) ?? staticCar?.features ?? [],
    price: (data.Price as string | undefined) ?? (data.price as string | undefined) ?? staticCar?.price ?? '',
    oneThreeDays: (data['1-3days'] as string | undefined) ?? staticCar?.oneThreeDays,
    fourSixDays: (data['4-6days'] as string | undefined) ?? staticCar?.fourSixDays,
    sevenThirteenDays: (data['7-13days'] as string | undefined) ?? staticCar?.sevenThirteenDays,
    fourteenTwentyNineDays: (data['14-29days'] as string | undefined) ?? staticCar?.fourteenTwentyNineDays,
    monthPrice: (data.Month as string | undefined) ?? staticCar?.monthPrice,
    pageUrl: pageUrl || `/${slug}`,
    book: (data.Booking as string | undefined) ?? staticCar?.book ?? 'booking',
    helmet: (data.helmet as string | undefined) ?? staticCar?.helmet,
    description: (data.Description as string | undefined) ?? staticCar?.description,
    descriptionMore: (data['Description-more'] as string | undefined) ?? (staticCar as any)?.descriptionMore,
    readMore1: (data['Read-more1'] as string | undefined) ?? (staticCar as any)?.readMore1,
    readMore2: (data['Read-more2'] as string | undefined) ?? (staticCar as any)?.readMore2,
    mobileImage: staticCar?.mobileImage,
    deposit: data.Deposit as string | undefined,
    insurance: data.Insurance as string | undefined,
    age: data.Age as string | undefined,
    license: data.License as string | undefined,
    dailyLimit: data['Daily-limit'] as string | undefined,
    weeklyLimit: data['Weekly-limit'] as string | undefined,
    twoWeeksLimit: data['two-weeks-limit'] as string | undefined,
    monthlyLimit: data['Monthly-limit'] as string | undefined,
    annualLimit: data['Annualy-limit'] as string | undefined,
    service: data.Service as string | undefined,
  };
}
