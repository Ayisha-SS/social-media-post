
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/screens/auth/Login';
import Home from './components/screens/home/Home';
import SignUp from './components/screens/auth/SignUp';
import MyPost from './components/screens/post/MyPost';
import CreatePost from './components/screens/post/CreatePost';
import View from './components/screens/home/View';
import Cookies from 'js-cookie'

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const role = Cookies.get('jobRole');
    if(role){
      setRole(role);
    }
  },[]);

  console.log('role from cookies:',role);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {role === 'USER' && (
          <Route path="/view/:id" element={<View />} />
        )}
        {role === 'ADMIN' && (
          <>
            <Route path='/my-post' element={<MyPost />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path="/view/:id" element={<View />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
