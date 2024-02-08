import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Data from database
import { db } from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";
import { RootState } from "./store/index";
import OurFleet from "./pages/OurFleet";
import Header from "./components/Navbar";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import SpecialOffer from "./pages/SpecialOffer";
import CarDetails from "./pages/CarPage";
import CarPage from "./pages/CarPage";
import CarBooking from "./pages/CarBooking";
import RentalWithDriver from "./pages/RentalWithDriver";
import SingleCar from "./pages/SingleCar";

interface CarType {
  id?: string;
  '1-3days'?: string;
  '4-6days': string;
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

function App() {
  const [cars, setCars] = useState<CarType[]>([]);

  const fetchCars = async () => {
    const carsCollection = collection(db, 'cars');
    const carsSnapshot = await getDocs(carsCollection);
    return carsSnapshot.docs.map((doc) => ({ carId: doc.id, ...doc.data() } as CarType));
  };

  useEffect(() => {
    fetchCars().then((data) => setCars(data));
  }, []);

  return (
    <div className="App">
      <Header />

      {/* Define routes */}
      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/our-fleet" element={<OurFleet />} />
          <Route path="/rent-with-driver" element={<RentalWithDriver />} />
          <Route path="/special-offer" element={<SpecialOffer />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/:slug" element={<CarPage />} />
          <Route path="/:slug/booking" element={<CarBooking />} />
          {cars.map((car) => (
            <Route
              key={car.carId}
              path={car.pageUrl}
              element={<SingleCar carId={car.carId} />}
            />
          ))}
        </Routes>
      </main>
    </div>
    
  );
}

const SingleCarWrapper: React.FC<{ car: CarType }> = ({ car }) => {
  return <SingleCar carId={car.carId} />;
};

export default App;