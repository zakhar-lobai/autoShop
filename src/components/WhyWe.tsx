import React from 'react'
import Check from "../assets/images/check.png"
import WhyWeCarousel from "./WhyWeCarousel";

const WhyWe = () => {
  return (
    <div className="px-0 mt-30 text-white pl-15 pr-15 md:mt-70 md:px-15">
            <div className="xl:w-desk mx-auto mb-15 md:mb-0">
                <h2 className="mb-25 text-22 md:text-35 text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-50px md:mt-0">
                  Premium car rental service
                </h2>  
                <WhyWeCarousel /> 
                <div className='hidden md:flex flex-col gap-20'>
                
                  {/* Row 1 */}
                  <div className='flex w-full flex-col md:flex-row gap-20'>
                    
                    {/* Extensive fleet */}
                    <div className="bg-box-grey w-full pt-25 pl-20 pb-40 md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                      <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25">
                        <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Extensive fleet
                      </h3>
                    
                      <p className="text-white text-left md:font-normal text-base leading-p-base">
                        Our car fleet keeps growing to provide our customers with a suitable vehicle.
                      </p>

                    </div>

                    {/* Rental WITHOUT a deposit */}
                    <div className="bg-box-grey w-full pt-25 pl-20 pb-40 md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                      <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25">
                        <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Rental WITHOUT a deposit
                      </h3>
                    
                      <p className=" text-white text-left md:font-normal text-base leading-p-base">
                        Pay online by credit card to rent a car without any deposit
                      </p>

                    </div>

                    {/* Car delivery */}
                    <div className="bg-box-grey w-full pt-25 pl-20 pb-40 md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                      <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25">
                        <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Car delivery
                      </h3>
                    
                      <p className=" text-white text-left md:font-normal text-base leading-p-base">
                        For your convenience, we can sign the agreement remotely and then deliver the car to you.
                      </p>

                    </div>
                  </div> 
                  
                  {/* Row 2 */}
                  <div className='flex w-full flex-col md:flex-row gap-20'>
                    {/* Transparent agreement */}
                    <div className="bg-box-grey w-full pt-25 pl-20 pb-40 md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                      <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25 md:pb-5">
                        <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Transparent agreement
                      </h3>
                    
                      <p className=" text-white text-left md:font-normal text-base leading-p-base">
                        Our agreements are free from any legal loopholes or fine print.
                      </p>

                    </div>
                  
                    {/* Perfect cars */}
                    <div className="bg-box-grey w-full pt-25 pl-20 pb-40 md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                      <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25 md:pb-5">
                        <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Perfect cars
                      </h3>
                    
                      <p className=" text-white text-left md:font-normal text-base leading-p-base">
                        We systematically maintain our fleet, washing and disinfecting the cars after every rental.
                      </p>

                    </div>

                    {/* Anywhere in Canada */}
                    <div className="bg-box-grey w-full pt-25 pl-20 pb-40 md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                      <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25 md:pb-5">
                        <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Anywhere in Canada
                      </h3>
                    
                      <p className=" text-white text-left md:font-normal text-base leading-p-base">
                        We deliver cars all over Canada.
                      </p>

                    </div>

                  </div>

                </div>
            </div>
        </div>
  );
};

export default WhyWe;
