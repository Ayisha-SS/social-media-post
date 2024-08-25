
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { SiSlideshare } from "react-icons/si";
import { LuSendHorizonal } from "react-icons/lu"; 
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
  const navigate = useNavigate();

  const { modelName } = useParams();

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

  // Fetch comments
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



  const handleLike = async (postId) => {
    try {
      const token = Cookies.get('auth_token');
      const userId = Cookies.get('user_id');
      const contentTypeId = getContentTypeId(modelName);

      if (!postId || !contentTypeId || !userId) {
        console.error('Missing required parameters for like request.');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/v1/like/', {
        post_id: postId,
        content_type_id: contentTypeId,
        user_id: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Like response status:', response.status);
      console.log('Like response data:', response.data);

      const { message, like_count } = response.data;

      if (response.status === 201 || response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: like_count, liked: message === 'Post liked.' } : post
          )
        );
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error liking the post:', error.response ? error.response.data : error.message);
    }
  };
  


  if (error) {
    return <div>Error loading posts. Please try again later.</div>;
  }

  return (
    <div className='wrapper pb-16 pt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center menu-open'>
      {posts.map(post => (
        <div key={post.id} className='flex flex-col  w-full items-start pt-2 pb-4 px-2 rounded-lg hover:border hover:-translate-y-1 hover:shadow-gray-600 h-[500px] max-[768px]:h-[400px]'>
          <div className='flex items-center gap-5'>
            <span className='cursor-pointer'><FaRegCircleUser size={40} /></span>
            <span>
              <h3 className='text-2xl font-medium max-[768px]:text-[20px] max-[640px]:text-[22px] cursor-pointer'>{post.created_by}</h3>
              <h5 className='text-base font-normal'>{post.category}</h5>
            </span>
          </div>
          <div className='mt-5 w-full  overflow-hidden rounded-lg h-full'>
            <Link
              to={`/view/${post.id}`}
              state={{ modelName: post.source === 'posts' ? 'posts' : 'createpost' }}
            >
              <img src={post.image} alt={post.id} className='w-full h-full' />
            </Link>
          </div>
          <div className='flex gap-3 mt-3 ml-2'>
            <span className='hover:text-slate-400'>
              <PiHeartStraightDuotone
                size={25}
                style={{
                  fill: post.liked  ? 'red' : 'black',
                  cursor: 'pointer',
                }}
                onClick={() => handleLike(post.id)}
                title='like'
              />
            </span>
            <span
              onClick={() => setShowComment(showComment === post.id ? null : post.id)}
              className='cursor-pointer hover:text-slate-600'
              title='Comment'
            >
              <FaRegComment size={25} />
            </span>
            <span className='cursor-pointer hover:text-slate-600' title='Share'><LuSendHorizonal size={25} /></span>
          </div>
          <span className="text-sm font-normal text-slate-800 mt-2 mb-1 ml-2">
            <h6>{post.likes} Likes</h6>
            {/* <h6>Liked: {post.liked ? 'Yes' : 'No'}</h6> */}
          </span>
          <span className='flex items-center ml-2'>
            <h6 className='text-[16px] font-bold cursor-pointer'>{post.created_by}</h6>
            <span className='text-[20px] font-normal ml-2'>{post.title}</span>
          </span>
          <span className="text-sm font-normal text-slate-800 mt-1 ml-2">
            <h6>{commentCounts[post.id] || 0} comments</h6>
          </span>

          {showComment === post.id && (
            <div className='w-full h-[30%] rounded-lg relative bg-slate-50'>
              <div className="absolute inset-0 bg-white p-2 rounded-lg">
                {loadingComments[post.id] ? (
                  <div>Loading...</div>
                ) : (
                  <div className='overflow-y-scroll h-[100px]'>
                    {postComments[post.id] && postComments[post.id].map((comment) => (
                      <div key={comment.id}>
                        <span className='text-[16px] font-bold cursor-pointer'>{comment.created_by}</span>
                        <p className='text-[14px] ml-2'>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className='flex items-center mt-3 gap-3 px-2'>
                  <input
                    type='text'
                    placeholder='Add a comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full px-2 py-1 rounded-md border border-slate-300'
                  />
                  <button
                    onClick={() => handleComment(post.id, post.source)}
                    className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                  >
                    Comment
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


