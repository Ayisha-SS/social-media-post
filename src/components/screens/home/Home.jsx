import React from 'react'
import {Helmet} from "react-helmet";
import NavBar from '../../includes/navBar/NavBar';
import Posts from './Posts';

function Home() {


  return (
    <>
        <Helmet>
            <title>PostFun</title>
        </Helmet>
        <div>
          <NavBar/>
          <Posts/>
        </div>
    </>
  )
}

export default Home