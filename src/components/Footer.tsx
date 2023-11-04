import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import "../styles/footer.css";
import MasterCard from "../assets/icons/mastercard.png"
import Visa from "../assets/icons/visa.png"

const Footer = () => {
    return (
        <footer>
            <div className="footer_container">

                <div className="footer_top">
                    <div className="footer_box">

                        <div className="about_col">
                            <div className="footer_content">
                                <h5>About us</h5>
                                <p>We provide access to a wide fleet of diverse premium cars. We also offer many different services connected with transport using cars or minibuses. We are not limited by a constant fleet of cars and range of services – we keep growing so that the Customer can be fully satisfied with their cooperation with our rental service.</p>
                            </div>
                        </div>

                        <div className="menu_col">
                            <div className="footer_content">
                                <h5>Menu</h5>
                                <ul className="footer_links">
                                    <li><a href="/our-fleet">Our fleet</a></li>
                                    <li><a href="/blog">Blog</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="information_col">
                            <div className="footer_content">
                                <h5>Information</h5>
                                <ul className="footer_links">
                                    <li><a href="/contact">Contact</a></li>
                                    <li><a href="/terms-and-conditions">Terms and conditions of the website</a></li>
                                    <li><a href="/privacy-policy">Privacy policy</a></li>
                                    <li><a href="/rental-agreement">Rental agreement</a></li>
                                    <li><a href="/rental-terms">Rental terms</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="contact_col">
                            <div className="footer_content">
                                <h5>Contact</h5>
                                <ul className="footer_links">
                                    <li><a href="tel:+48729889788"  className="contact_info">+48 720 889 788</a></li>
                                    <li><a href="email:office@blackcars.pl" className="contact_info">office@blackcars.pl</a></li>
                                    <li>Bokserska 64/127,<br></br>02-690 Warszawa</li>
                                </ul>
                                <ul className="footer_social_links">
                                    <li className="instagram">
                                        <a href="https://www.instagram.com/blackcars.pl/" rel="nofollow" target="_blank" className="social_icon" >
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </a>
                                    </li>
                                    <li className="facebook">
                                        <a href="https://www.facebook.com/blackcarspl/" rel="nofollow" target="_blank" className="social_icon" >
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </a>
                                    </li>
                                    <li className="messanger">
                                        <a href="https://wa.me/+48720889788" rel="nofollow" target="_blank" className="social_icon" >
                                            <FontAwesomeIcon icon={faWhatsapp} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="footer_bottom">
                    <div className="footer_box bottom">
                        <div className="copyrightning">
                            <p>© 2023 All rights reserved. Design by – <a href="https://https://www.kadmix.pl/">Kadmix</a></p>
                        </div>
                        <div className="payments">
                            <img src={Visa} alt="Visa" />
                            <img src={MasterCard} alt="MasterCard" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;