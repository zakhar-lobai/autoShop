import React from 'react'
import { Link } from 'react-router-dom';
import OurFleet from '../../pages/OurFleet';

const Promo = () => {
    return (
        <div className="px-0 mt-50px text-white pt-25 pl-15 pr-15 md:mt-[70px] md:px-15">
            <div className="xl:w-desk mx-auto">
                <div className='bg-singlecar-promo bg-cover flex gap-[10px] py-[40px] pl-[6%]'> 
                    <div className='flex items-center'><p className='border-l-4 border-yellow text-[25px] font-semibold md:pl-[15px] md:mr-[40px]'>Fuel Tank Free</p></div>
                    <div className='flex items-center'><p className='border-l-4 border-yellow text-[25px] font-semibold md:pl-[15px] md:mr-[40px]'>2+1 for weekend</p></div>
                    
                    <div>
                        <a href="/our-fleet" className='text-black pointer bg-yellow color-base md:px-[50px] text-base text-base font-bold py-[10px] inline-block transition duration-300 ease-in-out hover:bg-btn-hover hover:border-yellow hover:color-base hover:text-white'>Find out more</a>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Promo