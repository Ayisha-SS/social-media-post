import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../includes/navBar/Logo';


function ViewPost() {

  const [views, setViews] = useState(null);
  const { id } = useParams();
  const [likedPost, setLikedPost] = useState({});


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/createpost/view/${id}/`);
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
    <div>

      <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
        <Logo />
      </div>
      <div className='wrapper py-16'>
        <div className='flex flex-col py-2 w-full items-start h-auto border border-slate-300 p-2'>
          <div className='flex items-center gap-5'>
            <span>
              <h3 className='text-2xl font-medium'>{views.created_by}</h3>
              <span className='text-xl font-medium'>{views.title}</span>
            </span>
          </div>
          <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
            <img src={views.image} alt={views.id} className='w-full h-full object-cover' />
          </div>
          <div className='flex gap-3 mt-3'>
            <span>
              <FaHeart size={25}
                style={{ fill: likedPost[id] ? 'red' : 'gray' }}
                onClick={() => handleLike(id)} />
            </span>
            <span><FaRegComment size={25} /></span>
            <span><SiSlideshare size={25} /></span>
          </div>
          <div className='flex flex-col gap-4 mt-5 w-full'>
            <h5 className='text-base font-medium flex justify-end'><span className='text-slate-600 font-normal mr-1'>Category:</span>{views.category}</h5>
            <span className='text-base font-normal w-full'>
              {views.description}
            </span>
          </div>
          <span className='text-sm font-normal text-slate-500 mt-5'>{views.created_at}</span>
        </div>
      </div>
    </div>
  )
}

export default ViewPost