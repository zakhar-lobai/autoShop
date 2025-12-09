import React, { Component, CSSProperties, MouseEventHandler } from "react";
import Slider from "react-slick";

import Check from "../../assets/images/check.png"
// Icons
import Prev from "../../assets/images/before.png";
import Next from "../../assets/images/next.png";

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

const SampleNextArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    
    <div className="float-right">
      <img src={Next} alt="" onClick={onClick} className="absolute top-1/2 transform -translate-y-1/2 z-20 right-0"/>
    </div>
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (

    <div className="float-left">
      <img src={Prev} alt="" onClick={onClick} className="absolute top-1/2 transform -translate-y-1/2 z-20 left-0"/>
    </div>
  );
};
  
export default class MultipleItems extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            initialSlide: 2
          }
        },
        ]
    };
    return (
      <div className="md:hidden" >
        <Slider {...settings} className="px-25">

        {/* Extensive fleet */}
            <div className="bg-box-grey w-full pt-25 pl-20 pb-40 pr-20 h-150px md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

            <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25">
            <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Extensive fleet
            </h3>

            <p className="text-white text-left md:font-normal text-base leading-p-base">
            Our car fleet keeps growing to provide our customers with a suitable vehicle.
            </p>

            </div>
        
        
        {/* Rental WITHOUT a deposit */}
            <div className="bg-box-grey w-full pt-25 pl-20 pb-40 pr-20 h-150px md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25">
                    <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Rental WITHOUT a deposit
                </h3>
                        
                <p className=" text-white text-left md:font-normal text-base leading-p-base">
                    Pay online by credit card to rent a car without any deposit
                </p>

            </div>
        
        {/* Car delivery */}
            <div className="bg-box-grey w-full pt-25 pl-20 pb-40 pr-20 h-150px md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25">
                <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Car delivery
                </h3>

                <p className=" text-white text-left md:font-normal text-base leading-p-base">
                For your convenience, we can sign the agreement remotely and then deliver the car to you.
                </p>

            </div>

        {/* Transparent agreement */}
            <div className="bg-box-grey w-full pt-25 pl-20 pb-40 pr-20 h-150px md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25 md:pb-5">
                <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Transparent agreement
                </h3>

                <p className=" text-white text-left md:font-normal text-base leading-p-base">
                Our agreements are free from any legal loopholes or fine print.
                </p>

            </div>

        {/* Perfect cars */}
            <div className="bg-box-grey w-full pt-25 pl-20 pb-40 pr-20 h-150px md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25 md:pb-5">
                <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Perfect cars
                </h3>

                <p className=" text-white text-left md:font-normal text-base leading-p-base">
                We systematically maintain our fleet, washing and disinfecting the cars after every rental.
                </p>

            </div>

        {/* Anywhere in Canada */}
            <div className="bg-box-grey w-full pt-25 pl-20 pr-20 pb-40 h-150px md:py-25 md:pt-25 md:px-15 md:min-h-{140px} md:w-1/3">

                <h3 className="flex w-auto pb-10 text-left text-18 font-bold md:text-25 md:pb-5">
                <img className='pr-15 vertical-sub object-contain' src={Check} alt="" />Anywhere in Canada
                </h3>

                <p className=" text-white text-left md:font-normal text-base leading-p-base">
                We deliver cars all over Canada.
                </p>

            </div>

        </Slider>
      </div>
    );
  }
}