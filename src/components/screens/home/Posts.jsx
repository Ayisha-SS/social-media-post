
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { SiSlideshare } from "react-icons/si";
import axios from 'axios';
import Cookies from 'js-cookie';
import { LikedPostsContext } from '../../context/Context';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(null);
  const [postComments, setPostComments] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const { modelName } = useParams()

  const { likedPosts, handleLike } = useContext(LikedPostsContext)


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = Cookies.get('auth_token');
  
        // Fetching api
        const [postsData, createPostData] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/posts/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:8000/api/v1/createpost/', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
  
        
        const formattedCreatePosts = createPostData.data.map(post => ({
          ...post,
          source: 'createpost'
        }));
  
        const allPosts = [
          ...postsData.data.data.map(post => ({ ...post, source: 'posts' })),
          ...formattedCreatePosts
        ];
  
        setPosts(allPosts);
  
      } catch (error) {
        console.error('Error fetching the posts:', error);
        setError(error);
      }
    };
  
    fetchPosts();
  }, []);
  
  // comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const token = Cookies.get('auth_token');
        
        const promises = posts.map((post) => {
          return axios.get(`http://localhost:8000/api/v1/comments/${post.id}/`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch((error) => {
            console.error(`Error fetching comments for post ID ${post.id}:`, error.response ? error.response.data : error.message);
            return { data: [] };
          });
        });
  
        const responses = await Promise.all(promises);
        
        const comments = responses.reduce((acc, response, index) => {
          acc[posts[index].id] = response.data;
          return acc;
        }, {});
        
        setPostComments(comments);
  
        const counts = responses.reduce((acc, response, index) => {
          acc[posts[index].id] = response.data.length;
          return acc;
        }, {});
        
        setCommentCounts(counts);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoadingComments(false);
      }
    };
  
    if (posts.length) {
      fetchComments();
    }
  }, [posts]);



  const getContentTypeId = (modelName) => {
    const contentTypeMap = {
      'createpost': 7,
      'viewpost': 8,
    };
    return contentTypeMap[modelName?.toLowerCase()] || 8;
  };

  const handleComment = async (postId, modelName) => {
    try {
      const token = Cookies.get('auth_token');
      const contentTypeId = getContentTypeId(modelName);
  
      if (!contentTypeId || !comment || !postId) {
        console.error('Invalid content type or missing data');
        return;
      }
  
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
        setComment('');
        
        setPostComments((prevPostComments) => ({
          ...prevPostComments,
          [postId]: [...(prevPostComments[postId] || []), response.data]
        }));
  
        setCommentCounts((prevCommentCounts) => ({
          ...prevCommentCounts,
          [postId]: (prevCommentCounts[postId] || 0) + 1
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
            {/* <Link to={`/view/${post.id}`}>
              <img src={post.image} alt={post.id} className='w-full h-full object-cover' />
            </Link> */}
            <Link
              to={
                post.source === 'posts'
                  ? `/posts/view/${post.id}`
                  : `/createpost/view/${post.id}`
              }
              state={{ modelName: post.source === "posts" ? "posts" : "createpost"}}   
            >
              <img src={post.image} alt={post.id} className='w-full h-full object-cover' />
            </Link>
          </div>
          <div className='flex gap-3 mt-3 ml-4'>
            <span>
              <FaHeart size={25}
                style={{
                  fill: likedPosts[post.id] ? 'red' : 'gray',
                  cursor: 'pointer'
                }}
                onClick={() => handleLike(post.id)}
                title='Like' />
            </span>

            <span 
              onClick={() => setShowComment(showComment === post.id ? null : post.id)}
              className='cursor-pointer'
              title='Comment'
            >
              <FaRegComment size={25} />
            </span>
            <span className='cursor-pointer' title='Share'><SiSlideshare size={25} /></span>
          </div>
          <span className="text-sm font-normal text-slate-800 mt-2">
            {commentCounts[post.id] || 0} comments
          </span>
          <span className='text-xl font-normal'>{post.title}</span>

          {showComment === post.id && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="relative w-full h-full bg-white rounded-lg overflow-hidden md:w-[600px] md:h-[80%] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">Comments</h2>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setShowComment(null)}
                  >
                    &times;
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {postComments[post.id]?.map((comment) => (
                    <div key={comment.id} className="comment flex items-start gap-3 mb-3">
                      <div className="avatar">
                        <FaRegCircleUser size={25} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{comment.created_by}</span>
                        <span className="text-sm">{comment.content}</span>
                      </div>
                    </div>
                  ))}
                  {!postComments[post.id]?.length && <div>No comments yet</div>}
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
                    onClick={() => handleComment(post.id, modelName)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Posts;
