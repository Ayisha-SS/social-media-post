import React from 'react'
import {Helmet} from "react-helmet";
import NavBar from '../../includes/navBar/NavBar';

function Home() {
  return (
    <>
        <Helmet>
            <title>Social Media</title>
        </Helmet>
        <div>
          <NavBar/>
         
        </div>
    </>
  )
}

export default Home