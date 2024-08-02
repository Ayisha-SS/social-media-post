import React, { useState, useEffect } from 'react'
import Logo from './Logo';
import LinkButton from '../../general/LinkButton';
import Cookies from 'js-cookie'

function NavBar() {

  const [role, setRole] = useState(null);

  useEffect(() => {
    const role = Cookies.get('jobRole');
    if (role) {
      setRole(role);
    }
  }, []);
  console.log('role:', role);


  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('jobRole');
    window.location.replace('/login')
  }
  return (
    <div className='py-4 border-b-4 border-b-purple-500 shadow-md bg-slate-200'>
      <div className='wrapper flex justify-between'>
        <Logo />
        <div className='flex gap-2 max-[360px]:flex-col'>
          {role === "ADMIN" && (

            <LinkButton to="/my-post" text="My Post"  textColor="slate-900" className="bg-gradient-to-r from-purple-600 to-pink-500"/>
          )}
          <LinkButton to="/" text="Logout" textColor="slate-900" onClick={handleLogout} className="bg-gradient-to-r from-purple-600 to-pink-500"/>
        </div>
      </div>
    </div>
  )
}

export default NavBar


