import React from "react";
import Img from "../../assets/images/contact-img.webp";

const GetKnow = () => {
  return (
    <div className="mt-50px px-0 text-white pl-15 pr-15 md:pt-72px md:px-15">
      <div className="xl:w-desk mx-auto">
        <div className="flex flex-col-reverse pb-35px md:flex-row md:pb-85px">
          <div className="w-full md:w-50">
            <img src={Img} alt="" />
          </div>
          <div className="w-full md:w-50 md:pl-30">
            <h2 className="mb-20 text-22 md:text-35 text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-38 md:mt-0">
              Get to know us
            </h2>
            <p className="text-white text-left md:font-medium text-base leading-p-base mb-30">
              Cars are a genuine passion for many people, and this passion does
              not fade with age – on the contrary, the more we use cars, the
              higher our expectations regarding the vehicle we drive. If you are
              an enthusiast of luxury cars, we have great news for you. Our
              premium car rental service in Warsaw offers premium cars of the
              top brands, such as BMW, Mercedes-Benz, Audi or Lexus, for both
              short-term and long-term rental.
            </p>
            <p className="text-white text-left md:font-medium text-base leading-p-base mb-30">
              Sounds good? Check out our offering of premium car rental in
              Warsaw for an unforgettable experience thanks to the cars
              available in our fleet. Don’t hesitate! Book now for an exclusive
              experience at an affordable price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetKnow;
