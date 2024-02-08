import React from 'react';
import CarDetails from './CarDetails';
import CarPageImageCarousel from './CarPageImageCarousel'; // Import ImageCarousel from the correct location

interface CarInfoProps {
  carData: {
    carName?: string;
    images?: string[];
    Year?: number;
    Transmission?: string;
    Engine?: string;
    Fuel?: string;
    Features?: string[];
    Description?: string;
    'Description-more'?: string;
  };
}

const CarInfo: React.FC<CarInfoProps> = ({ carData }) => {
  return (
    <div className="px-0 mt-50px text-white pt-25 pl-15 pr-15 md:mt-100px md:px-15">
      <div className="xl:w-desk mx-auto">
        <div className="flex flex-col pt-[40px] md:pt-[80px]">
          {/* Car Name */}
          <h2 className="mb-15 text-[26px] md:text-35 text-left font-bold leading-10">
            {carData.carName}
          </h2>
          <div className="w-85px h-4 bg-primary mb-[30px] md:mb-0"></div>

          {/* Car Details and Car Carousel */}
          <div className='flex flex-col-reverse md:flex-row'>

            {/* Car Details */}
            <CarDetails
              Year={carData.Year}
              Transmission={carData.Transmission}
              Engine={carData.Engine}
              Fuel={carData.Fuel}
              Features={carData.Features}
              Description={carData.Description}
              Description-more={carData['Description-more']}
            />

            {/* Image Carousel */}
            {carData.images && (
              <div className="md:w-1/2">
                <CarPageImageCarousel images={carData.images} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
