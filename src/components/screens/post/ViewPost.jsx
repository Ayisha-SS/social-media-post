// import React, { useEffect, useState } from 'react'
// import { FaHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
// import { SiSlideshare } from "react-icons/si";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Logo from '../../includes/navBar/Logo';


// function ViewPost() {

//   const [views, setViews] = useState(null);
//   const { id } = useParams();
//   const [likedPost, setLikedPost] = useState({});


//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/createpost/view/${id}/`);
//         console.log('API Response:', response.data);
//         setViews(response.data.data);
//       } catch (error) {
//         console.error('Error fetching the post:', error)
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const handleLike = (id) => {
//     setLikedPost((prevLikedPosts) => ({ ...prevLikedPosts, [id]: !prevLikedPosts[id] }));
//   };

//   if (!views) {
//     return <div>Loading...</div>
//   }


//   return (
//     <div>

//       <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
//         <Logo />
//       </div>
//       <div className='bg-gradient-to-r from-purple-400 to-pink-200'>


//         <div className='wrapper py-16'>
//           <div className='flex flex-col py-2 w-full items-start h-auto border border-slate-300 p-2'>
//             <div className='flex items-center gap-5'>
//               <span>
//                 <h3 className='text-2xl font-medium'>{views.created_by}</h3>
//                 <span className='text-xl font-medium'>{views.title}</span>
//               </span>
//             </div>
//             <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
//               <img src={views.image} alt={views.id} className='w-full h-full object-cover' />
//             </div>
//             <div className='flex gap-3 mt-3'>
//               <span>
//                 <FaHeart size={25}
//                   style={{ fill: likedPost[id] ? 'red' : 'gray' }}
//                   onClick={() => handleLike(id)} />
//               </span>
//               <span><FaRegComment size={25} /></span>
//               <span><SiSlideshare size={25} /></span>
//             </div>
//             <div className='flex flex-col gap-4 mt-5 w-full'>
//               <h5 className='text-base font-medium flex justify-end'><span className='text-slate-600 font-normal mr-1'>Category:</span>{views.category}</h5>
//               <span className='text-base font-normal w-full'>
//                 {views.description}
//               </span>
//             </div>
//             {/* <h4 className='text-base text-slate-500 mt-3 '>
//               {new Date(post.created_at).toLocaleDateString('en-US', {
//                 month: 'long',
//                 day: 'numeric',
//                 year: 'numeric'
//               })} ,
//               {new Date(post.created_at).toLocaleTimeString('en-US', {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true
//               })}
//             </h4> */}
//             <span className='text-sm font-normal text-slate-500 mt-5'>{views.created_at}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ViewPost


import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logo from '../../includes/navBar/Logo';
import Footer from '../../footer/Footer';


function View() {
  const {  id , modelName } = useParams();

  const [views, setViews] = useState(null);
  const [likedPost, setLikedPost] = useState({});
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [commentCounts, setCommentCounts] = useState(0);

 
  useEffect(() => {
    console.log('Post ID:', id);
  
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/createpost/view/${id}/`);
  
        setViews(response.data.data);
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };
    fetchPost();
  }, [id]);

  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = Cookies.get('auth_token');
        const response = await axios.get(`http://localhost:8000/api/v1/comments/${ id }/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPostComments(response.data);
        setCommentCounts(response.data.length);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [ id ]);

  // Handle the like functionality
  const handleLike = (id) => {
    setLikedPost((prevLikedPosts) => ({
      ...prevLikedPosts,
      [id]: !prevLikedPosts[id],
    }));
  };

  // Get content type ID based on model name
  const getContentTypeId = (modelName) => {
    const contentTypeMap = {
      'createpost': 7,
      'viewpost': 8,
    };
    return contentTypeMap[modelName?.toLowerCase()] || 8;
  };

  // Handle posting a new comment
  const handleComment = async () => {
    try {
      const token = Cookies.get('auth_token');
      const contentTypeId = getContentTypeId(modelName);

      if (!contentTypeId || !comment) {
        console.error('Invalid content type or missing data');
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1/comments/',
        {
          content_type: contentTypeId,
          object_id:  id ,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setComment('');
        setPostComments((prevComments) => [...prevComments, response.data]);
        setCommentCounts((prevCount) => prevCount + 1);
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!views) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>PostFun | View</title>
      </Helmet>
      <div className="py-4 border-b-4 bg-slate-200 border-b-solid border-b-purple-500 shadow-2xl">
        <div className="wrapper">
          <Logo />
        </div>
      </div>
      <div className="pb-10 bg-gradient-to-r from-purple-400 to-pink-200">
        <div className="wrapper py-16">
          <div className="flex flex-col py-2 w-full items-start h-full border-4 border-white p-2">
            <div className="flex items-center gap-5">
              <span>
                <FaRegCircleUser size={50} />
              </span>
              <span>
                <h3 className="text-2xl font-medium">{views.created_by}</h3>
                <h5 className="text-base font-normal">{views.category}</h5>
              </span>
            </div>
            <div className="mt-5 items-center w-full overflow-hidden rounded-lg">
              <img src={views.image} alt={views.id} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3 mt-3 ml-4">
              <span>
                <FaHeart
                  size={25}
                  style={{ fill: likedPost[ id ] ? 'red' : 'gray' }}
                  onClick={() => handleLike( id )}
                />
              </span>
              <span 
                onClick={() => setShowComment(!showComment)}
                className='cursor-pointer'
                >
                <FaRegComment size={25} />
              </span>
              
              
              <span className='cursor-pointer'>
                <SiSlideshare size={25} />
              </span>
            </div>
            <span className="text-sm font-normal text-slate-800 mt-2">
               {commentCounts} comments
            </span>
            <div className="flex flex-col gap-4 mt-5 w-full">
              <span className="text-xl font-medium">{views.title}</span>
              <span className="text-base font-normal w-full text-justify">
                {views.description}
              </span>
            </div>
            <span className="text-sm font-normal text-slate-500 mt-5">May 28, 2024</span>
            
            {showComment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="relative w-full h-full bg-white rounded-lg overflow-hidden md:w-[600px] md:h-[80%] flex flex-col">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Comments</h2>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => setShowComment(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {postComments.length > 0 ? (
                      postComments.map((comment) => (
                        <div key={comment.id} className="comment flex items-start gap-3 mb-3">
                          <div className="avatar">
                            <FaRegCircleUser size={25} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{comment.created_by}</span>
                            <span className="text-sm">{comment.content}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No comments yet</div>
                    )}
                  </div>
                  <div className="border-t p-4">
                    <textarea
                      className="comment-input w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows="2"
                    />
                    <button
                      className="mt-2 text-blue-500 font-semibold"
                      onClick={handleComment}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default View;
