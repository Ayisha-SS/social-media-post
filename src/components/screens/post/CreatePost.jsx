import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';

import Logo from '../../includes/navBar/Logo'
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../footer/Footer';

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);


  const handleImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);

    const username = Cookies.get('username');
    formData.append("created_by", username);
    console.log("created_by:",username);


    const token = Cookies.get('auth_token');
    console.log('Retrieved token:', token);
    
      // Log the FormData entries
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/createpost/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('Post created successfully:', response.data);
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
      alert('post created successfully')
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };


  return (

    <>
      <Helmet>
        <title>PostFun|Create</title>
      </Helmet>
      <div className='py-4 border-b-4 border-b-solid border-b-purple-500 shadow-md bg-slate-200'>
        <div className='wrapper'>
          <Logo />
        </div>
      </div>
<div className='bg-gradient-to-r from-purple-400 to-pink-200'>
      <div className='wrapper py-16 flex flex-col items-center justify-center  max-[540px]:justify-start'>
        <div className='border border-slate-500 bg-slate-300 p-5 w-[70%] max-[768px]:w-[85%] '>
          <form action="" className='flex flex-col gap-5 max-[480px]:gap-3'
            onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
              <label htmlFor="title" className='text-base font-medium '>Title</label>
              <input
                type="text"
                className='rounded-lg h-10 px-2 focus:outline-none'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label htmlFor="title" className='text-base font-medium '>Category</label>
              <input
                type="text"
                className='rounded-lg h-10 px-2 focus:outline-none'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label htmlFor="description" className='text-base font-medium'>Description</label>
              <textarea name=""
                id="description"
                className='rounded-lg h-60 px-2 focus:outline-none max-[540px]:h-40'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className='flex flex-col gap-3 '>
              <label htmlFor="imageUpload" className='text-base font-medium'>Upload an Image</label>
              <input
                type="file"
                id="imageUpload"
                className='rounded-lg h-10 px-2 flex items-center justify-center focus:outline-none'
                onChange={handleImage}
                required
              />
            </div>
          </form>
        </div>
        <div className='flex gap-2 pt-5'>
          <button className='text-base text-slate-900 py-2 px-5 bg-violet-400 rounded-full'
            onClick={() => {
              setTitle('');
              setCategory('');
              setDescription('');
              setImage(null);
            }}
          >
            Cancel</button>
          <button className='text-base text-slate-900 py-2 px-7 bg-pink-500 rounded-full'
            onClick={handleSubmit}
          >Create</button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default CreatePost;