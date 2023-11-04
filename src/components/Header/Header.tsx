import React, { useState } from 'react';
import Button from './Button';
import Logo from '../../assets/images/Logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons
import Email from '../../assets/icons/email.svg';
import Phone from '../../assets/icons/phone.svg';
import "../../styles/header.css";

const Nav = () => {
  const Links = [
    { name: "Our fleet", link: "/" },
    { name: "Rental with a driver", link: "/" },
    { name: "Special offers", link: "/" },
    { name: "Services", link: "/" },
    { name: "CONTACT", link: "/" },
  ];

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={`header ${open ? 'open' : ''}`}>
      <div className='header_inner'>
        <div className="box">
          <div className='font-bold text-2xl max-w-xs cursor-pointer flex items-center font-Poppins text-gray-800'>
            <img src={Logo} alt="Black Cars" />
          </div>
          <div className="left-menu flex">
            <button className="menu-toggle" onClick={toggleMenu}>
              {open ? <FaTimes /> : <FaBars />} {/* Use react-icons */}
            </button>
          </div>
        </div>
      </div>
      <nav className={`nav_menu ${open ? 'open' : ''}`}>
        <ul>
          {Links.map((link, index) => (
            <li key={index}>
              <a href={link.link} className='text-white uppercase underline-custom'>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <Button />
        <div className='cursor-pointer pr-nm flex'>
          <button>
            <img src={Email} alt="Email" />
          </button>
        </div>
        <div className='cursor-pointer flex'>
          <button>
            <img src={Phone} alt="Phone" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
