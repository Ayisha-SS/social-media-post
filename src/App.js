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
    let role = localStorage.getItem('role'); 


    if (!role) {
      role = ''; 
    }

  return (
   
    <Router>
    <Routes>
      <Route path='/' element={accessToken? <Home /> : <Navigate to="/login" replace />} /> 
      <Route path='/login' element={accessToken? <Navigate to="/" replace /> : <Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      {role && role === 'admin' && (
        <>
          <Route path='/my-post' element={accessToken? <MyPost /> : <Navigate to="/login" replace />} />
          <Route path='/create' element={accessToken? <CreatePost/> : <Navigate to="/login" replace />}/>

        </>
        )}
        {role === 'user' && (
          <>
            <Route path='/view/:id' element={accessToken? <View/> : <Navigate to="/login" replace />}/>
          </>
        )}
    </Routes>
  </Router>
);
}

// function App() {
//   const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
//   const [role, setRole] = useState(localStorage.getItem('role'));

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={accessToken && role === 'user' ? <Home /> : <Navigate to="/login" replace />} />
//         <Route path="/login" element={accessToken ? <Navigate to="/" replace /> : <Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         {role === 'admin' && (
//           <>
//             <Route path="/my-post" element={<MyPost />} />
//             <Route path="/create" element={<CreatePost />} />
//             <Route path="/view/:id" element={<View />} />
//             <Route path="/view-post/:id" element={<ViewPost />} />
//           </>
//         )}
//         {role === 'user' && (
//           <>
//             <Route path="/view/:id" element={<View />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }



export default App;
