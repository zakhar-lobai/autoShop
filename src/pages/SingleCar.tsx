import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface CarDataInterface {
    id?: string;
    carName?: string;
    carId?: string;
    Fuel?: string;
  }
  
  interface SingleCarProps {
    carId: string;
  }

  const SingleCar: React.FC<SingleCarProps> = ({ carId }) => {
    const [carData, setCarData] = useState<CarDataInterface | null>(null);
  
    useEffect(() => {
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
        <>
          {/* No need for a key here since you're not mapping over an array */}
          <h2 className='mt-[400px] text-[64px] text-center'>{carData.carName}</h2>
        </>
      ) : (
        <p className='mt-[400px] text-[64px] text-center'>Loading...</p>
      )}
      </div>
      
    );
  };

  
  export default SingleCar;