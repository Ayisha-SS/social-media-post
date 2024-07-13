import React, { useEffect, useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import img1 from "../../../assets/img-1.jpg"
import { useParams } from 'react-router-dom';
import axios from 'axios';

function View() {

  const [views,setViews] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/posts/view/${id}/`);
        setViews(response.data.data);
      } catch(error) {
        console.error('Error fetching the post:',error)
      }
    };
    fetchPost();
  },[id]);

  if (!views) {
    return <div>Loading...</div>
  }

  return (
    <div className='wrapper py-16'>
        <div className='flex flex-col py-2 w-full items-start h-auto border border-slate-300 p-2'>
        <div className='flex items-center gap-5'>
          <span className=''><FaRegCircleUser size={50}/></span>
          <span>
            <h3 className='text-2xl font-medium'>{views.created_by}</h3>
            <h5 className='text-base font-normal'>{views.category}</h5>
          </span>
        </div>
        <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
          <img src={views.image} alt={views.id} className='w-full h-full object-cover'/>
        </div>
        <div className='flex gap-3 mt-3'>
          <span><CiHeart size={30}/></span>
          <span><FaRegComment size={25}/></span>
          <span><SiSlideshare size={25}/></span>
        </div>
        <div className='flex flex-col gap-4 mt-5 w-full'>
            <span className='text-xl font-medium'>{views.title}</span>
            <span className='text-base font-normal w-full'>
              {views.description}
            </span>
        </div>
        <span className='text-sm font-normal text-slate-500 mt-5'>May 28,2024</span>
       </div>
    </div>
  )
}

export default View