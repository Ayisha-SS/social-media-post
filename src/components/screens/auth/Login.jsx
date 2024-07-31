
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Login request:', {
        username: username,
        password: password,  
      });

     const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/token/', {
        username: username,
        password: password
      });
      console.log('Response:', response);

      if (response.status === 200) {
        const token = response.data.access;
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/profile/', {
            username: username
          });
          Cookies.set('user_details', JSON.stringify(res.data.data));
          Cookies.set('username', `${res.data.data.username}`);
          Cookies.set('jobRole', `${res.data.data.role}`);
          Cookies.set('auth_token', token, { secure: true, sameSite: 'Strict' });
          console.log(token);
          console.log(res.data.data.role);
          window.location.href = '/';
        } catch (error) {
          console.log('user details error');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      setError('Login error. Please check your credentials and try again.');
    }
  };


  return (
    <>
      <Helmet>
        <title>PostFun|Login</title>
      </Helmet>
      <div className='bg-gradient-to-r from-pink-500  to-purple-900  px-10 py-20 flex items-center justify-center min-h-screen'>
        <div className='bg-gradient-to-r from-purple-900 to-pink-500    flex flex-col justify-center items-center py-10 px-20'>
          <h1 className='text-[#fff] text-5xl font-extrabold mb-3'>Login</h1>
          <form action="" className='' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <input
                type="text"
                placeholder='Username'
                className='w-full rounded-md py-4 pl-5 pr-20 border-none'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder='Password'
                className='w-full rounded-md py-4 pl-5 pr-20 border-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className='w-full bg-gradient-to-r from-purple-900 to-pink-500 border border-slate-400 py-4 pl-5 pr-20 rounded-md mt-5 text-slate-400 font-medium text-xl '>Login</button>
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