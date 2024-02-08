import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Helmet from '../components/Helmet';
import PricesForm from '../components/CarPage/PricesForm';
import Footer from '../components/Footer';
import BookingForm from '../components/Booking/BookingForm';
import carData from '../assets/data/carData';

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
  name?: string;
  pageUrl?: string;
  'two-weeks-limit'?: string;
  carName?: string;
  carId: string;
  Fuel?: string;
}

interface CarBoockingProps {
  carId: string;
}


const CarBooking: React.FC<CarBoockingProps> = ({ carId }) => {
  const [bookingCars, setBookingCars] = useState<CarDataInterface | null>(null);

  useEffect(() => {
    document.title ="" + bookingCars?.carName;
    console.log('Fetching data for carId:', carId);
    const fetchCarData = async () => {
      try {
        if (!carId.trim()) {
          console.error('Car ID is missing or invalid!');
          return;
        }

        const carDocRef = doc(db, 'cars', carId.trim());
        const carDoc = await getDoc(carDocRef);

        if (carDoc.exists()) {
          setBookingCars({ id: carDoc.id, ...carDoc.data() } as CarDataInterface);
          console.log('Updated car data:', { id: carDoc.id, ...carDoc.data() });
        } else {
          setBookingCars(null);
          console.warn('Car not found!');
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, [carId]);

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
      ) : (
        <p className='mt-[400px] text-[64px] text-center text-white'>Loading...</p>
      )}
    </div>
  );
};

export default CarBooking;
