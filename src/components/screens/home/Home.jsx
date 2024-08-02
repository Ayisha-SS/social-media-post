import React from 'react'
import {Helmet} from "react-helmet";
import NavBar from '../../includes/navBar/NavBar';
import Posts from './Posts';
import Footer from '../../footer/Footer';

function Home() {


  return (
    <>
        <Helmet>
            <title>PostFun</title>
        </Helmet>
        <div className='bg-gradient-to-r from-purple-400 to-pink-200'>
          <NavBar/>
          <Posts/>
        </div>
          <Footer/>
    </>
  )
}

export default Home