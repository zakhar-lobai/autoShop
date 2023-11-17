import React from "react";
import Pin from "../../assets/icons/pin.webp";
import Phone from "../../assets/icons/phone.svg";
import Email from "../../assets/icons/email.svg";
import File from "../../assets/icons/file.svg";
import Instagram from "../../assets/images/instagram.webp";
import Facebook from "../../assets/images/facebook.webp";

const Map = () => {
  return (
    <div className="mt-100 pt-30 px-0 text-white pl-15 pr-15 md:pt-72px md:px-15">
      <div className="xl:w-desk mx-auto mb-15 md:mb-0">
        <h2 className="mb-15 text-22 md:text-35 text-left font-bold leading-10">
          Contact details
        </h2>
        <div className="w-85px h-4 bg-primary"></div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full pr-15  flex flex-col pt-35px gap-20 md:pr-100 md:w-1/2 ">
            <div className="flex float-left">
              <img className="object-contain pr-30" src={Pin} alt="Location" />
              <p className="text-base text-white text-left">
                <b>Car collection:</b> Bokserska 64/127, 02-690 Warszawa
              </p>
            </div>
            <div className="flex float-left">
              <img
                className="object-contain pr-30"
                src={Phone}
                alt="Phone Number"
              />
              <a
                href="tel:+17777777"
                className="text-base text-white text-left"
              >
                +48 720 889 788
              </a>
            </div>
            <div className="flex float-left">
              <img className="object-contain pr-30" src={Email} alt="Email" />
              <a
                href="mailto:lobai.zakhar@gmail.com"
                className="text-base text-white text-left"
              >
                office@blackcars.pl
              </a>
            </div>
            <div className="flex float-left">
              <img className="object-contain pr-30" src={File} alt="File" />
              <a
                href="mailto:lobai.zakhar@gmail.com"
                className="text-base text-white text-left"
              >
                To see the incorporation details of the owner of the
                blackcars.pl brand, click{" "}
                <span className="text-yellow">download </span>incorporation
                details.
              </a>
            </div>
            <p className="text-base text-white text-left">
              Like us to receive the latest information and notices of special
              offers:
            </p>
            <div className="flex gap-20 mb-45">
              <a href="/#">
                <img src={Instagram} alt="Instagram" />
              </a>
              <a href="/#">
                <img src={Facebook} alt="Facebook" />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <iframe
              title="Your IFrame"
              width="100%"
              height="340"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1259.2939465324532!2d20.99192140400662!3d52.172718815727976!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47193367be7a0ec3%3A0x69593d5f187381d5!2sBlackCars.pl%20-%20Wynajem%20Aut%20Klasy%20Premium!5e0!3m2!1sen!2spl!4v1631533916221!5m2!1sen!2spl"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
