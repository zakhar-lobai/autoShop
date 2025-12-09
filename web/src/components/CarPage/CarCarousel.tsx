import React, { useState } from 'react';
import Slider from 'react-slick';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageSliderProps {
  cars: Array<{
    // your other car properties
    images: string[];
  }>;
}

const CarCarousel: React.FC<ImageSliderProps> = ({ cars }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (current: number, next: number) => setMainImageIndex(next),
  };

  return (
    <div>
      <Slider {...settings}>
        {cars.map((car, index) => (
          <div key={index}>
            <img src={car.images[0]} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className="thumbnail-slider">
        <Slider 
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={5}
          slidesToScroll={1}
          focusOnSelect={true}
          centerMode={true}
          centerPadding={'0'}
        >
          {cars.map((car, index) => (
            <div key={index} className={index === mainImageIndex ? 'slick-current' : ''}>
              <img src={require(`../../assets/images/car-cards/${car.images}`)} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarCarousel;
