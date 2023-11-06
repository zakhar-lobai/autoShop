import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/footer.css";
import MasterCard from "../assets/icons/mastercard.png";
import Visa from "../assets/icons/visa.png";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="pl-0 pr-0">
        <div className="border-t-w05 border-b-w05 border-greyc pt-45 pb-30 pl-15 pr-15 md:pt-30 pr-100 pb-45 pl-100 md:pt-30 pb-45 md:px-15">
          <div className="flex flex-col md:flex-row xl:w-desk mx-auto md:flex-no-wrap md:space-between">
            <div className="w-full md:w-41">
              <div className="footer_content text-left ">
                <h5 className="mb-15 text-xl  font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-30">
                  About us
                </h5>
                <p className="md:font-medium text-base leading-p-base w-97">
                  We provide access to a wide fleet of diverse premium cars. We
                  also offer many different services connected with transport
                  using cars or minibuses. We are not limited by a constant
                  fleet of cars and range of services – we keep growing so that
                  the Customer can be fully satisfied with their cooperation
                  with our rental service.
                </p>
              </div>
            </div>

            <div className="w-full mt-30 ml-0 md:w-1/6 md:ml-three md:mt-0">
              <div className="footer_content text-left">
                <h5 className="mb-15 text-xl font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-30 mt-0">
                  Menu
                </h5>
                <ul className="text-base">
                  <li className="mt-0">
                    <a href="/our-fleet">Our fleet</a>
                  </li>
                  <li className="mt-15">
                    <a href="/blog">Blog</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full mt-30 ml-0 md:w-1/6 md:mt-0 md:ml-four">
              <div className="footer_content text-left ">
                <h5 className="mb-15 text-xl font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-30 md:mt-0">
                  Information
                </h5>
                <ul className="text-base">
                  <li className="mt-0">
                    <a href="/contact">Contact</a>
                  </li>
                  <li className="mt-15">
                    <a href="/terms-and-conditions">
                      Terms and conditions of the website
                    </a>
                  </li>
                  <li className="mt-15">
                    <a href="/privacy-policy">Privacy policy</a>
                  </li>
                  <li className="mt-15">
                    <a href="/rental-agreement">Rental agreement</a>
                  </li>
                  <li className="mt-15">
                    <a href="/rental-terms">Rental terms</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full mt-30 ml-0 md:w-1/6 md:mt-0 md:mb-0 md:ml-four">
              <div className="footer_content text-left">
                <h5 className="mb-15 text-xl font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-30 md:mt-0">
                  Contact
                </h5>
                <ul className="text-base">
                  <li className="mt-0">
                    <a href="tel:+48729889788" className="font-normal">
                      +48 720 889 788
                    </a>
                  </li>
                  <li className="mt-15">
                    <a href="email:office@blackcars.pl" className="font-normal">
                      office@blackcars.pl
                    </a>
                  </li>
                  <li className="mt-15 mb-20">
                    Bokserska 64/127,<br></br>02-690 Warszawa
                  </li>
                </ul>
                <ul className="footer_social_links flex">
                  <li className="pt-1 pr-1 ">
                    <a
                      href="https://www.instagram.com/blackcars.pl/"
                      rel="noreferrer"
                      target="_blank"
                      className="social_icon"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                  <li className="pt-1 pr-1">
                    <a
                      href="https://www.facebook.com/blackcarspl/"
                      rel="noreferrer"
                      target="_blank"
                      className="social_icon"
                    >
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                  </li>
                  <li className="pt-1 pr-1">
                    <a
                      href="https://wa.me/+48720889788"
                      rel="noreferrer"
                      target="_blank"
                      className="social_icon"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex py-11 px-15 w-full">
            <div className="flex w-full xl:w-desk mx-auto space-between">
              <div className="w-3/4 flex text-left align-center md:w-1/2 ">
                <p>
                  © 2023 All rights reserved. Design by –{" "}
                  <a href="https://https://www.kadmix.pl/">Kadmix</a>
                </p>
              </div>
              <div className="w-1/4 md:w-1/2 flex flex-col md:flex-row justify-end pl-5">
                <img
                  src={Visa}
                  alt="Visa"
                  className="object-cover h-auto mb-3 md:mr-3 md:mb-0"
                />
                <img
                  src={MasterCard}
                  alt="MasterCard"
                  className="object-cover h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
