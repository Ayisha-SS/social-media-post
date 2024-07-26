import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      console.log('Login request:', {
        username: email,
        password: password,
        
      });

      const requestData = new URLSearchParams();
      requestData.append('username', email);
      requestData.append('password', password);
      
      console.log('Request data:', { username:email, password });

      const response = await axios.post('http://localhost:8000/api/v1/auth/token/',requestData);

      console.log('User data:', response);


      if (response && response.data) {
        const { access, refresh,role } = response.data;
 

        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('userRole', role);

        
        console.log('login role',role)

        if (role === 'admin') {
          navigate('/', { replace: true });
        } else if (role === 'user') {
          navigate('/user-dashboard', { replace: true });
        } else {
          setError('Invalid user role');
        }
        // navigate('/');
      } else {
        setError('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login. Please check your credentials.');
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