
import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import Logo from '../../includes/navBar/Logo';
import LinkButton from '../../general/LinkButton';
import axios from 'axios';
import Cookies from 'js-cookie';


function MyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPost, setLikedPost] = useState({});

  const token = Cookies.get('auth_token');
  
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/api/v1/createpost/');
        console.log('API Response:', response.data);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        console.error('Error response:', error.response);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);



  const handleLike = (postId) => {
    setLikedPost((prevLikedPosts) => ({ ...prevLikedPosts, [postId]: !prevLikedPosts[postId] }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('Posts:', posts);

  return (
    <>
    <Helmet>
        <title>PostFun|MyPost</title>
      </Helmet>
      <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
        <div className='wrapper flex justify-between'>
          <Logo />
          <LinkButton to="/create" text="Create Post" gradientFrom="purple-600" gradientTo="pink-500" textColor="slate-900" />
        </div>
      </div>

      <div className='wrapper py-16 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center w-[50%]'>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className='flex flex-col py-2 w-full items-start  p-2'>
              <span className='text-xl font-bold mt-3'>{post.title}</span>
              <div className='mt-5 items-center w-full  overflow-hidden rounded-lg'>
                <img src={post.image} alt={post.title} className='w-full h-[500px] aspect-square object-fill max-[768px]:h-[400px] max-[640px]:h-[300px]' />
              </div>
              <div className=' justify-between  mb-5'>
                <div className='flex gap-3 mt-3 ml-4'>
                  <span>
                    <FaHeart size={25}
                      style={{ fill: likedPost[post.id] ? 'red' : 'gray' }}
                      onClick={() => handleLike(post.id)} />
                  </span>
                  <span><FaRegComment size={25} /></span>
                  <span><SiSlideshare size={25} /></span>
                </div>
              </div>
              <span className='text-base font-normal text-slate-800 mb-5 text-justify max-[768px]:text-[14px]'>
                <p>{post.description}</p>
                <h4 className='text-base text-slate-500 mt-3 '>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })} ,
                  {new Date(post.created_at).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </h4>
              </span>
            </div>
          ))
        ) : (
          <div>No posts found.</div>
        )}
      </div>
    </>
  );
}

export default MyPost;
