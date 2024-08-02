import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../includes/navBar/Logo';
import Footer from '../../footer/Footer';

function View() {

  const [views, setViews] = useState(null);
  const { id } = useParams();
  const [likedPost, setLikedPost] = useState({});


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/posts/view/${id}/`);
        console.log('API Response:', response.data);
        setViews(response.data.data);
      } catch (error) {
        console.error('Error fetching the post:', error)
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = (id) => {
    setLikedPost((prevLikedPosts) => ({ ...prevLikedPosts, [id]: !prevLikedPosts[id] }));
  };

  if (!views) {
    return <div>Loading...</div>
  }

  return (
    <>
    <Helmet>
        <title>PostFun|View</title>
      </Helmet>
      <div className='py-4 border-b-4 bg-slate-200 border-b-solid border-b-purple-500 shadow-2xl'>
        <div className='wrapper'>

          <Logo />
        </div>
      </div>
        <div className='pb-10 bg-gradient-to-r from-purple-400 to-pink-200'>
      <div className='wrapper py-16 '>
        <div className='flex flex-col py-2 w-full items-start h-full border-4 border-white p-2'>
          <div className='flex items-center gap-5'>
            <span className=''><FaRegCircleUser size={50} /></span>
            <span>
              <h3 className='text-2xl font-medium'>{views.created_by}</h3>
              <h5 className='text-base font-normal'>{views.category}</h5>
            </span>
          </div>
          <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
            <img src={views.image} alt={views.id} className='w-full h-full object-cover' />
          </div>
          <div className='flex gap-3 mt-3 ml-4'>
            <span>
              <FaHeart size={25}
                style={{ fill: likedPost[id] ? 'red' : 'gray' }}
                onClick={() => handleLike(id)} />
            </span>
            <span><FaRegComment size={25} /></span>
            <span><SiSlideshare size={25} /></span>
          </div>
          <div className='flex flex-col gap-4 mt-5 w-full'>
            <span className='text-xl font-medium'>{views.title}</span>
            <span className='text-base font-normal w-full text-justify max-[540px]:text-[14px] max-[360px]:text-[12px]'>
              {views.description}
            </span>
          </div>
          <span className='text-sm font-normal text-slate-500 mt-5'>May 28,2024</span>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default View


