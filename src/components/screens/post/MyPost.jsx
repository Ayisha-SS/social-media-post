import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../includes/navBar/Logo'
import LinkButton from '../../general/Link';


function MyPost() {
  return (
    <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
         <div className='wrapper flex justify-between'>
            <Logo/>
            {/* <Link to="/create">Create Post</Link> */}
            <LinkButton to="/create" text="Create Post" gradientFrom="purple-600" gradientTo="pink-500" textColor="slate-900"/>
        </div>
    </div>
  )
}

export default MyPost