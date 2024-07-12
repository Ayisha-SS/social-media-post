import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import img1 from "../../../assets/img-1.jpg"
import axios from 'axios';


function Posts() {

  const [posts,setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/posts/')
      .then(response => {
        setPosts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching the posts:',error);
      });
  }, []);

  if (error) {
    return <div>Error loading posts. Please try again later.</div>;
  }

  return (
    <div className='wrapper py-16 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center '>
      {posts.map(post => (
       <div className='flex flex-col py-2 w-full  items-start h-[500px] p-2'>
        <div className='flex items-center gap-5'>
          <span className=''><FaRegCircleUser size={50}/></span>
          <span>
            <h3 className='text-2xl font-medium'>{post.created_by}</h3>
            <h5 className='text-base font-normal'>{post.category}</h5>
          </span>
        </div>
        <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
          <Link to={`/view/${post.id}`}>
            <img src={post.image} alt={post.id} className='w-full h-full object-cover'/>
          </Link>
        </div>
        <div className='flex gap-3 mt-3'>
          <span><CiHeart size={30}/></span>
          <span><FaRegComment size={25}/></span>
          <span><SiSlideshare size={25}/></span>
        </div>
        <span className='text-xl font-normal'>{post.title}</span>
       </div>

))}
    </div>
  );
}

export default Posts