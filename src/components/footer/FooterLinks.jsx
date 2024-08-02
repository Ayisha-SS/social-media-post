import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiThreadsFill } from "react-icons/ri";

function FooterLinks() {
  return (
    <div className='flex flex-wrap items-center justify-between'>
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
        <div></div>
    </div>
  )
}

export default FooterLinks