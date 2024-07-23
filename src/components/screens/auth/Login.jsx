import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userTab, setUserTab] = useState(true)


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      console.log('Login request:', {
        username: email,
        password: password,
      });

      const requestData = {
        username: email,
        password: password,
      };
      
      console.log('Request data:', { username:email, password });

      const response = await axios.post('http://localhost:8000/api/v1/auth/token/',requestData);

      console.log('User data:', response);

      const { access, refresh } = response.data;

      localStorage.setItem('accessToken', access);

      if (userTab) {
        localStorage.setItem('userRole', 'user');
      } else {
        localStorage.setItem('userRole', 'admin');
      }


      if (userTab) {
        window.location.replace('/');
      } else {
        window.location.replace('/');
      }
    } catch (error) {
      console.error('Login error:', error.response.data);
      setError('Failed to login. Please check your credentials.');
    }
  };

  const switchToUserTab = () => {
    setUserTab(true);
  };

  const switchToAdminTab = () => {
    setUserTab(false);
  };

  return (
    <>
      <Helmet>
        <title>PostFun|Login</title>
      </Helmet>
      <div className='bg-gradient-to-r from-pink-500  to-purple-900  px-10 py-20 flex items-center justify-center min-h-screen'>
        <div className='bg-gradient-to-r from-purple-900 to-pink-500    flex flex-col justify-center items-center py-10 px-20'>
          <h1 className='text-[#fff] text-5xl font-extrabold mb-3'>Login</h1>

          <div className='flex gap-5 mb-5'>
            <button
              className={`py-2 px-4 rounded-md focus:outline-none ${userTab ? 'bg-white text-purple-900 font-semibold' : 'text-white'}`}
              onClick={switchToUserTab}
            >
              User
            </button>
            <button
              className={`py-2 px-4 rounded-md focus:outline-none ${!userTab ? 'bg-white text-purple-900 font-semibold' : 'text-white'}`}
              onClick={switchToAdminTab}
            >
              Admin
            </button>
          </div>

          <form action="" className='' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <input
                type="text"
                placeholder='Username'
                className='w-full rounded-md py-4 pl-5 pr-20 border-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder='Password'
                className='w-full rounded-md py-4 pl-5 pr-20 border-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className='w-full bg-gradient-to-r from-purple-900 to-pink-500 border border-slate-400 py-4 pl-5 pr-20 rounded-md mt-5 text-slate-400 font-medium text-xl'>Login</button>
            {error && <p>{error}</p>}
          </form>
          <div>
            <h4>New to Postfun?
              <Link to="/signup" className="text-blue-500 ml-1">Sign Up</Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login