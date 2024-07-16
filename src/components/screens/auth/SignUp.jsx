import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Login request:', {
                email: email,
                password: password,
                name: username
            });

            const response = await axios.post('http://localhost:8000/api/v1/auth/create/', {
                email: email,
                password: password,
                name: username
            });


            // console.log("Signup successfully:", response.data);
            // navigate('/login');

            if (response.status === 201) {
                console.log("Account created successfully");
                // Redirect to login page
                window.location.replace('/login');
              } else {
                setError(response.data.error);
              }
        } catch (error) {
            console.log('Error signing up:', error);
            setError('Failed to sign up.Please try again.')
        }
    };

    return (
        <>
            <Helmet>
                <title>Social Media|SignUp</title>
            </Helmet>
            <div className='bg-gradient-to-r from-pink-500  to-purple-900  px-10 py-20 flex items-center justify-center min-h-screen'>
                <div className='bg-gradient-to-r from-purple-900 to-pink-500 flex flex-col justify-center items-center py-10 px-20'>
                    <h1 className='text-[#fff] text-5xl font-extrabold mb-3'>SignUp</h1>
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