import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole] = useState('');
    const [error, setError] = useState(null);
    const [userTab, setUserTab] = useState(true)


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('signup request:', {
                email: email,
                password: password,
                username: username,
                role: userTab ? 'user' : 'admin',
            });

            const response = await axios.post('http://localhost:8000/api/v1/auth/create/', {
                email: email,
                password: password,
                username: username,
                role: userTab ? 'user' : 'admin',
                is_active: true
            });

            if (response.status === 201) {
                console.log("Account created successfully");
                window.location.replace('/login');
              } else {
                setError(response.data.error);
              }
              console.log('Signup request data:', { email, password, username });
        } catch (error) {
            console.log('Error signing up:', error.response.data);
            setError('Failed to sign up.Please try again.')
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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