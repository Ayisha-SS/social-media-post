// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { FaRegCircleUser } from "react-icons/fa6";
// import { CiHeart } from "react-icons/ci";
// import { FaRegComment } from "react-icons/fa";
// import { SiSlideshare } from "react-icons/si";
// import img1 from "../../../assets/img-1.jpg"
// import Logo from '../../includes/navBar/Logo'
// import LinkButton from '../../general/LinkButton';
// import axios from 'axios';


// function MyPost() {

//   const [posts,setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPost = async ()=> {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/createpost/');
//         setPosts(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching posts:',err);
//         // setError('Failed to load posts.Please try again later.');
//       }
//     };
//     fetchPost();
//   },[]);

//   if (loading) {
//     return <div>Loading...</div>; // Optional: Show a loading indicator while fetching data
//   }

//   return (
//     <>
//       <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
//           <div className='wrapper flex justify-between'>
//               <Logo/>
//               <LinkButton to="/create" text="Create Post" gradientFrom="purple-600" gradientTo="pink-500" textColor="slate-900"/>
//           </div>
//       </div>

//       <div className='wrapper py-16 grid grid-cols-1 sm:grid-cols-2  gap-5 items-center justify-center '>
      
//           {posts.map(post => (
//        <div className='flex flex-col py-2 w-full  items-start h-[500px] p-2'>
     
//         <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
//           <Link to={`/view/${post.id}`}>
//           <img src={post.image} alt={post.title} className='w-full h-full object-cover'/>
//           </Link>
//         </div>
//         <div className='flex gap-3 mt-3'>
//           <span><CiHeart size={30}/></span>
//           <span><FaRegComment size={25}/></span>
//           <span><SiSlideshare size={25}/></span>
//         </div>
//         <span className='text-xl font-normal'>{post.title}</span>
//        </div>
//           ))}
//     </div>
//     </>
//   )
// }

// export default MyPost

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import Logo from '../../includes/navBar/Logo';
import LinkButton from '../../general/LinkButton';
import axios from 'axios';
import img1 from "../../../assets/img-1.jpg";

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/createpost/');
        setPosts(response.data); // Assuming your API response structure has 'data' field containing posts
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); // Handle error state
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }
  console.log('Posts:', posts); 

  return (
    <>
      <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
        <div className='wrapper flex justify-between'>
          <Logo />
          <LinkButton to="/create" text="Create Post" gradientFrom="purple-600" gradientTo="pink-500" textColor="slate-900" />
        </div>
      </div>

      <div className='wrapper py-16 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center'>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className='flex flex-col py-2 w-full items-start h-[500px] p-2'>

              <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
                <Link to={`/view/${post.id}`}>
                  <img src={post.image || img1} alt={post.title} className='w-full h-full object-cover' />
                </Link>
              </div>

              <div className='flex gap-3 mt-3'>
                <span><CiHeart size={30} /></span>
                <span><FaRegComment size={25} /></span>
                <span><SiSlideshare size={25} /></span>
              </div>

              <span className='text-xl font-normal'>{post.title}</span>
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
