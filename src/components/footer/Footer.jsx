import React from 'react'
import FooterLogo from './FooterLogo';
import FooterLinks from './FooterLinks';

import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiThreadsFill } from "react-icons/ri";

function Footer() {
    return (
        <div className='flex fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-500 '>
            <div className='wrapper py-6 flex justify-between items-center'>
                
                {/* <FooterLogo /> */}
                <div>
                    <ul className='flex gap-3 text-sm text-white mr-20'>
                        <li className='hover:-translate-y-1'><a href="#">Home</a></li>
                        <li className='hover:-translate-y-1'><a href="#">About Us</a></li>
                        <li className='hover:-translate-y-1'><a href="#">Settings</a></li>
                        <li className='hover:-translate-y-1'><a href="#">Security</a></li>
                    </ul>
                </div>
                <div>
                    <ul className='flex gap-3 text-sm text-white'>
                        <li className='hover:text-base hover:-translate-y-1'><a href="#"><FaFacebookSquare /></a></li>
                        <li className='hover:text-base hover:-translate-y-1'><a href="#"><FaWhatsapp /></a></li>
                        <li className='hover:text-base hover:-translate-y-1'><a href="#"><BsTwitterX /></a></li>
                        <li className='hover:text-base hover:-translate-y-1'><a href="#"><RiThreadsFill /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;