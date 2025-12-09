import React, { CSSProperties, MouseEventHandler } from "react";
import Slider from "react-slick";
import BlackBg from "../../assets/images/ImageSlider/black.webp";
import Img1 from "../../assets/images/ImageSlider/img1.png";
import Img2 from "../../assets/images/ImageSlider/img2.png";
import Img3 from "../../assets/images/ImageSlider/img3.png";
import Img4 from "../../assets/images/ImageSlider/img4.png";
import Img5 from "../../assets/images/ImageSlider/img5.png";
import Mob1 from "../../assets/images/ImageSlider/mob1.png";
import Mob2 from "../../assets/images/ImageSlider/mob2.png";
import Mob3 from "../../assets/images/ImageSlider/mob3.png";
import Mob4 from "../../assets/images/ImageSlider/mob4.png";
import Mob5 from "../../assets/images/ImageSlider/mob5.png";
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
      <img src={Next} alt="" onClick={onClick} className="absolute top-1/2 transform -translate-y-1/2 z-20 right-0 pr-20 md:pr-50px"/>
    </div>
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className="float-left">
      <img src={Prev} alt="" onClick={onClick} className="absolute top-1/2 transform -translate-y-1/2 z-20 left-0 pl-20 md:pl-50px"/>
    </div>
  );
};

const settings = {
  infinite: true,
  fade: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

interface SliderElementProps {
  imgSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  imgMob: string;
}

const SliderElement: React.FC<SliderElementProps> = ({ imgSrc, title, description, linkText, linkUrl, imgMob }) => {
  return (

        <div className="md:text-left text-white">
            
            <div className="px-10 flex flex-col justify-center bg-cover bg-center md:hidden h-90vw" style={{ backgroundImage: `url(${imgMob})` }}> 
                <h1 className="text-22 pb-20 md:text-45 font-semibold md:pb-30 mx-20">{title}</h1>
                <p className="mx-20 font-base">{description}</p>
                
                    <a href={linkUrl} className="mx-20 mt-15">
                        <button className="w-full bg-yellow border-yellow border-w1 text-black font-bold py-15 md:px-35px  transition-transform duration-400 cursor-pointer md:mt-15 " style={{ transform: "skew(-20deg, 0deg)" }}>
                            <div>{linkText}</div>
                        </button>
                    </a>
                
            </div>
            
            <div className=" hidden md:flex flex-col justify-center bg-cover bg-center hidden md:pl-120px md:h-48vw" style={{ backgroundImage: `url(${imgSrc})` }}> 
                <h1 className="w-45p text-22 md:text-45 font-semibold md:pb-30">{title}</h1>
                <p className="w-45p">{description}</p>
                <div className="flex w-full md:gap-10  mt-20 ">
                    <a href={linkUrl}>
                        <button className="w-full bg-yellow border-yellow border-w1 text-black font-bold py-15 md:px-35px  transition-transform duration-400 cursor-pointer md:mt-15 " style={{ transform: "skew(-20deg, 0deg)" }}>
                            <div>{linkText}</div>
                        </button>
                    </a>
                    <a href="tel: +1777777">
                        <button className="hidden md:block border-white border-w1 font-bold py-15 px-35px transition-transform duration-400 cursor-pointer md:mt-15" style={{ transform: "skew(-20deg, 0deg)" }}>
                            <i className="fa fa-phone"></i>
                            <div>+48 720 889 788</div>
                            </button>
                    </a>
                </div>
            </div>
        </div>

    
    
  );
}; 

const ImageSlider = () => {
  return (
    <Slider {...settings} className="mt-85px h-48vw">
      <SliderElement
        imgSrc={Img3}
        imgMob={Mob1}
        title="Premium car rental"
        description="Extensive fleet of premium cars. Best rental terms."
        linkText="Rent now!"
        linkUrl="/our-fleet"
      />
      <SliderElement
        imgSrc={Img2}
        imgMob={Mob2}
        title="Limo & chauffeur rental"
        description="Call and order a luxury ride"
        linkText="Rent now!"
        linkUrl="/our-fleet"
      />
    <SliderElement
        imgSrc={Img4}
        imgMob={Mob3}
        title="Premium minibus & chauffeur rental"
        description="Luxury Mercedes V minibus rental and trips"
        linkText="Rent now!"
        linkUrl="/our-fleet"
      />
      <SliderElement
        imgSrc={Img5}
        imgMob={Mob4}
        title="Sport car rental"
        description="Extensive fleet of premium cars. Best rental terms."
        linkText="Rent now!"
        linkUrl="/our-fleet"
      />
      <SliderElement
        imgSrc={Img1}
        imgMob={Mob5}
        title="2+1 on weekend"
        description="Rent a car on Friday until 6 pm, return it on Monday by noon and pay for two days!"
        linkText="Rent now!"
        linkUrl="/our-fleet"
      />
      
      
    </Slider>
  );
};

export default ImageSlider;
