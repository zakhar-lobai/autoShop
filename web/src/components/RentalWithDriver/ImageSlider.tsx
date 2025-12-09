import React, { CSSProperties, MouseEventHandler } from "react";
import Slider from "react-slick";
import BlackBg from "../../assets/images/ImageSlider/black.webp";
import Img1 from "../../assets/images/rent-with-driver/1.jpg";  
import Img2 from "../../assets/images/rent-with-driver/2.jpg";
import Img3 from "../../assets/images/rent-with-driver/3.jpg";
import Img4 from "../../assets/images/rent-with-driver/4.jpg";
import Img5 from "../../assets/images/rent-with-driver/5.jpg";
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
  linkText: string;
  linkUrl: string;
  imgMob: string;
}

const SliderElement: React.FC<SliderElementProps> = ({ imgSrc, title, linkText, linkUrl, imgMob }) => {
  return (

        <div className="md:text-left text-white">
            
            <div className="px-10 flex flex-col justify-center bg-cover bg-center md:hidden h-90vw" style={{ backgroundImage: `url(${imgMob})` }}> 
                <h1 className="text-22 pb-20 md:text-45 font-semibold md:pb-30 mx-20">{title}</h1>
                
                    <a href={linkUrl} className="mx-20 mt-15">
                        <button className="w-full bg-yellow border-yellow border-w1 text-black font-bold py-15 md:px-35px  transition-transform duration-400 cursor-pointer md:mt-15 " style={{ transform: "skew(-20deg, 0deg)" }}>
                            <div>{linkText}</div>
                        </button>
                    </a>
                
            </div>
            
            <div className="text-center hidden md:flex flex-col justify-center bg-cover bg-center hidden md:pl-120px md:h-48vw" style={{ backgroundImage: `url(${imgSrc})` }}> 
                <h1 className="w-full text-22 md:text-45 font-semibold md:pb-30">{title}</h1>
                
                <div className="flex w-full mt-20 justify-center">

                    <a href={linkUrl}>
                        <button className="w-full bg-yellow border-yellow border-w1 text-black font-bold py-15 md:px-35px  transition-transform duration-400 cursor-pointer md:mt-15 " style={{ transform: "skew(-20deg, 0deg)" }}>
                            <div>{linkText}</div>
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
        imgSrc={Img1}
        imgMob={Img1} 
        title="Premium car hire with driver"
        linkText="Check the offer"
        linkUrl="#services"
      />
      <SliderElement
        imgSrc={Img2}
        imgMob={Img2}
        title="Premium minivan hire with a driver"
        linkText="Check the offer"
        linkUrl="#services"
      />
    <SliderElement
        imgSrc={Img3}
        imgMob={Img3}
        title="Airport transfers with pick-up service"
        linkText="Check the offer"
        linkUrl="#services"
      />
      <SliderElement
        imgSrc={Img4}
        imgMob={Img4}
        title="Corporate Travel"
        linkText="Check the offer"
        linkUrl="#services"
      />
      <SliderElement
        imgSrc={Img5}
        imgMob={Img5}
        title="Wedding car hire"
        linkText="Check the offer"
        linkUrl="#services"
      />
      
    </Slider>
  );
};

export default ImageSlider;
