import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function App() {
  
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
          
          
        </Routes>
      </main>
    </div>
    
  );
}

export default App;

interface Car {
  id: string;
  name: string;
  // ... other properties
}