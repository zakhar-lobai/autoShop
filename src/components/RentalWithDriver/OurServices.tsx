import React from 'react'

// Image Import
import img1 from "../../assets/images/rent-with-driver/services/limousine-with-driver.png";
import img2 from "../../assets/images/rent-with-driver/services/minivan.png";
import img3 from "../../assets/images/rent-with-driver/services/airport-transfer.png";
import img4 from "../../assets/images/rent-with-driver/services/corporate-travel.png";
import img5 from "../../assets/images/rent-with-driver/services/special-event.png";
import img6 from "../../assets/images/rent-with-driver/services/wedding.png";

const OurServices = () => {
    return (
        
        <div className="mt-100 px-0 mt-30 text-white pl-15 pr-15 md:px-15 md:mt-70 lg:px-15" id='services'>
            <div className="xl:w-desk mt-190 md:mt-0 mx-auto mb-15 md:mb-0 text-white">

                {/* Heading */}
                <h1 className="mb-5 md:mb-15 text-22 md:text-35 text-left font-bold leading-10 md:mt-0">
                        Our Services
                </h1>
                <div className="w-125 h-4 bg-primary" />

                {/* Text  */}
                <p className="font-base text-left my-30 lg:w-58p md:pr-10 ">
                        In our offer you will find well-known and appreciated luxury brands and models of cars-limousines, comfortable SUVs and vans. For our clients, we offer
                        <strong>premium class car hire with a top-class drivers</strong>, appreciated by users who love the combination of comfort and safety.
                        <strong> Limo & driver rental </strong>
                        or <strong>car rental for weddings</strong>,
                        are just some of the services offered by our company. 
                </p>

                {/* Serives Section */}
                <div className=" flex flex-row lg:flex-column flex-wrap lg:flex-nowrap text-center font-bold text-white text-base md:mb-50px" >
                
                    {/* Limousine */}
                    <div className="w-50 px-15 my-25 cursor-pointer md:w-1/3 lg:w-16 lg:my-50px lg:mx-10 lg:px-0">
                        <img className="lg:w-170px lg:h-170px md:mb-25" src={img1}  alt="Limousine with driver" />
                        <h2>Limousine with driver</h2>
                    </div>

                    {/* Premium Minivan */}
                    <div className="w-50 px-15 my-25 cursor-pointer md:w-1/3 lg:w-16 lg:my-50px lg:mx-10 lg:px-0">
                        <img className="lg:w-170px lg:h-170px md:mb-25" src={img2}  alt="Premium minivan hire with a driver" />
                        <h2>Premium minivan hire with a driver</h2>
                    </div>

                    {/* Airport Transfers */}
                    <div className="w-50 px-15 my-25 cursor-pointer md:w-1/3 lg:w-16 lg:my-50px lg:mx-10 lg:px-0">
                        <img className="lg:w-170px lg:h-170px md:mb-25" src={img3}  alt="Airport transfers with pick-up service" />
                        <h2>Airport transfers with pick-up service</h2>
                    </div>
                    
                    {/* Corporate Travel */}
                    <div className="w-50 px-15 my-25 cursor-pointer md:w-1/3 lg:w-16 lg:my-50px lg:mx-10 lg:px-0">
                        <img className="lg:w-170px lg:h-170px md:mb-25" src={img4}  alt="Corporate Travel" />
                        <h2>Corporate Travel</h2>
                    </div>

                    {/* Special Events */}
                    <div className="w-50 px-15 my-25 cursor-pointer md:w-1/3 lg:w-16 lg:my-50px lg:mx-10 lg:px-0">
                        <img className="lg:w-170px lg:h-170px md:mb-25" src={img5}  alt="Special events support" />
                        <h2>Special events support</h2>
                    </div>

                    {/* Wedding Car */}
                    <div className="w-50 px-15 my-25 cursor-pointer md:w-1/3 lg:w-16 lg:my-50px lg:mx-10 lg:px-0">
                        <img className="lg:w-170px lg:h-170px md:mb-25" src={img6}  alt="Wedding car hire" />
                        <h2>Wedding car hire</h2>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default OurServices