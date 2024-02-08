import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Helmet from '../components/Helmet';
import MultipleItems from '../components/CarPage/CarPageImageCarousel';
import CarInfo from '../components/CarPage/CarInfo';
import Promo from '../components/CarPage/Promo';
import PricesForm from '../components/CarPage/PricesForm';
import Footer from '../components/Footer';
import CarDatas from '../components/CarPage/CarDatas';

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

interface SingleCarProps {
  carId: string;
}

const SingleCar: React.FC<SingleCarProps> = ({ carId }) => {
  const [carData, setCarData] = useState<CarDataInterface | null>(null);

  useEffect(() => {
    document.title ="" + carData?.carName;
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
          setCarData({ id: carDoc.id, ...carDoc.data() } as CarDataInterface);
          console.log('Updated car data:', { id: carDoc.id, ...carDoc.data() });
        } else {
          setCarData(null);
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
      {carData ? (
        // Car Component
        <>
        <Helmet title={carData.carName ?? 'Car Not Found'}>
          <CarInfo carData={carData} />
          <Promo />
          <CarDatas
            OneThreeDays={carData['1-3days']}
            FourSixDays={carData['4-6days']}
            SevenThirteenDays={carData['7-13days']}
            FourteenTwentyNineDays={carData['14-29days']}
            Month={carData.Month}
            Insurance={carData.Insurance}
            Deposit={carData.Deposit}
            Age={carData.Age}
            License={carData.License}
            DailyLimit={carData['Daily-limit']}
            WeeklyLimit={carData['Weekly-limit']}
            TwoWeeksLimit={carData['two-weeks-limit']}
            MonthlyLimit={carData['Monthly-limit']}
            AnnualyLimit={carData['Annualy-limit']}
            Service={carData.Service}
            carName={carData.carName}
            ReadMoreOne={carData['Read-more1']}
            ReadMoreTwo={carData['Read-more2']}
            Booking={carData.Booking}
            pageUrl={carData.pageUrl}
          />
          <Footer />
        </Helmet> 
      </>
      ) : (
        <p className='mt-[400px] text-[64px] text-center text-white'>Loading...</p>
      )}
    </div>
  );
};

export default SingleCar;