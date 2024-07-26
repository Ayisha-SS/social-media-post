import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/screens/auth/Login';
import Home from './components/screens/home/Home';
import SignUp from './components/screens/auth/SignUp';
import MyPost from './components/screens/post/MyPost';
import CreatePost from './components/screens/post/CreatePost';
import View from './components/screens/home/View';
import ViewPost from './components/screens/post/ViewPost';



  function App() {

    const accessToken = localStorage.getItem('accessToken');
    let userRole = localStorage.getItem('userRole'); 

    console.log('User Role:', userRole);


  return (
  
  <Router>
  <Routes>
    <Route path='/' element={accessToken? <Home /> : <Navigate to="/login" replace />} /> 
    <Route path='/login' element={accessToken? <Navigate to="/" replace /> : <Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    { userRole && userRole === 'admin' && (
      <>
        <Route path='/my-post' element={accessToken? <MyPost /> : <Navigate to="/login" replace />} />
        <Route path='/create' element={accessToken? <CreatePost/> : <Navigate to="/login" replace />}/>
        <Route path="/view/:id" element={<View />} />

      </>
      )}
      {userRole && userRole === 'user' && (
        <>
          <Route path='/view/:id' element={accessToken? <View/> : <Navigate to="/login" replace />}/>
        </>
      )}
  </Routes>
</Router>
 
);
}


export default App;
