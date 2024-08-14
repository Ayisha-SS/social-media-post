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