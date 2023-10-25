import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { useAuth } from './AuthContext';

import {
  signInWithGooglePopup,
  createuserdocfromAuth,
  signinAuthUserWithEmailAndPassword,
} from './utils/firebase';

function Login() {
  const { login, isAuthenticated } = useAuth(); // Use useAuth to access authentication state

  const navigate = useNavigate();

  const userlogGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createuserdocfromAuth(user);
      login();
      navigate('/');
    } catch (error) {
      console.log('error in Google login', error.message);
    }
  }

  const [contact, setContact] = useState({
    email: '',
    password: '',
  });
  const { email, password } = contact;

  async function handleClick(event) {
    try {
      const response = await signinAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      login();
  
      // Save user's login status to local storage
      localStorage.setItem('isLoggedIn', 'true');
  
      navigate('/logout');
    } catch (error) {
      console.log('error in login', error.message);
    }
  }
  

  function handlePass(event) {
    const value = event.target.value;
    const name = event.target.name;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const goToNavigationPage = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <Input
        name="email"
        type="email"
        placeholder="email"
        onChange={handlePass}
      />
      <br></br>
      <Input
        name="password"
        type="password"
        placeholder="password"
        onChange={handlePass}
      />
      <br></br>
      <button className="button2" onClick={handleClick}>
        Login
      </button>
      <br></br>
      <button className="button2" onClick={userlogGoogle}>
        Login with Google
      </button>
      <br></br>
      {!isAuthenticated && (
        <Link to="/signup">Signup Instead</Link>
      )}
    </div>
  );
}

export default Login;