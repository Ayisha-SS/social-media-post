
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
import { LikedPostsContext } from '../../context/Context';


function View() {

  const [views, setViews] = useState(null);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [commentCounts, setCommentCounts] = useState(0);

  const { id, modelName, contentType, } = useParams();

  const { likedPosts, handleLike } = useContext(LikedPostsContext)

  const likeCount = likedPosts[id] || 0;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/${modelName}/view/${id}/`);
        setViews(response.data.data);
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };
    fetchPost();
  }, [id, modelName]);



  // Fetch comments for the post
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

  if (!views) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>PostFun | View</title>
      </Helmet>
      <div className="py-4  fixed top-0 left-0 right-0 border-b-2 bg-slate-100 border-b-solid border-b-purple-500 shadow-2xl">
        <div className="wrapper">
          <Logo />
        </div>
      </div>
      <div className="pb-10 bg-gradient-to-r from-purple-400 to-pink-200 ">
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
            <div className="mt-5 flex justify-center items-center w-[100%] overflow-hidden rounded-lg  ">
              <img src={views.image} alt={views.id} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3 mt-3 ml-">

              <span className='hover:text-slate-400'>
                <PiHeartStraightDuotone
                  size={25}
                  style={{
                    fill: likedPosts[id] === 1 ? 'red' : 'black',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleLike(id)}
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
              <h6 className=''>{likedPosts[id] || 0} Likes</h6>
              {/* <h6> {commentCounts} comments </h6> */}
            </span>
            <div className="flex flex-col gap- my-2 w-full">
              <span className='flex items-center mb-2'>
                <h6 className='text-[14px] font-bold cursor-pointer'>{views.created_by}</h6>
                <span className="text-[18px] font-normal ml-2 ">{views.title}</span>
              </span>
              <span className="text-sm font-normal text-slate-800 mt-">
                {/* <h6 className=''>{likedPosts[id] || 0} Likes</h6> */}
                <h6> {commentCounts} comments </h6>
              </span>
              <span className="text-base font-normal  text-justify mt-4 w-[100%]">
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
                    <input
                      type="text"
                      className="flex-grow border border-gray-300 rounded-md px-4 py-2"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      className="ml-4 bg-purple-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleComment(views.id)}
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
