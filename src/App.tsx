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


/ Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAVWzHHDk2qI0mQGuHXm5qa3Sqpo_J_Uc",
  authDomain: "blackcars-21f5f.firebaseapp.com",
  projectId: "blackcars-21f5f",
  storageBucket: "blackcars-21f5f.appspot.com",
  messagingSenderId: "872415723478",
  appId: "1:872415723478:web:2c872684a23bf1a6ba6e77",
  measurementId: "G-690BZQQZQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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