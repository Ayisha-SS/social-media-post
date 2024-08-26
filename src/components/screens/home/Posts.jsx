
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { formatDistanceToNow } from 'date-fns';
import { LuSendHorizonal } from "react-icons/lu";
import axios from 'axios';
import Cookies from 'js-cookie';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(null);
  const [postComments, setPostComments] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [loadingComments, setLoadingComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = Cookies.get('auth_token');
        const [postsData, createPostData] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/posts/', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/api/v1/createpost/', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const allPosts = [
          ...postsData.data.data.map(post => ({ ...post, source: 'posts' })),
          ...createPostData.data.map(post => ({ ...post, source: 'createpost' }))
        ];

        // Retrieve liked posts from localStorage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};

        setPosts(allPosts.map(post => ({
          ...post,
          liked: likedPosts[post.id] || false,
          likes: likeCounts[post.id] || post.likes || 0
        })));
      } catch (error) {
        console.error('Error fetching the posts:', error);
        setError('Error fetching the posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  // comment..
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const token = Cookies.get('auth_token');

        const promises = posts.map((post) =>
          axios.get(`http://localhost:8000/api/v1/comments/${post.id}/`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch((error) => {
            console.error(`Error fetching comments for post ID ${post.id}:`, error.response ? error.response.data : error.message);
            return { data: [] };
          })
        );

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
        setError('Error fetching comments. Please try again later.');
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
      const post = posts.find(p => p.id === postId);

      if (!post || !userId) {
        console.error('Missing required parameters for like request.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1/like/',
        {
          post_id: postId,
          user_id: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        }
      );

      const { message, like_count } = response.data;

      if (response.status === 201 || response.status === 200) {
        const liked = message === 'Post liked.';


        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? { ...post, likes: like_count, liked }
              : post
          )
        );


        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};

        likedPosts[postId] = liked;
        likeCounts[postId] = like_count;

        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        localStorage.setItem('likeCounts', JSON.stringify(likeCounts));

        console.log("Updated localStorage:", likedPosts);
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error liking the post:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (showComment !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showComment]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='wrapper pb-16 pt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center menu-open'>
      {posts.map(post => (
        <div key={post.id} className='flex flex-col w-full items-start pt-2 pb-4 px-2 rounded-lg hover:border hover:-translate-y-1 hover:shadow-gray-600 h-[500px] max-[768px]:h-[400px]'>
          <div className='flex items-center gap-5'>
            <span className='cursor-pointer'><FaRegCircleUser size={40} /></span>
            <span>
              <h3 className='text-2xl font-medium max-[768px]:text-[20px] max-[640px]:text-[22px] cursor-pointer'>{post.created_by}</h3>
              <h5 className='text-base font-normal'>{post.category}</h5>
            </span>
          </div>
          <div className='mt-5 w-full overflow-hidden rounded-lg h-full'>
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
                  fill: post.liked ? 'red' : 'black',
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
            <h6>{post.likes || 0} Likes</h6>
          </span>
          <span className='text-sm font-normal text-slate-800 mb-1 ml-2'>
            <h6>{commentCounts[post.id] || 0} Comments</h6>
          </span>

          {showComment === post.id && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ">
              <div className="relative w-full h-full bg-white rounded-lg overflow-hidden md:w-[600px] md:h-[80%] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">Comments</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowComment(null)}
                  >
                    &times;
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {postComments[post.id]?.map(comment => (
                    <div key={comment.id} className="border-b py-2">
                      <div className="flex items-start gap-2">
                        <FaRegCircleUser size={30} />
                        <div className='flex flex-col'>
                          <div className='flex'>
                            <h4 className="font-semibold mr-3">{comment.created_by}</h4>
                            <p>{comment.content}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4 flex items-center gap-2">
                  <input
                    type="text"
                    value={comment[post.id] || ''}
                    onChange={(e) => setComment({ ...comment, [post.id]: e.target.value })}
                    placeholder="Add a comment..."
                    className="flex-1 border rounded-lg p-2"
                  />
                  <button
                    onClick={() => handleComment(post.id, post.source)}
                    className="ml-4 bg-purple-500 text-white px-4 py-2 rounded-md"
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
};

export default Posts;
