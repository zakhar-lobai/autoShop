// CarDetails.tsx
import React from 'react';
import Helmet from '../Helmet';

interface CarDetailsProps {
  car: {
    id: number,
    name: string;
    year: number;
    images: string;
    transmission: string;
    engine: string;
    fuel: string;
    features:string[];
    helmet: string;
  };
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <Helmet title={car.helmet}>
    <div className="bg-white p-4 shadow-md rounded-md mt-100">
      <img src={car.images} alt={`${car.name} ${car.name}`} className="mb-4 rounded-md" />
      <h2 className="text-2xl font-bold mb-2">{car.name} {car.name}</h2>
      <p className="text-lg mb-2">Year: {car.year}</p>
      {/* Display other car details from the JSON */}
    </div>
    </Helmet>
  );
};

export default CarDetails;
