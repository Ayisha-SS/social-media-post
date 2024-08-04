
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import axios from 'axios';
import Cookies from 'js-cookie';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [likedPost, setLikedPost] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = Cookies.get('auth_token');

        const [postsResponse, createPostResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/posts/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:8000/api/v1/createpost/', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const formattedCreatePostResponse = { data: createPostResponse.data };

        setPosts([...postsResponse.data.data, ...formattedCreatePostResponse.data]);
      } catch (error) {
        console.error('Error fetching the posts:', error);
        setError(error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId) => {
    setLikedPost((prevLikedPosts) => ({ ...prevLikedPosts, [postId]: !prevLikedPosts[postId] }));
  };

  if (error) {
    return <div>Error loading posts. Please try again later.</div>;
  }

  return (
    <>
      <div className='wrapper py-16 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center menu-open'>
        {posts.map(post => (
          <div key={post.id} className='flex flex-col py-2 w-full items-start p-2 h-[500px] max-[768px]:h-[400px]'>
            <div className='flex items-center gap-5'>
              <span><FaRegCircleUser size={40} /></span>
              <span>
                <h3 className='text-2xl font-medium max-[768px]:text-[20px] max-[640px]:text-[22px]'>{post.created_by}</h3>
                <h5 className='text-base font-normal'>{post.category}</h5>
              </span>
            </div>
            <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
              <Link to={`/view/${post.id}`}>
                <img src={post.image} alt={post.id} className='w-full h-full object-cover' />
              </Link>
            </div>
            <div className='flex gap-3 mt-3 ml-4'>
              <span>
                <FaHeart size={25}
                  style={{ fill: likedPost[post.id] ? 'red' : 'gray' }}
                  onClick={() => handleLike(post.id)} />
              </span>
              <span><FaRegComment size={25} /></span>
              <span><SiSlideshare size={25} /></span>
            </div>
            <span className='text-xl font-normal'>{post.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;
