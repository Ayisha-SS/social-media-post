
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCircleUser, FaRegComment } from "react-icons/fa6";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { LuSendHorizonal } from "react-icons/lu";
import axios from 'axios';
import Cookies from 'js-cookie';
import { LikedPostsContext } from '../../context/Context';
import { Helmet } from "react-helmet";
import Logo from '../../includes/navBar/Logo';
import LinkButton from '../../general/LinkButton';
import Footer from '../../footer/Footer';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(null);
  const [postComments, setPostComments] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const { likedPosts, handleLike } = useContext(LikedPostsContext);
  const navigate = useNavigate();

  const token = Cookies.get('auth_token');
  const currentUsername = Cookies.get('username');

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/api/v1/createpost/');
        const userPosts = response.data.filter(post => post.created_by === currentUsername);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentUsername]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const promises = posts.map((post) =>
          axiosInstance.get(`http://localhost:8000/api/v1/comments/${post.id}/`).catch((error) => {
            console.error(`Error fetching comments for post ID ${post.id}:`, error.response ? error.response.data : error.message);
            return { data: [] };
          })
        );

        const responses = await Promise.all(promises);

        const comments = responses.reduce((acc, response, index) => {
          acc[posts[index].id] = response.data;
          return acc;
        }, {});

        const counts = responses.reduce((acc, response, index) => {
          acc[posts[index].id] = response.data.length;
          return acc;
        }, {});

        setPostComments(comments);
        setCommentCounts(counts);
      } catch (error) {
        console.error('Error fetching comments:', error);
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

  const handleComment = async (postId) => {
    try {
      const contentTypeId = getContentTypeId('createpost');

      if (!contentTypeId || !comment || !postId) {
        console.error('Invalid content type or missing data');
        return;
      }

      const response = await axiosInstance.post('http://localhost:8000/api/v1/comments/', {
        content_type: contentTypeId,
        object_id: postId,
        content: comment,
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

  const getLinkPath = (modelName, postId) => {
    if (modelName === 'createpost' || modelName === 'posts') {
      return `/view/${postId}`;
    } else {
      return `/${modelName}/view/${postId}`;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>PostFun | My Posts</title>
      </Helmet>
      <div className='py-4 fixed top-0 left-0 right-0 border-b-2 border-b-solid border-b-purple-500 shadow-2xl bg-slate-100'>
        <div className='wrapper flex justify-between'>
          <Logo/>
         <LinkButton to="/create" text="Create Post" className="bg-gradient-to-r from-purple-600 to-pink-500 " textColor="slate-900"/>
        </div>
      </div>
      <div>
      <div className='wrapper pb-16 pt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-center'>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className='flex flex-col py-2 w-full items-start rounded-lg p-4 hover:bg-gradient-to-r from-purple-100 to-pink-100'>
              <div className='flex items-center gap-5'>
                {/* <span className='cursor-pointer'><FaRegCircleUser size={40} /></span> */}
                <span>
                <span className='text-xl font-bold mt-3'>{post.title}</span>
                  <h5 className='text-base font-normal'>{post.category}</h5>
                </span>
              </div>
              <div className='mt-5 w-full overflow-hidden rounded-lg '>
              <img src={post.image} alt={post.title} className='w-full h-[500px] aspect-square object-fill max-[768px]:h-[400px] max-[640px]:h-[300px]' />
              </div>
              <div className='flex gap-3 mt-3'>
                <span className='hover:text-slate-400'>
                  <PiHeartStraightDuotone
                    size={25}
                    style={{
                      fill: likedPosts[post.id] === 1 ? 'red' : 'black',
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
                <span className='cursor-pointer hover:text-slate-600' title='Share'>
                  <LuSendHorizonal size={25} />
                </span>
              </div>
              <span className="text-sm font-normal text-slate-800 mt-2 mb-1">
                <h6>{likedPosts[post.id] || 0} Likes</h6>
              </span>
              <span className='flex items-center'>
                <h6 className='text-[16px] font-bold cursor-pointer'>{post.created_by}</h6>
                <span className='text-[20px] font-normal ml-2'>{post.title}</span>
              </span>
              <span className="text-sm font-normal text-slate-800 mt-1">
                <h6>{commentCounts[post.id] || 0} comments</h6>
              </span>
              <span className="text-base font-normal  text-justify mt-4 w-[100%]">
                {post.description}
              </span>
              <span className="text-sm font-normal text-slate-500 mt-5">{post.created_at}</span>

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
                    <div className="border-t p-4 flex items-center">
                      <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded-md px-4 py-2"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        className="ml-4 bg-purple-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleComment(post.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))
        ) : (
          <div>No posts found</div>
        )}
      </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MyPosts;
