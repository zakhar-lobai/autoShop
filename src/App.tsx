import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";
import { RootState } from "./store/index";
import { Route, Routes } from "react-router-dom";

// Pages Import
import OurFleet from "./pages/OurFleet";
import Header from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SpecialOffer from "./pages/SpecialOffer";
import CarDetails from "./pages/CarPage";
import CarPage from "./pages/CarPage";
import CarBooking from "./pages/CarBooking";
import RentalWithDriver from "./pages/RentalWithDriver";
import Login from "./pages/Login";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import AuthForm from "./components/AutForm";



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
          <Route path="/login" element={<Login/>} />
          <Route path="sign-up" element={<SignUp/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/authorization" element={<AuthForm />} />
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