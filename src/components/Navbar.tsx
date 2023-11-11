import React, { useState } from "react";
import Logo from "../assets/images/Logo.svg";
import Email from "../assets/icons/email.svg";
import Phone from "../assets/icons/phone.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";
{/* import Bars from "../assets/icons/burger.svg";
import X from "../assets/icons/close-icon.svg"; */}

const Navbar = () => {
  let Links = [
    { name: "Our fleet", link: "/our-fleet" },
    { name: "Rental with a driver", link: "/" },
    { name: "Special offers", link: "/" },
    { name: "Services", link: "/" },
    { name: "Contact", link: "/" },
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className="bg-black w-full fixed top-0 left-0">
      <div className="md:flex xl:w-desk mx-auto items-center justify-between py-4 md:px-10 px-15">
        {/* logo section */}
        <div className="logo">
          <a href="/"><img src={Logo} alt="" /></a>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="text-white text-25 absolute right-8 top-8 cursor-pointer md:hidden "
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
        {/* link items */}
        <ul
          className={`burger-drop bg-black  md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 md:pl-9 transition-all duration-500 ease-in ${
            open ? "h-screen" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-20 md:my-0 my-7 font-semibold">
              <a
                href={link.link}
                className="text-base text-white uppercase underline-custom"
              >
                {link.name}
              </a>
            </li>
          ))}
          <Button />
          <div className="flex justify-center mt-20 md:ml-20 md:mt-0 space-x-10">
            <a href="mailto:lobai.zakhar@gmail.com">
              <img src={Email} alt="email" />
            </a>
            <a href="tel:+1000000000">
              <img src={Phone} alt="phone" />
            </a>
          </div>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;