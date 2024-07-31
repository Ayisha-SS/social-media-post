
import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignUp() {

  const [userName, setUserName] = useState('');
  const [jobRole, setJobRole] = useState('default');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userTab, setUserTab] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const role = userTab? 'USER' : 'ADMIN';
      setJobRole(role);
      console.log('signup request:', {
        email: email,
        password: password,
        username: userName,
        role: role
      });

      // const formData = new FormData();
      // formData.append('username', userName);
      // formData.append('email', email);
      // formData.append('password', password);
      // formData.append('role', role);


      const data = {
        username: userName,
        email: email,
        password: password,
        role: role
      };

      const response = await axios.post('http://localhost:8000/api/v1/auth/create/', data, {
        headers: {
            'Content-Type': 'application/json'
          },  
      });
      console.log('response:',response);

      if (response.data.status_code === 6000) {
        console.log("Account created successfully");
        navigate('/login', { replace: true });
      } else if (response.data.status_code === 6001) {
        console.error('Error signing up:', response.data);
        setError(response.data.message);
      }
      console.log('Signup request data:', { email, password, userName, role });
    } catch (error) {
      console.log('Error signing up:', error);
      setError('Failed to sign up. Please try again.');
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
        <title>PostFun|Signup</title>
      </Helmet>
      <div className='bg-gradient-to-r from-pink-500  to-purple-900  px-10 py-20 flex items-center justify-center min-h-screen'>
        <div className='bg-gradient-to-r from-purple-900 to-pink-500 flex flex-col justify-center items-center py-10 px-20'>
          <h1 className='text-[#fff] text-5xl font-extrabold mb-3'>SignUp</h1>
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
                placeholder='Enter username'
                className='w-full rounded-md py-4 pl-5 pr-20 border-none'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder='Enter email'
                className='w-full rounded-md py-4 pl-5 pr-20 border-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder='Enter password'
                className='w-full rounded-md py-4 pl-5 pr-20 border-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className='w-full bg-gradient-to-r from-purple-900 to-pink-500 border border-slate-400 py-4 pl-5 pr-20 rounded-md mt-5 text-slate-400 font-medium text-xl'>
              SignUp
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp