
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { LuSendHorizonal } from "react-icons/lu";
import { useParams, useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logo from '../../includes/navBar/Logo';
import Footer from '../../footer/Footer';


function View() {
  const [views, setViews] = useState(null);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [commentCounts, setCommentCounts] = useState(0);

  const { id } = useParams();
  const location = useLocation();
  const { modelName } = location.state;


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/${modelName}/view/${id}/`);
        const post = response.data.data;

        // Retrieve liked posts from localStorage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};

        setViews({
          ...post,
          liked: likedPosts[post.id] || false,
          likes: likeCounts[post.id] || post.likes || 0
        });
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };
    fetchPost();
  }, [id, modelName]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = Cookies.get('auth_token');
        const response = await axios.get(`http://localhost:8000/api/v1/comments/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPostComments(response.data);
        setCommentCounts(response.data.length);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [id]);

  const getContentTypeId = (modelName) => {
    const contentTypeMap = {
      'createpost': 7,
      'viewpost': 8,
    };
    return contentTypeMap[modelName?.toLowerCase()] || 8;
  };

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
          object_id: id,
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

  const handleLike = async (postId) => {
    try {
      const token = Cookies.get('auth_token');
      const userId = Cookies.get('user_id');

      if (!userId) {
        console.error('User ID is missing.');
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

        setViews((prevPost) => ({
          ...prevPost,
          likes: like_count,
          liked
        }));

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};

        likedPosts[postId] = liked;
        likeCounts[postId] = like_count;

        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error liking the post:', error.response ? error.response.data : error.message);
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
      <div className="py-4 fixed top-0 left-0 right-0 border-b-2 z-10 bg-slate-100 border-b-solid border-b-purple-500 shadow-2xl">
        <div className="wrapper">
          <Logo />
        </div>
      </div>
      <div className="pb-10 bg-gradient-to-r from-purple-400 to-pink-200">
        <div className="wrapper pb-16 pt-[100px] flex items-center justify-center">
          <div className="flex flex-col py-2 items-start justify-center h-full border-y-2 p-2 w-[80%] px-7">
            <div className="flex items-center gap-5">
              <span className='cursor-pointer'>
                <FaRegCircleUser size={50} />
              </span>
              <span>
                <h3 className="text-2xl font-medium cursor-pointer">{views.created_by}</h3>
                <h5 className="text-base font-normal">{views.category}</h5>
              </span>
            </div>
            <div className="mt-5 flex justify-center items-center w-[100%] overflow-hidden rounded-lg">
              <img src={views.image} alt={views.id} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3 mt-3 ml-">
              <span className='hover:text-slate-400'>
                <PiHeartStraightDuotone
                  size={25}
                  style={{
                    fill: views.liked ? 'red' : 'black',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleLike(views.id)}
                  title='like'
                />
              </span>
              <span
                onClick={() => setShowComment(!showComment)}
                className='cursor-pointer hover:text-slate-600'
                title='Comment'
              >
                <FaRegComment size={25} />
              </span>
              <span className='cursor-pointer hover:text-slate-600' title='Share'>
                <LuSendHorizonal size={25} />
              </span>
            </div>
            <span className="text-sm font-normal text-slate-800 mt-2">
              <h6>{views.likes} Likes</h6>
              <h6>{commentCounts} comments</h6>
            </span>
            <div className="flex flex-col gap- my-2 w-full">
              <span className='flex items-center mb-2'>
                <h6 className='text-[14px] font-bold cursor-pointer'>{views.created_by}</h6>
                <span className="text-[18px] font-normal ml-2 ">{views.title}</span>
              </span>
              <span className="text-base font-normal text-justify mt-4 w-[100%]">
                {views.description}
              </span>
            </div>
            <span className="text-sm font-normal text-slate-500 mt-5">
              {formatDistanceToNow(new Date(views.created_at), { addSuffix: true })}
            </span>

            {showComment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="relative w-full h-full bg-white rounded-lg overflow-hidden md:w-[600px] md:h-[80%] flex flex-col">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Comments</h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowComment(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {postComments.map((comment) => (
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
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 border rounded-lg p-2"
                    />
                    <button
                      onClick={handleComment}
                      className="ml-4 bg-purple-500 text-white px-4 py-2 rounded-md"
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
