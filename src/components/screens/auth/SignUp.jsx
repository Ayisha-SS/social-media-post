import React from 'react'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';


function SignUp() {
  return (
    <>
    <Helmet>
    <title>Social Media|SignUp</title>
</Helmet>
    <div className='bg-gradient-to-r from-pink-500  to-purple-900  px-10 py-20 flex items-center justify-center min-h-screen'>
        <div className='bg-gradient-to-r from-purple-900 to-pink-500    flex flex-col justify-center items-center py-10 px-20'>
            <h1 className='text-[#fff] text-5xl font-extrabold mb-3'>SignUp</h1>
            <form action="" className=''>
                <div className='flex flex-col gap-2'>
                    <input type="text" placeholder='Enter username' className='w-full rounded-md py-4 pl-5 pr-20 border-none'/>
                    <input type="text" placeholder='Enter email' className='w-full rounded-md py-4 pl-5 pr-20 border-none'/>               
                    <input type="password" placeholder='Enter password' className='w-full rounded-md py-4 pl-5 pr-20 border-none'/>
                </div>
                <button type="submit" className='w-full bg-gradient-to-r from-purple-900 to-pink-500 border border-slate-400 py-4 pl-5 pr-20 rounded-md mt-5 text-slate-400 font-medium text-xl'>SignUp</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default SignUp