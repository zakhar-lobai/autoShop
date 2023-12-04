import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet";
import CarItem from "../components/OurFleet/CarItem";
import CommonSection from "../components/UI/CommonSection";
import carData from "../assets/data/carData";
import CarCard from "../components/Home/CarCard/CarCard";
import SpecialOffers from "../components/OurFleet/SpecialOffers";
import About from "../components/Home/About";
import Footer from "../components/Footer";

const OurFleet = () => {

  return (
    <Helmet title="BlackCars - Our Fleet">
      <div className="mt-100 px-0 mt-30 text-white pl-15 pr-15 md:mt-70 md:px-15">
        <div className="xl:w-desk mt-120px mx-auto mb-15 md:mb-0 text-white">

          {/* Special Offers */}
          <SpecialOffers />

          {/* Car Items */}
            <CarItem />
          
          
        </div>
      </div>

      <About />
      <Footer />
    </Helmet>
  );
};

export default OurFleet;
