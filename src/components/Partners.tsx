import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';


// import required modules
import { Navigation } from 'swiper/react';

// Images Import
import Img1 from "../assets/images/partners/samyoung.png";
import Img2 from "../assets/images/partners/concierge.png";
import Img3 from "../assets/images/partners/dinamo.png";
import Img4 from "../assets/images/partners/intercontinental.png";
import Img5 from "../assets/images/partners/kyivstar.png";
import Img6 from "../assets/images/partners/marykay.png";
import Img7 from "../assets/images/partners/ukrzaliz.png";
import Img8 from "../assets/images/partners/sunevents.png";
import Img9 from "../assets/images/partners/mata.png";
import Img10 from "../assets/images/partners/vpiska.png";
import Img11 from "../assets/images/partners/fozzy.png";
import Img12 from "../assets/images/partners/novapost.png";
import Img13 from "../assets/images/partners/soiitz.png";



const Partners = () => {
    return (
        <div className="px-0 mt-20 text-white pl-15 pr-15 md:mt-0 md:px-15">
            <div className="xl:w-desk mx-auto mb-15 md:mb-0">
                <h2 className="mb-25 text-22 md:text-35 text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-50px md:mt-0">
                    Our Partners
                </h2>

                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Partners