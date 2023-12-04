import React from 'react'
import Img from "../../assets/images/rent-with-driver/our-driver.jpg"

const OurDrivers = () => {
    return (
        <div className="mt-100 px-0 mt-30 text-white pl-15 pr-15 md:px-15 md:mt-70 lg:px-15">
            <div className="xl:w-desk mt-100 md:mt-0 mx-auto mb-15 md:mb-0 text-white">

                <div className="flex flex-col pb-35px md:flex-row md:pb-85px">

                    {/* Text Side */}
                    <div className='md:w-50'>
                        {/* Heading */}
                        <h1 className="mb-5 md:mb-15 text-22 md:text-35 text-left font-bold leading-10 md:mt-0">
                            Our Drivers
                        </h1>
                        <div className="w-125 h-4 bg-primary" />

                        {/* Text  */}
                        <p className="text-white text-left mt-20 md:font-base text-base leading-p-base mb-30 md:w-85p md:mt-45">
                            Cars are a genuine passion for many people, and this passion does
                            not fade with age – on the contrary, the more we use cars, the
                            higher our expectations regarding the vehicle we drive. If you are
                            an enthusiast of luxury cars, we have great news for you. Our
                            premium car rental service in Warsaw offers premium cars of the
                            top brands, such as BMW, Mercedes-Benz, Audi or Lexus, for both
                            short-term and long-term rental.
                        </p>
                        <p className="text-white text-left md:font-base text-base leading-p-base mb-30 md:w-85p">
                            Sounds good? Check out our offering of premium car rental in
                            Warsaw for an unforgettable experience thanks to the cars
                            available in our fleet. Don’t hesitate! Book now for an exclusive
                            experience at an affordable price.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="w-full md:w-50">
                        <img src={Img} alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OurDrivers