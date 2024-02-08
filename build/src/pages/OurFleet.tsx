import React, { useEffect, useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

import Helmet from "../components/Helmet";
import CarItem from "../components/OurFleet/CarItem";
import SpecialOffers from "../components/OurFleet/SpecialOffers";
import About from "../components/Home/About";
import Footer from "../components/Footer";

interface Car {
  carId?: string;
  id?: string;
  Fuel?: string;
  Features?: string[];
  Engine?: string;
  images?: string[];
  carName?: string;
  pageUrl?: string;
  Year?: number;
  Transmission?: string;
  Price?: string;
  Booking?: string;
}

const OurFleet: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsCollection = collection(db, 'cars');
        const carsSnapshot = await getDocs(carsCollection);
        const carsData = carsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Car));
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Helmet title="BlackCars - Our Fleet">
      <div className="mt-100 px-0 mt-30 text-white pl-15 pr-15 md:mt-70 md:px-15">
        <div className="xl:w-desk mt-120px mx-auto mb-15 md:mb-0 text-white">
          {/* Special Offers */}
          <SpecialOffers />

          {/* Car Items */}
          <CarItem/>
          
        </div>
      </div>
      <About />
      <Footer />
    </Helmet>
  );
};

export default OurFleet;
