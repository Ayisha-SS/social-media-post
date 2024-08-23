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
    <div className='py-3 fixed top-0 left-0 right-0 z-10 border-b-2 border-b-purple-500 shadow-2xl bg-slate-100'>
      <div className='wrapper flex justify-between'>
        <Logo />
        <div className='flex gap-2 max-[480px]:flex-col'>
          {role === "ADMIN" && (

            <LinkButton to="/my-post" text="My Post" textColor="slate-900" className="bg-gradient-to-r from-purple-600 to-pink-500" />
          )}
          <LinkButton to="/" text="Logout" textColor="slate-900" onClick={handleLogout} className="bg-gradient-to-r from-purple-600 to-pink-500" />
        </div>
      </div>
    </div>
  )
}

export default NavBar

