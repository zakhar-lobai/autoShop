import React, { useState } from "react";
import Logo from "../assets/images/Logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";
{/* import Burger from "../assets/icons/burger.svg";
import Close from "../assets/icons/close-icon.svg"; */}

const Navbar = () => {
  let Links = [
    { name: "Our fleet", link: "/" },
    { name: "Rental with a driver", link: "/" },
    { name: "Special offers", link: "/" },
    { name: "Services", link: "/" },
    { name: "Contact", link: "/" },
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className="bg-black w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="text-white absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
        {/* link items */}
        <ul
          className={`bg-black md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href={link.link}
                className="text-base text-white uppercase underline-custom"
              >
                {link.name}
              </a>
            </li>
          ))}
          <Button />
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;