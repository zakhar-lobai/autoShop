import React from "react";
import { Link } from 'react-router-dom';
import cardata from "../CarPage/data.json";
import CommonSection from "../UI/CommonSection";
import Helmet from "../Helmet";

interface CarItemProps {
  item: {
    id?: number;
    images?: string;
    name?: string;
    year?: number;
    transmission?: string;
    engine?: string;
    fuel?: string;
    features?: string[];
    price?: string;
    pageurl?: string;
    book?: string;
  };
}
  
const CarItem = () => {
  return (
    <div className="px-0 mt-30 text-white pl-15 pr-15 md:mt-0 md:px-0">
      <div className="mt-120px xl:w-desk mx-auto mb-15 md:mb-0 text-white md:mt-0">
        <CommonSection title={"Our Fleet"} />
        <div className="flex flex-col gap-40 md:mt-30">
          {cardata.cars.map((car, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full bg-box-grey"
            >
              {/* Car Image (Left Section) */}
              <div className="w-full md:w-1/3">
                <Link to={car.pageUrl}>
                  <a href={car.pageUrl}>
                    <img
                      className="h-[200px] md:h-full object-center object-cover w-full"
                      src={require(
                        `../../assets/images/our-fleet/${car.images}`,
                      )}
                      alt={car.name}
                    />
                  </a>
                </Link>
              </div>

              {/* Car Info (Center Section) */}
              <div className="w-full md:w-1/2 pt-30 md:pb-45 pl-25 pr-25 md:pr-20">
                <h3 className="w-full text-left text-18 font-bold text-25 pb-10">
                  {car.name}
                </h3>
                <div className="w-85px h-4 bg-primary"></div>
                <div className="flex flex-row flex-wrap mt-20 md:mt-10 gap-15 md:mt-40 md:gap-10">
                  <p className="pl-12 md:pl-10 md:pr-5  border-l-4 border-yellow">
                    {car.year}
                  </p>
                  <p className="pl-12 md:px-10 border-l-4 border-yellow">
                    {car.transmission}
                  </p>
                  <p className="pl-12 2md:px-10 border-l-4 border-yellow">
                    {car.engine}
                  </p>
                  <p className="pl-12 md:px-10 border-l-4 border-yellow">
                    {car.fuel}
                  </p>
                  {car.features.map((feature, index) => (
                    <p
                      key={index}
                      className="pl-12 hidden md:flex md:px-10 border-l-4 border-yellow"
                    >
                      {feature}
                    </p>
                  ))}
                </div>
              </div>

              {/* Price, CarPage Button, Book Button (Right Section) */}
              <div className="w-full pt-10 md:w-16per md:pt-30 pl-15 pr-15 pb-30 md:pl-0">
                <h4 className="text-yellow font-bold mb-[25px] md:float-left text-21 mt-[15px] mt-0 md:mb-55px">
                  {car.price}
                </h4>

                {/* Car Page Button */}
                <Link
                  to={car.pageUrl}
                  className="border border-white w-full py-20 inline-block mb-20 transition duration-300 ease-in-out md:mb-0 hover:bg-yellow hover:border-yellow hover:color-base"
                >
                  <button className="text-white text-base font-bold ">
                    Find out more
                  </button>
                </Link>

                {/* Book Car Button */}
                <Link
                  to={car.book}
                  className="bg-yellow color-base md:mt-12 w-full py-20 inline-block transition duration-300 ease-in-out hover:bg-btn-hover hover:border-yellow hover:color-base"
                >
                  <button className="text-white text-base font-bold ">
                    Book
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarItem;
