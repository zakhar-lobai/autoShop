import React from 'react'
import cardata from "./cardata.json";

const CarCard = () => {
    return (
        <div className="px-0 mt-100 text-white pt-25 pl-15 pr-15 md:pt-30 md:px-15">
            <div className="xl:w-desk mx-auto">
                <h2 className="mb-30 text-22 md:text-35 text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-30 md:mt-0">
                    Rent Now
                </h2>
                <div className='flex flex-col gap-40'>
                    {cardata.cars.map((car, index) => (
                        <div key={index} className='flex flex-col md:flex-row w-full bg-box-grey'>
                            <div className='w-full md:w-1/3'>
                                <a href={car['page-url']}>
                                    <img src={car.img} alt={car.name} />
                                </a>
                            </div>

                            <div className='w-full md:w-1/2 md:pt-30 md:pb-45 pl-25 pr-25 md:pr-20'>
                                <h3 className='w-full text-left text-18 font-bold text-25 pb-10'>{car.name}</h3>
                                <div className="w-85px h-4 bg-primary"></div>
                                <div className='flex flex-row flex-wrap mt-20 md:mt-10 gap-15 md:mt-40 md:gap-10'>
                                    <p className='pl-12 md:pl-10 md:pr-5  border-l-4 border-yellow'>{car.year}</p>
                                    <p className='pl-12 md:px-10 border-l-4 border-yellow'>{car.transmission}</p>
                                    <p className='pl-12 2md:px-10 border-l-4 border-yellow'>{car.engine}</p>
                                    <p className='pl-12 md:px-10 border-l-4 border-yellow'>{car.fuel}</p>
                                    {car.features.map((feature, index) => (
                                        <p key={index} className='pl-12 hidden md:flex md:px-10 border-l-4 border-yellow'>
                                            {feature}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className='w-full pt-10 md:w-16per md:pt-30 pl-15 pr-15 pb-30 md:pl-0'>
                                <h4 className='text-yellow font-bold mb-15 md:float-left text-21 md:mb-55px'>{car.price}</h4>
                                <a href={car['page-url']} className='border border-white w-full py-20 inline-block mb-20 transition duration-300 ease-in-out md:mb-0 hover:bg-yellow hover:border-yellow hover:color-base'>
                                    <button className='text-white text-base font-bold '>Find out more</button>
                                </a>
                                <a href={car['page-url']} className='bg-yellow color-base md:mt-12 w-full py-20 inline-block transition duration-300 ease-in-out hover:bg-btn-hover hover:border-yellow hover:color-base'>
                                    <button className='text-white text-base font-bold '>Book</button>
                                </a>
                            </div>
                        </div>
                    ))}
                    
                </div>
                <a href="/our-fleet" className='bg-yellow color-base md:mt-50px md:w-130px md:py-20 inline-block transition duration-300 ease-in-out hover:bg-btn-hover hover:border-yellow hover:color-base hover:text-white'>
                    <button className='text-base text-base font-bold '>See all cars</button>
                </a>
            </div>
        </div>
    )
}

export default CarCard