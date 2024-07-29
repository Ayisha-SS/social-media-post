import React from 'react'
import { Link } from 'react-router-dom';
import Logo from './Logo';
import LinkButton from '../../general/LinkButton';


function NavBar() {

  let role = localStorage.getItem('role'); 

  const handleLogout =() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.replace('/login')
  }
  return (
    <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
    <div className='wrapper flex justify-between'>  
        <Logo/>
        <div className='flex gap-2 max-[360px]:flex-col'>
          { role === "admin" && (

            <LinkButton to="/my-post" text="My Post" gradientFrom="purple-600" gradientTo="pink-500" textColor="slate-900"/>
          )}
            <LinkButton to="/" text="Logout" gradientFrom="purple-600" gradientTo="pink-500" textColor="slate-900" onClick={handleLogout}/>
        </div>
    </div>
    </div>
  )
}

export default NavBar