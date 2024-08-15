
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/screens/auth/Login';
// import Home from './components/screens/home/Home';
// import SignUp from './components/screens/auth/SignUp';
// import MyPost from './components/screens/post/MyPost';
// import CreatePost from './components/screens/post/CreatePost';
// import View from './components/screens/home/View';
// import Cookies from 'js-cookie'

// function App() {
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const role = Cookies.get('jobRole');
//     if(role){
//       setRole(role);
//     }
//   },[]);

//   console.log('role from cookies:',role);

//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/signup' element={<SignUp />} />
//         {role === 'USER' && (
//           <Route path="/view/:id" element={<View />} />
//         )}
//         {role === 'ADMIN' && (
//           <>
//             <Route path='/my-post' element={<MyPost />} />
//             <Route path='/create' element={<CreatePost />} />
//             <Route path="/view/:id" element={<View />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/screens/auth/Login';
import Home from './components/screens/home/Home';
import SignUp from './components/screens/auth/SignUp';
import MyPost from './components/screens/post/MyPost';
import CreatePost from './components/screens/post/CreatePost';
import View from './components/screens/home/View';
import Cookies from 'js-cookie';

function App() {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    const role = Cookies.get('jobRole');
    if (token && role) {
      setIsAuthenticated(true);
      setRole(role);
    }
  }, []);

  console.log('role from cookies:', role);
  console.log('isAuthenticated:', isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path='/signup' element={!isAuthenticated ? <SignUp /> : <Navigate to="/" replace />} />
        {isAuthenticated && role === 'USER' && (
          <>          <Route path='/' element={<Home />} />
          <Route path="/view/:id" element={<View />} />
          {/* <Route path="/view/:modelName/:id" element={<View />} /> */}
          </>

        )}
        {isAuthenticated && role === 'ADMIN' && (
          <>
          <Route path='/' element={<Home />} />
            <Route path='/my-post' element={<MyPost />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path="/view/:id" element={<View />} />
          </>
        )}
        {isAuthenticated && (
          <Route path="/my-post" element={<MyPost />} />
        )}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
