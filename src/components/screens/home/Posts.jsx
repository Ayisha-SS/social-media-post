import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import img1 from "../../../assets/img-1.jpg"
import img2 from "../../../assets/img-2.jpg"
import img3 from "../../../assets/img-3.jpg"
import img4 from "../../../assets/img-4.jpg"

function Posts() {
  return (
    <div className='wrapper py-16 grid grid-cols-1 sm:grid-cols-2  gap-5 items-center justify-center '>
       <div className='flex flex-col py-2 w-full  items-start h-[500px] p-2'>
        <div className='flex items-center gap-5'>
          <span className=''><FaRegCircleUser size={50}/></span>
          <span>
            <h3 className='text-2xl font-medium'>Michael Bruno</h3>
            <h5 className='text-base font-normal'>Life lover</h5>
          </span>
        </div>
        <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
          <Link to='/view'>
            <img src={img1} alt="Image-1" className='w-full h-full object-cover'/>
          </Link>
        </div>
        <div className='flex gap-3 mt-3'>
          <span><CiHeart size={30}/></span>
          <span><FaRegComment size={25}/></span>
          <span><SiSlideshare size={25}/></span>
        </div>
        <span className='text-xl font-normal'>Enjoy every moments</span>
       </div>


       <div className='flex flex-col py-2 w-full  items-start h-[500px] p-2'>
        <div className='flex items-center gap-5'>
          <span className=''><FaRegCircleUser size={50}/></span>
          <span>
            <h3 className='text-2xl font-medium'>Michael Bruno</h3>
            <h5 className='text-base font-normal'>Life lover</h5>
          </span>
        </div>
        <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
          {/* <img src="src/assets/img-1.jpg" alt="Image-1" /> */}
          <img src={img2} alt="Image-1" className='w-full h-full object-cover'/>
        </div>
        <div className='flex gap-3 mt-3'>
          <span><CiHeart size={30}/></span>
          <span><FaRegComment size={25}/></span>
          <span><SiSlideshare size={25}/></span>
        </div>
        <span className='text-xl font-normal'>Enjoy every moments</span>
       </div>

       <div className='flex flex-col py-2 w-full items-start h-[500px] p-2'>
        <div className='flex items-center gap-5'>
          <span className=''><FaRegCircleUser size={50}/></span>
          <span>
            <h3 className='text-2xl font-medium'>Michael Bruno</h3>
            <h5 className='text-base font-normal'>Life lover</h5>
          </span>
        </div>
        <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
          {/* <img src="src/assets/img-1.jpg" alt="Image-1" /> */}
          <img src={img3} alt="Image-1" className='w-full h-full object-cover'/>
        </div>
        <div className='flex gap-3 mt-3'>
          <span><CiHeart size={30}/></span>
          <span><FaRegComment size={25}/></span>
          <span><SiSlideshare size={25}/></span>
        </div>
        <span className='text-xl font-normal'>Enjoy every moments</span>
       </div>

       <div className='flex flex-col py-2 w-full items-start h-[500px] p-2'>
        <div className='flex items-center gap-5'>
          <span className=''><FaRegCircleUser size={50}/></span>
          <span>
            <h3 className='text-2xl font-medium'>Michael Bruno</h3>
            <h5 className='text-base font-normal'>Life lover</h5>
          </span>
        </div>
        <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
          {/* <img src="src/assets/img-1.jpg" alt="Image-1" /> */}
          <img src={img4} alt="Image-1" className='w-full h-full object-cover'/>
        </div>
        <div className='flex gap-3 mt-3'>
          <span><CiHeart size={30}/></span>
          <span><FaRegComment size={25}/></span>
          <span><SiSlideshare size={25}/></span>
        </div>
        <span className='text-xl font-normal'>Enjoy every moments</span>
       </div>

    </div>
  )
}

export default Posts