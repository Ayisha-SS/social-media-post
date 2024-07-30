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
    let userRole = localStorage.getItem('role'); 

    console.log('User Role:', userRole);
    console.log('token',accessToken)
  return (
  
//   <Router>
//   <Routes>
//     <Route path='/' element={accessToken? <Home /> : <Navigate to="/login" replace />} /> 
//     <Route path='/login' element={accessToken? <Navigate to="/" replace /> : <Login/>}/>
//     <Route path='/signup' element={<SignUp/>}/>
//     { userRole === 'admin' && (
//       <>
//         <Route path='/my-post' element={accessToken? <MyPost /> : <Navigate to="/login" replace />} />
//         <Route path='/create' element={accessToken? <CreatePost/> : <Navigate to="/login" replace />}/>
//         <Route path="/view/:id" element={<View />} />

//       </>
//       )}
//       {userRole === 'user' && (
//         <>
//           <Route path='/view/:id' element={accessToken? <View/> : <Navigate to="/login" replace />}/>
//         </>
//       )}
//   </Routes>
// </Router>

<Router>
  <Routes>
    <Route path='/' element={ <Home /> } /> 
    <Route path='/login' element={ <Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    
        <Route path='/my-post' element={ <MyPost />} />
        <Route path='/create' element={<CreatePost/> }/>
        <Route path="/view/:id" element={<View />} />

     
          <Route path='/view/:id' element={ <View/>}/>
      
      
  </Routes>
</Router>
 
);
}


export default App;
