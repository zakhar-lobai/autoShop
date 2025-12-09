import React from 'react'
import { Link } from 'react-router-dom';
import CommonSection from '../UI/CommonSection';
import img from "../../assets/images/our-fleet/special-offers.png";

const SpecialOffers = () => {
  return (
    <> 
        <div className='hidden md:block'>
            <CommonSection title={"Special Offers"} />
            
            <div className='relative md:mt-40'>
                <picture>
                    <img className='w-full h-auto' src={img} alt="" />
                </picture>
                <h3 className='absolute w-full text-left text-18 font-bold text-25 pb-10 md:block md:left-[3%] md:top-[17%]'>Fuel Tank Free, 2+1 for weekend</h3>
                <div className="absolute w-140px h-4 bg-primary md:block md:left-[3%] md:top-[35%]"></div>

                <Link to="/special-offer" className='absolute bg-yellow color-base md:mt-12 py-20 md:px-30 inline-block transition duration-300 ease-in-out hover:bg-btn-hover hover:border-yellow hover:color-base md:left-[3%] md:top-[50%]'>
                    <button className='text-base text-base font-bold '>Find out more</button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default SpecialOffers