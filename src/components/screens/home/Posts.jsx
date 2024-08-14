
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
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState({});
  const [postComments, setPostComments] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [loadingComments, setLoadingComments] = useState({});


  
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

        // const formattedCreatePostResponse = createPostResponse.data.map((post) => ({
        //   ...post,
        //   content_type_id: 8 // default content type ID for createpost endpoint
        // }));

        const allPosts = [...postsResponse.data.data, ...formattedCreatePostResponse.data];
        setPosts(allPosts);

      } catch (error) {
        console.error('Error fetching the posts:', error);
        setError(error);
      }
    };

    fetchPosts();
  }, []);



// Function to handle like toggling
const handleLike = (postId) => {
  const currentLikedState = !likedPost[postId];
  console.log('Liking post with ID:', postId);

  // Update the state
  setLikedPost((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: currentLikedState
  }));

  // Persist the state in localStorage
  localStorage.setItem(`likedPost_${postId}`, JSON.stringify(currentLikedState));
};

// Load the liked states from localStorage on component mount
useEffect(() => {
  const storedLikes = {};
  posts.forEach((post) => {
      const liked = JSON.parse(localStorage.getItem(`likedPost_${post.id}`));
      if (liked) {
          storedLikes[post.id] = liked;
      }
  });
  setLikedPost(storedLikes);
}, [posts]);


// comment..
//  Function to get content type ID by model name
  const getContentTypeId = (modelName) => {
    const contentTypeMap = {
      'createpost': 7, // ContentType ID for CreatePost
      'viewpost': 8,   // ContentType ID for ViewPost
    };
    return contentTypeMap[modelName?.toLowerCase()] || 8;
  };

  
  // Function to handle comment submission
  const handleComment = async (postId, modelName) => {
    try {
      const token = Cookies.get('auth_token');
      const contentTypeId = getContentTypeId(modelName);

      if (!contentTypeId) {
        console.error('Invalid content type');
        return;
      }

      if (!comment || !postId) {
        console.error('Comment and post ID are required');
        return;
      }

      // Log the data before sending it
      console.log('Comment Data:', {
        content_type: contentTypeId,
        object_id: postId,
        content: comment,
      });

      const response = await axios.post('http://localhost:8000/api/v1/comments/', {
        content_type: contentTypeId,
        object_id: postId,
        content: comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        console.log('Comment added:', response.data);
        setComment('');

        // Fetch existing comments for the post
        const commentsResponse = await axios.get(`http://localhost:8000/api/v1/comments/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });


        setPostComments((prevPostComments) => ({
          ...prevPostComments,
          [postId]: commentsResponse.data.data
        }));
     // Update comment count by fetching the updated comment count
    const updatedCommentCountResponse = await axios.get(`http://localhost:8000/api/v1/posts/${postId}/comment_count`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCommentCounts((prevCommentCounts) => ({
      ...prevCommentCounts,
      [postId]: updatedCommentCountResponse.data.comment_count
    }));
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error.response ? error.response.data : error.message);
    }
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
                  style={{ fill: likedPost[post.id] ? 'red' : 'gray',
                           cursor:'pointer'
                   }}
                  onClick={() => handleLike(post.id)} />
              </span>
              {/* <span>
                <FaRegComment size={25} />
              </span> */}
               {/* <span>
                <FaRegComment size={25} onClick={() => handleCommentClick(post.id)} />
              </span> */}
              <span onClick={() => {
    console.log('Comment icon clicked:', post.id);  // Add this to debug
    setShowComment(showComment === post.id ? null : post.id);
}}>
  <FaRegComment size={25} />
</span>
              <span><SiSlideshare size={25} /></span>
            </div>
            <span className='text-xl font-normal'>{post.title}</span>
{showComment === post.id && (
  <div className="comment-section">
     {loadingComments[post.id] ? (
        <div>Loading comments...</div>
      ) : (
        <div>
    <div className="comment-header">
      <span>Comments</span>
      <span>{commentCounts[post.id] || 0} comments</span>
    </div>
    <div className="comment-list">
    {postComments[post.id]?.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-avatar">
            <FaRegCircleUser size={25} />
          </div>
          <div className="comment-content">
            <span>{comment.content}</span>
          </div>
        </div>
      ))}
      {!postComments[post.id] && <div>No comments yet</div>}
    </div>
    <div className="comment-input-section">
      <textarea
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={() => handleComment(post.id)}>Post</button>
    </div>
    </div>
      )}
  </div>
)}


          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;
