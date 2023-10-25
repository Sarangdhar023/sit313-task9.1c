import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth
import Login from './Login';
import Signup from './Signup';
import Navigation from './Navigation';
import SignSuccess from './SignSuccess';
import Logout from './Logout';

function App() {
  const { isAuthenticated, login, logout } = useAuth(); // Use useAuth to access authentication state

  return (
    <Routes>
      <Route path='/' element={<Navigation />} />
      <Route path='/login' element={<Login loginSuccess={login} isAuthenticated={isAuthenticated} />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signsuccess' element={<SignSuccess />} />
        <Route path='/logout' element={<Logout isAuthenticated={isAuthenticated} handleLogout={logout} />} />

    </Routes>
  );
}

export default App;