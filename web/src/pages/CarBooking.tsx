import React, { useEffect, useMemo, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import Helmet from '../components/Helmet';
import Footer from '../components/Footer';
import BookingForm from '../components/Booking/BookingForm';
import carDataJson from '../components/CarPage/data.json';
import legacyCarData from '../assets/data/carData';

interface CarDataInterface {
  id?: string;
  '1-3days'?: string;
  '4-6days'?: string;
  '7-13days'?: string;
  '14-29days'?: string;
  Month?: string;
  'Monthly-limit'?: string;
  Age?: string;
  'Annualy-limit'?: string;
  Booking?: string;
  'Daily-limit'?: string;
  Deposit?: string;
  Description?: string;
  'Description-more'?: string;
  Engine?: string;
  Features?: string[]; // Assuming Features is an array of strings
  Insurance?: string;
  License?: string;
  Price?: string;
  'Read-more1'?: string;
  'Read-more2'?: string;
  Service?: string;
  Transmission?: string;
  'Weekly-limit'?: string;
  Year?: number;
  images?: string[]; // Assuming images is an array of strings
  slug?: string;
  book?: string;
  name?: string;
  pageUrl?: string;
  'two-weeks-limit'?: string;
  carName?: string;
  carId: string;
  Fuel?: string;
}

const canonicalizeSlug = (value?: string) => {
  if (!value) return '';
  return value
    .replace(/^\//, '')
    .replace(/\/+$/, '')
    .replace(/\/?(booking|book|reserve)$/i, '')
    .replace(/\/+$/, '')
    .trim();
};

const CarBooking: React.FC = () => {
  const { slug: slugParam } = useParams<{ slug?: string }>();
  const [bookingCars, setBookingCars] = useState<CarDataInterface | null>(null);
  const [notFound, setNotFound] = useState(false);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001/api';
  const pathSlug = useMemo(() => {
    const segments = (typeof window !== 'undefined' ? window.location.pathname : '').split('/').filter(Boolean);
    if (segments.length >= 2 && /booking|book|reserve/i.test(segments[segments.length - 1])) {
      return canonicalizeSlug(segments[segments.length - 2]);
    }
    return canonicalizeSlug(segments[segments.length - 1] ?? '');
  }, []);
  const slug = useMemo(() => canonicalizeSlug(slugParam) || pathSlug, [slugParam, pathSlug]);

  const normalizeCar = (car: any): CarDataInterface => {
    const rawImages = (car as any).images;
    let parsedImages: string[] | undefined = undefined;
    if (typeof rawImages === 'string') {
      try {
        parsedImages = JSON.parse(rawImages);
      } catch {
        parsedImages = undefined;
      }
    } else if (Array.isArray(rawImages)) {
      parsedImages = rawImages;
    } else {
      // handle flat imports like mbc180w2061
      const imageKeys = Object.keys(car || {}).filter((k) => k.toLowerCase().includes('mb') && typeof (car as any)[k] === 'string');
      if (imageKeys.length) {
        parsedImages = imageKeys.map((k) => (car as any)[k]);
      }
    }
    return { ...car, images: parsedImages, pageUrl: canonicalizeSlug(car.pageUrl) ? `/${canonicalizeSlug(car.pageUrl)}` : car.pageUrl };
  };

  const matchesSlug = (car: any, currentSlug: string) => {
    if (!car || !currentSlug) return false;
    const normalizedPageUrl = canonicalizeSlug(car.pageUrl);
    const normalizedBook = canonicalizeSlug(car.book ?? car.Booking);
    const normalizedSlug = canonicalizeSlug(car.slug);
    const bookingSlugFromBook = canonicalizeSlug(car.book ?? car.Booking);
    const combinedSlugFromPageAndBook =
      normalizedPageUrl && (car.book || car.Booking) ? normalizedPageUrl : '';
    return (
      car.id === currentSlug ||
      car.carId === currentSlug ||
      normalizedSlug === currentSlug ||
      normalizedPageUrl === currentSlug ||
      bookingSlugFromBook === currentSlug ||
      combinedSlugFromPageAndBook === currentSlug
    );
  };

  useEffect(() => {
    const fetchCarData = async () => {
      if (!slug) {
        setNotFound(true);
        setBookingCars(null);
        return;
      }
      setNotFound(false);
      let found: CarDataInterface | null = null;

      try {
        // 1) Try backend API
        try {
          const apiRes = await fetch(`${API_BASE}/cars`);
          if (apiRes.ok) {
            const cars = (await apiRes.json()) as CarDataInterface[];
            const match =
              cars.find((c) => matchesSlug(c, slug)) ||
              cars.find((c) => canonicalizeSlug(c.pageUrl) === slug) ||
              null;
            if (match) {
              found = normalizeCar(match);
            }
          }
        } catch {
          // ignore API errors, continue to next sources
        }

        // 2) Fallback Firestore (doc id may equal slug)
        if (!found) {
          try {
            const candidates = [slug];
            for (const candidate of candidates) {
              if (candidate.trim()) {
                const carDocRef = doc(db, 'cars', candidate.trim());
                const carDoc = await getDoc(carDocRef);
                if (carDoc.exists()) {
                  found = normalizeCar({ id: carDoc.id, ...carDoc.data() });
                  break;
                }
              }
            }
          } catch {
            // ignore doc fetch errors
          }
        }

        // 3) Firestore scan (match by slug/pageUrl/book fields)
        if (!found) {
          try {
            const snap = await getDocs(collection(db, 'cars'));
            const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            const firestoreMatch =
              docs.find((c) => matchesSlug(c, slug)) ||
              docs.find((c) => canonicalizeSlug((c as any).pageUrl) === slug) ||
              null;
            if (firestoreMatch) {
              found = normalizeCar(firestoreMatch);
            }
          } catch {
            // ignore scan errors, fall through to local
          }
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      }

      // 4) Local static fallback (from bundled data)
      if (!found) {
        const jsonCars = (carDataJson as any)?.cars ?? [];
        const legacyCars = Array.isArray(legacyCarData) ? legacyCarData : [];
        const localCars = [...jsonCars, ...legacyCars];
        const slugWithBooking = `${slug}/booking`;
        const localMatch =
          localCars.find((c: any) => matchesSlug(c, slug)) ||
          localCars.find((c: any) => canonicalizeSlug(c.book ?? c.Booking) === slug) ||
          localCars.find((c: any) => (c.book ?? c.Booking ?? '').replace(/^\//, '') === slugWithBooking.replace(/^\//, '')) ||
          null;
        if (localMatch) {
          found = normalizeCar(localMatch);
        }
      }

      if (found) {
        setBookingCars(found);
        setNotFound(false);
      } else {
        setBookingCars(null);
        setNotFound(true);
      }
    };

    fetchCarData();
  }, [slug, API_BASE]);

  useEffect(() => {
    if (bookingCars?.carName) {
      document.title = `Booking - ${bookingCars.carName}`;
    }
  }, [bookingCars]);

  return (
    <div>
      {bookingCars ? (
        // Booking Component
        <>
          <Helmet title={`Booking - ${bookingCars.carName ?? 'Car Not Found'}`}>
            <BookingForm carName={bookingCars.carName} images={bookingCars.images} OneThreeDays={bookingCars['1-3days']} FourSixDays={bookingCars['4-6days']} SevenThirteenDays={bookingCars['7-13days']} FourteenTwentyNineDays={bookingCars['14-29days']} Month={bookingCars.Month} Insurance={bookingCars.Insurance} Deposit={bookingCars.Deposit} Age={bookingCars.Age} License={bookingCars.License} DailyLimit={bookingCars['Daily-limit']} WeeklyLimit={bookingCars['Weekly-limit']}
            TwoWeeksLimit={bookingCars['two-weeks-limit']}
            MonthlyLimit={bookingCars['Monthly-limit']}
            AnnualyLimit={bookingCars['Annualy-limit']}
            Service={bookingCars.Service}
            ReadMoreOne={bookingCars['Read-more1']}
            ReadMoreTwo={bookingCars['Read-more2']}
            Booking={bookingCars.Booking}
            pageUrl={bookingCars.pageUrl} />
            <Footer />
          </Helmet>
        </>
      ) : notFound ? (
        <p className="mt-[200px] text-[28px] text-center text-white">Car not found. Please go back and try again.</p>
      ) : (
        <p className="mt-[400px] text-[32px] text-center text-white">Loading...</p>
      )}
    </div>
  );
};

export default CarBooking;
