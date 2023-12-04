import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet";
import Footer from "../components/Footer";
import cardata from "../components/CarPage/data.json";
import CarCard from "../components/Home/CarCard/CarCard";
import CarDetails from "../components/CarPage/CarDetails";


const CarPage = () => {

  return (
    <div>
      {cardata.cars.map((car, index) => (
        <div key={index}>

        </div>
      ))}
      <Footer />
    </div>
  );
};

export default CarPage;
