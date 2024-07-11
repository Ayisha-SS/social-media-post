import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import img1 from "../../../assets/img-1.jpg"

function View() {
  return (
    <div className='wrapper py-16'>
        <div className='flex flex-col py-2 w-full items-start h-auto border border-slate-300 p-2'>
        <div className='flex items-center gap-5'>
          <span className=''><FaRegCircleUser size={50}/></span>
          <span>
            <h3 className='text-2xl font-medium'>Michael Bruno</h3>
            <h5 className='text-base font-normal'>Life lover</h5>
          </span>
        </div>
        <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
          <img src={img1} alt="Image-1" className='w-full h-full object-cover'/>
        </div>
        <div className='flex gap-3 mt-3'>
          <span><CiHeart size={30}/></span>
          <span><FaRegComment size={25}/></span>
          <span><SiSlideshare size={25}/></span>
        </div>
        <div className='flex flex-col gap-4 mt-5 w-full'>
            <span className='text-xl font-medium'>Enjoy every moments</span>
            <span className='text-base font-normal w-full'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Ex id ipsum cum vero ullam vitae incidunt neque. Quo molestias 
                maiores labore velit dolores sint facere? Ratione, harum provident? 
                Nobis suscipit culpa porro voluptate aliquam? Repudiandae, minus nostrum
                consectetur aliquid tenetur eius deleniti quos! Similique eveniet quidem ad?
                Doloremque, voluptatum omnis.
            </span>
        </div>
        <span className='text-sm font-normal text-slate-500 mt-5'>May 28,2024</span>
       </div>
    </div>
  )
}

export default View