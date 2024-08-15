// const fetchPosts = async () => {
//     try {
//       const token = Cookies.get('auth_token');

//       const [postsResponse, createPostResponse] = await Promise.all([
//         axios.get('http://localhost:8000/api/v1/posts/', {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get('http://localhost:8000/api/v1/createpost/', {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       ]);

//       const formattedCreatePostResponse = { data: createPostResponse.data };

//       // setPosts([...postsResponse.data.data, ...formattedCreatePostResponse.data]);
//       const allPosts = [...postsResponse.data.data, ...formattedCreatePostResponse.data];
//       setPosts(allPosts);

//       const typeMapping = {};
//       allPosts.forEach(post => {
//         typeMapping[post.id] = post.apiType || 'viewpost'; // Default to 'viewpost'
//       });
//       setPostType(typeMapping);


//     } catch (error) {
//       console.error('Error fetching the posts:', error);
//       setError(error);
//     }
//   };

//   fetchPosts();
// }, []);



// // Function to handle like toggling
// const handleLike = (postId) => {
// const currentLikedState = !likedPost[postId];
// console.log('Liking post with ID:', postId);

// // Update the state
// setLikedPost((prevLikedPosts) => ({
//     ...prevLikedPosts,
//     [postId]: currentLikedState
// }));

// // Persist the state in localStorage
// localStorage.setItem(`likedPost_${postId}`, JSON.stringify(currentLikedState));
// };

// // Load the liked states from localStorage on component mount
// useEffect(() => {
// const storedLikes = {};
// posts.forEach((post) => {
//     const liked = JSON.parse(localStorage.getItem(`likedPost_${post.id}`));
//     if (liked) {
//         storedLikes[post.id] = liked;
//     }
// });
// setLikedPost(storedLikes);
// }, [posts]);



// // comment

// // const handleComment = async (postId,comment,contentTypeId) => {
// //   try {
// //     const token = Cookies.get('auth_token');

// //     // Log the data before sending it
// //     console.log('Comment Data:', {
// //       content_type: contentTypeId,
// //       object_id: postId,
// //       content: comment,
// //     });

// //     const response = await axios.post('http://localhost:8000/api/v1/comments/',{
// //       content_type: contentTypeId,
// //       post:postId,
// //       content:comment,
// //     },{
// //       headers: {
// //         // 'Content-Type':'application/json',
// //         Authorization:`Bearer ${token}`
// //       }
// //     });
// //     if(response.status === 201){
// //       console.log('Comment added:',response.data);
// //       setComment('');  
// //     } else {
// //       console.error('Failed to add comment');
// //     }
// //   } catch(error) {
// //     console.error('Error adding comment:',error);
// //   }
// // };



//   // Function to get content type ID by model name
//   const getContentTypeId = (modelName) => {
//     const contentTypeMap = {
//       'createpost': 7, // Replace 1 with the actual content_type ID for CreatePost
//       'viewpost': 8,   // Replace 2 with the actual content_type ID for ViewPost
//     };
//     return contentTypeMap[modelName.toLowerCase()] || null;
//   };

//   // Function to handle comment submission
//   const handleComment = async (postId, modelName) => {
//     try {
//       const token = Cookies.get('auth_token');
//       const modelName = postType[postId] || 'viewpost'; // Default to 'viewpost'
//       const contentTypeId = getContentTypeId(modelName);

//       if (!contentTypeId) {
//         console.error('Invalid content type');
//         return;
//       }

//       if (!comment || !postId) {
//         console.error('Comment and post ID are required');
//         return;
//       }

//       // Log the data before sending it
//       console.log('Comment Data:', {
//         model: modelName,
//         content_type: contentTypeId,
//         object_id: postId,
//         content: comment,
//       });

//       const response = await axios.post('http://localhost:8000/api/v1/comments/', {
//         model: modelName,
//         content_type: contentTypeId,
//         object_id: postId,
//         content: comment,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 201) {
//         console.log('Comment added:', response.data);
//         setComment('');  
//       } else {
//         console.error('Failed to add comment');
//       }
//     } catch (error) {
//       console.error('Error adding comment:', error.response ? error.response.data : error.message);
//     }
//   };



<span onClick={() => {
    console.log('Comment icon clicked:', post.id);  // Add this to debug
    setShowComment(showComment === post.id ? null : post.id);
}}>
  <FaRegComment size={25} />
</span>


{showComment === post.id && (
    <div className="comment-section">
      <textarea
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={() => handleComment(post.id)}>Submit</button>
    </div>
  )}


  // const handleCommentClick = (postId) => {
//   setShowComment((prevShowComment) => ({ ...prevShowComment, [postId]: true }));
// };

// const handleCommentSubmit = (postId) => {
//   const token = Cookies.get('auth_token');

//   const post = posts.find((post) => post.id === postId);

//   let contentTypeId;
//   if (post.content_type_id) {
//     contentTypeId = post.content_type_id;
//   } else {
//     contentTypeId = 8; // default content type ID
//   }

//   console.log('contentTypeId:', contentTypeId);

//   // Send a request to the backend API to create a new comment
//   axios.post(`http://localhost:8000/api/v1/comments/`, {
//     post_id: postId,
//     content_type_id: contentTypeId,
//     comment: comment,
//   },{
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
// })
//   .then(response => {
//     console.log("Comment created successfully:", response.data);
//     // Update the comments state with the new comment
//     setShowComment((prevComments) => ({ ...prevComments, [postId]: false }));
//     setComment('');
//   })
//   .catch(error => {
//     console.error('Error creating comment:', error);
//     if (error.response) {
//       console.error('Error response:', error.response.data);
//     }
//     setError(error);
//   });
// };



{/* {showComment === post.id && (
    <div className="comment-section">
      <textarea
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={() => handleComment(post.id)}>Submit</button>
    </div>
  )} */}




      {/* {showComment[post.id] && (
              <div>
                <input
                  type="text"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Add a comment..."
                />
                <button onClick={() => handleCommentSubmit(post.id)}>Submit</button>
              </div>
            )} */}



// // Function to get content type ID by model name
// const getContentTypeId = (modelName) => {
//   const contentTypeMap = {
//     'createpost': 7, // ContentType ID for CreatePost
//     'viewpost': 8,   // ContentType ID for ViewPost
//   };
//   return contentTypeMap[modelName?.toLowerCase()] || 8;
// };

// // Function to handle comment submission
// const handleComment = async (postId, modelName) => {
//   try {
//     const token = Cookies.get('auth_token');
//     const contentTypeId = getContentTypeId(modelName);

//     if (!contentTypeId) {
//       console.error('Invalid content type');
//       return;
//     }

//     if (!comment || !postId) {
//       console.error('Comment and post ID are required');
//       return;
//     }

//     // Log the data before sending it
//     console.log('Comment Data:', {
//       content_type: contentTypeId,
//       object_id: postId,
//       content: comment,
//     });

//     const response = await axios.post('http://localhost:8000/api/v1/comments/', {
//       content_type: contentTypeId,
//       object_id: postId,
//       content: comment,
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.status === 201) {
//       console.log('Comment added:', response.data);
//       setComment('');  
//     } else {
//       console.error('Failed to add comment');
//     }
//   } catch (error) {
//     console.error('Error adding comment:', error.response ? error.response.data : error.message);
//   }
// };






 {/* <span>
                <FaRegComment size={25} />
              </span> */}
               {/* <span>
                <FaRegComment size={25} onClick={() => handleCommentClick(post.id)} />
              </span> */}





// function View() {

//   const [views, setViews] = useState(null);
//   const { id } = useParams();
//   const [likedPost, setLikedPost] = useState({});


//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/posts/view/${id}/`);
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
//     <>
//       <Helmet>
//         <title>PostFun|View</title>
//       </Helmet>
//       <div className='py-4 border-b-4 bg-slate-200 border-b-solid border-b-purple-500 shadow-2xl'>
//         <div className='wrapper'>

//           <Logo />
//         </div>
//       </div>
//       <div className='pb-10 bg-gradient-to-r from-purple-400 to-pink-200'>
//         <div className='wrapper py-16 '>
//           <div className='flex flex-col py-2 w-full items-start h-full border-4 border-white p-2'>
//             <div className='flex items-center gap-5'>
//               <span className=''><FaRegCircleUser size={50} /></span>
//               <span>
//                 <h3 className='text-2xl font-medium'>{views.created_by}</h3>
//                 <h5 className='text-base font-normal'>{views.category}</h5>
//               </span>
//             </div>
//             <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
//               <img src={views.image} alt={views.id} className='w-full h-full object-cover' />
//             </div>
//             <div className='flex gap-3 mt-3 ml-4'>
//               <span>
//                 <FaHeart size={25}
//                   style={{ fill: likedPost[id] ? 'red' : 'gray' }}
//                   onClick={() => handleLike(id)} />
//               </span>
//               <span><FaRegComment size={25} /></span>
//               <span><SiSlideshare size={25} /></span>
//             </div>
//             <div className='flex flex-col gap-4 mt-5 w-full'>
//               <span className='text-xl font-medium'>{views.title}</span>
//               <span className='text-base font-normal w-full text-justify max-[540px]:text-[14px] max-[360px]:text-[12px]'>
//                 {views.description}
//               </span>
//             </div>
//             <span className='text-sm font-normal text-slate-500 mt-5'>May 28,2024</span>

//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default View


// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { FaRegCircleUser, FaHeart, FaRegComment, SiSlideshare } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Logo from '../../includes/navBar/Logo';
// import Footer from '../../footer/Footer';









// import React, { useEffect, useState } from 'react'
// import { Helmet } from "react-helmet";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
// import { SiSlideshare } from "react-icons/si";
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Logo from '../../includes/navBar/Logo';
// import Footer from '../../footer/Footer';



// function View() {
//   const [post, setPost] = useState(null);
//   const { id} = useParams();
//   const [likedPost, setLikedPost] = useState({});

 

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const [postsResponse, createPostResponse] = await Promise.all([
//           axios.get(`http://localhost:8000/api/v1/posts/view/${id}/`),
//           axios.get(`http://localhost:8000/api/v1/createpost/view/${id}/`)
//         ]);

//         // Choose the appropriate response based on the API
//         const postDetails = postsResponse.data.data || createPostResponse.data.data;
//         setPost(postDetails);
//       } catch (error) {
//         console.error('Error fetching the post:', error);
//       }
//     };

//     fetchPost();
//   }, [id]);


  
//   const handleLike = (postId) => {
//     setLikedPost((prevLikedPosts) => ({ ...prevLikedPosts, [postId]: !prevLikedPosts[postId] }));
//   };

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Helmet>
//         <title>PostFun | View</title>
//       </Helmet>
//       <div className="py-4 border-b-4 bg-slate-200 border-b-solid border-b-purple-500 shadow-2xl">
//         <div className="wrapper">
//           <Logo />
//         </div>
//       </div>
//       <div className="pb-10 bg-gradient-to-r from-purple-400 to-pink-200">
//         <div className="wrapper py-16">
//           <div className="flex flex-col py-2 w-full items-start h-full border-4 border-white p-2">
//             <div className="flex items-center gap-5">
//               <span className="">
//                 <FaRegCircleUser size={50} />
//               </span>
//               <span>
//                 <h3 className="text-2xl font-medium">{post.created_by}</h3>
//                 <h5 className="text-base font-normal">{post.category}</h5>
//               </span>
//             </div>
//             <div className="mt-5 items-center w-full overflow-hidden rounded-lg">
//               <img src={post.image} alt={post.id} className="w-full h-full object-cover" />
//             </div>
//             <div className="flex gap-3 mt-3 ml-4">
//               <span>
//                 <FaHeart
//                   size={25}
//                   style={{ fill: likedPost[id] ? 'red' : 'gray' }}
//                   onClick={() => handleLike(id)}
//                 />
//               </span>
//               <span>
//                 <FaRegComment size={25} />
//               </span>
//               <span>
//                 <SiSlideshare size={25} />
//               </span>
//             </div>
//             <div className="flex flex-col gap-4 mt-5 w-full">
//               <span className="text-xl font-medium">{post.title}</span>
//               <span className="text-base font-normal w-full text-justify max-[540px]:text-[14px] max-[360px]:text-[12px]">
//                 {post.description}
//               </span>
//             </div>
//             <span className="text-sm font-normal text-slate-500 mt-5">May 28, 2024</span>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default View;




// import React, { useEffect, useState } from 'react'
// import { Helmet } from "react-helmet";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
// import { SiSlideshare } from "react-icons/si";
// import { useParams} from 'react-router-dom';
// import axios from 'axios';
// import Logo from '../../includes/navBar/Logo';
// import Footer from '../../footer/Footer';



// function View() {

//   const [views, setViews] = useState(null);
//   const { id } = useParams();
//   const [likedPost, setLikedPost] = useState({});


//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/posts/view/${id}/`);
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
//     <>
//       <Helmet>
//         <title>PostFun|View</title>
//       </Helmet>
//       <div className='py-4 border-b-4 bg-slate-200 border-b-solid border-b-purple-500 shadow-2xl'>
//         <div className='wrapper'>

//           <Logo />
//         </div>
//       </div>
//       <div className='pb-10 bg-gradient-to-r from-purple-400 to-pink-200'>
//         <div className='wrapper py-16 '>
//           <div className='flex flex-col py-2 w-full items-start h-full border-4 border-white p-2'>
//             <div className='flex items-center gap-5'>
//               <span className=''><FaRegCircleUser size={50} /></span>
//               <span>
//                 <h3 className='text-2xl font-medium'>{views.created_by}</h3>
//                 <h5 className='text-base font-normal'>{views.category}</h5>
//               </span>
//             </div>
//             <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
//               <img src={views.image} alt={views.id} className='w-full h-full object-cover' />
//             </div>
//             <div className='flex gap-3 mt-3 ml-4'>
//               <span>
//                 <FaHeart size={25}
//                   style={{ fill: likedPost[id] ? 'red' : 'gray' }}
//                   onClick={() => handleLike(id)} />
//               </span>
//               <span><FaRegComment size={25} /></span>
//               <span><SiSlideshare size={25} /></span>
//             </div>
//             <div className='flex flex-col gap-4 mt-5 w-full'>
//               <span className='text-xl font-medium'>{views.title}</span>
//               <span className='text-base font-normal w-full text-justify max-[540px]:text-[14px] max-[360px]:text-[12px]'>
//                 {views.description}
//               </span>
//             </div>
//             <span className='text-sm font-normal text-slate-500 mt-5'>May 28,2024</span>

//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default View





// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaRegComment } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
// import { SiSlideshare } from "react-icons/si";
// import axios from 'axios';
// import Cookies from 'js-cookie';


// function Posts({ modelName }) {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [likedPost, setLikedPost] = useState({});
//   const [comment, setComment] = useState('');
//   const [showComment, setShowComment] = useState({});
//   const [postComments, setPostComments] = useState({});
//   const [commentCounts, setCommentCounts] = useState({});
//   const [loadingComments, setLoadingComments] = useState({});



//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = Cookies.get('auth_token');

//         const [postsResponse, createPostResponse] = await Promise.all([
//           axios.get('http://localhost:8000/api/v1/posts/', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('http://localhost:8000/api/v1/createpost/', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ]);

//         const formattedCreatePostResponse = { data: createPostResponse.data };

//         const allPosts = [...postsResponse.data.data, ...formattedCreatePostResponse.data];
//         setPosts(allPosts);

//       } catch (error) {
//         console.error('Error fetching the posts:', error);
//         setError(error);
//       }
//     };

//     fetchPosts();
//   }, []);



//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const token = Cookies.get('auth_token');
//         const promises = posts.map((post) => {
//           return axios.get(`http://localhost:8000/api/v1/comments/${post.id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//         });
  
//         const responses = await Promise.all(promises);
  
//         const comments = responses.reduce((acc, response, index) => {
//           if (response.data && response.data.data) {
//             acc[posts[index].id] = response.data.data;
//           } else {
//             acc[posts[index].id] = []; // Default to empty array if data is missing
//           }
//           return acc;
//         }, {});
  
//         setPostComments(comments);
  
//         const commentCounts = responses.reduce((acc, response, index) => {
//           if (response.data && response.data.data) {
//             acc[posts[index].id] = response.data.data.length;
//           } else {
//             acc[posts[index].id] = 0; // Default to 0 if data is missing
//           }
//           return acc;
//         }, {});
  
//         setCommentCounts(commentCounts);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };
  
//     fetchComments();
//   }, [posts]);


//   // Function to handle like toggling
//   const handleLike = (postId) => {
//     const currentLikedState = !likedPost[postId];
//     console.log('Liking post with ID:', postId);

//     // Update the state
//     setLikedPost((prevLikedPosts) => ({
//       ...prevLikedPosts,
//       [postId]: currentLikedState
//     }));

//     // Persist the state in localStorage
//     localStorage.setItem(`likedPost_${postId}`, JSON.stringify(currentLikedState));
//   };

//   // Load the liked states from localStorage on component mount
//   useEffect(() => {
//     const storedLikes = {};
//     posts.forEach((post) => {
//       const liked = JSON.parse(localStorage.getItem(`likedPost_${post.id}`));
//       if (liked) {
//         storedLikes[post.id] = liked;
//       }
//     });
//     setLikedPost(storedLikes);
//   }, [posts]);


//   // comment..
//   //  Function to get content type ID by model name
//   const getContentTypeId = (modelName) => {
//     const contentTypeMap = {
//       'createpost': 7, // ContentType ID for CreatePost
//       'viewpost': 8,   // ContentType ID for ViewPost
//     };
//     return contentTypeMap[modelName?.toLowerCase()] || 8;
//   };


//   // Function to handle comment submission
//   const handleComment = async (postId, modelName) => {
//     try {
//       const token = Cookies.get('auth_token');
//       const contentTypeId = getContentTypeId(modelName);

//       if (!contentTypeId) {
//         console.error('Invalid content type');
//         return;
//       }

//       if (!comment || !postId) {
//         console.error('Comment and post ID are required');
//         return;
//       }

//       // Log the data before sending it
//       console.log('Comment Data:', {
//         content_type: contentTypeId,
//         object_id: postId,
//         content: comment,
//       });

//       const response = await axios.post('http://localhost:8000/api/v1/comments/', {
//         content_type: contentTypeId,
//         object_id: postId,
//         content: comment,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 201) {
//         console.log('Comment added:', response.data);
//         setComment('');

//         // Fetch existing comments for the post
//         const commentsResponse = await axios.get(`http://localhost:8000/api/v1/comments/${postId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });


//         setPostComments((prevPostComments) => ({
//           ...prevPostComments,
//           [postId]: commentsResponse.data.data
//         }));
//         // Update comment count by fetching the updated comment count
//         const updatedCommentCountResponse = await axios.get(`http://localhost:8000/api/v1/posts/${postId}/comment_count`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setCommentCounts((prevCommentCounts) => ({
//           ...prevCommentCounts,
//           [postId]: updatedCommentCountResponse.data.comment_count
//         }));
//       } else {
//         console.error('Failed to add comment');
//       }
//     } catch (error) {
//       console.error('Error adding comment:', error.response ? error.response.data : error.message);
//     }
//   };


//   if (error) {
//     return <div>Error loading posts. Please try again later.</div>;
//   }

//   return (
//     <>
//       <div className='wrapper py-16 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center menu-open'>
//         {posts.map(post => (
//           <div key={post.id} className='flex flex-col py-2 w-full items-start p-2 h-[500px] max-[768px]:h-[400px]'>
//             <div className='flex items-center gap-5'>
//               <span><FaRegCircleUser size={40} /></span>
//               <span>
//                 <h3 className='text-2xl font-medium max-[768px]:text-[20px] max-[640px]:text-[22px]'>{post.created_by}</h3>
//                 <h5 className='text-base font-normal'>{post.category}</h5>
//               </span>
//             </div>
//             <div className='mt-5 items-center w-full overflow-hidden rounded-lg'>
//               <Link to={`/view/${post.id}`}>
//                 <img src={post.image} alt={post.id} className='w-full h-full object-cover' />
//               </Link>
//             </div>
//             <div className='flex gap-3 mt-3 ml-4'>
//               <span>
//                 <FaHeart size={25}
//                   style={{
//                     fill: likedPost[post.id] ? 'red' : 'gray',
//                     cursor: 'pointer'
//                   }}
//                   onClick={() => handleLike(post.id)} />
//               </span>

//               <span onClick={() => {
//                 console.log('Comment icon clicked:', post.id);  // Add this to debug
//                 setShowComment(showComment === post.id ? null : post.id);
//               }}>
//                 <FaRegComment size={25} />
//               </span>
//               <span><SiSlideshare size={25} /></span>
//             </div>
//             <span className='text-xl font-normal'>{post.title}</span>
//             {showComment === post.id && (
//               <div className="comment-section">
//                 {loadingComments[post.id] ? (
//                   <div>Loading comments...</div>
//                 ) : (
//                   <div>
//                     <div className="comment-header">
//                       <span>Comments</span>
//                       <span>{commentCounts[post.id] || 0} comments</span>
//                     </div>
//                     <div className="comment-list">
//                       {postComments[post.id]?.map((comment) => (
//                         <div key={comment.id} className="comment-item">
//                           <div className="comment-avatar">
//                             <FaRegCircleUser size={25} />
//                           </div>
//                           <div className="comment-content">
//                             <span>{comment.content}</span>
//                           </div>
//                         </div>
//                       ))}
//                       {!postComments[post.id] && <div>No comments yet</div>}
//                     </div>
//                     <div className="comment-input-section">
//                       <textarea
//                         className="comment-input"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         placeholder="Add a comment..."
//                       />
//                       <button onClick={() => handleComment(post.id)}>Post</button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}


//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Posts;