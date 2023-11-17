import React, { Component, CSSProperties, MouseEventHandler } from "react";
import Slider from "react-slick";

import Img1 from "../../assets/images/partners/samyoung.png";
import Img2 from "../../assets/images/partners/concierge.png";
import Img3 from "../../assets/images/partners/dinamo.png";
import Img4 from "../../assets/images/partners/intercontinental.png";
import Img5 from "../../assets/images/partners/kyivstar.png";
import Img6 from "../../assets/images/partners/marykay.png";
import Img7 from "../../assets/images/partners/ukrzaliz.png";
import Img8 from "../../assets/images/partners/sunevents.png";
import Img9 from "../../assets/images/partners/mata.png";
import Img10 from "../../assets/images/partners/vpiska.png";
import Img11 from "../../assets/images/partners/fozzy.png";
import Img12 from "../../assets/images/partners/novapost.png";
import Img13 from "../../assets/images/partners/soiitz.png";
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
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            initialSlide: 2
          }
        },
        ]
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="object-cover">
            <img src={Img1} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img2} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img3} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img4} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img5} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img6} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img7} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img8} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img9} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img10} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img11} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img12} alt="" />
          </div>
          <div className="object-cover">
            <img src={Img13} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}