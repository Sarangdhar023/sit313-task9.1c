import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './utils/firebase';
import { useAuth } from './AuthContext';

function Logout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null); // Initialize currentUser state
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check local storage for login status

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Update the currentUser state when the authentication state changes
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (currentUser && currentUser.email) {
      if (window.confirm('Are you sure you wish to logout of ${currentUser.email}?')) {
        try {
          await auth.signOut();
          logout();
          localStorage.setItem('isLoggedIn', 'false'); // Update login status in local storage
          navigate('/');
        } catch (error) {
          console.log('Error logging out', error);
        }
      }
    } else {
      console.log('No user is logged in.');
    }
  };

  return (
    <div className="header">
      {isLoggedIn ? (
        <div>
          {currentUser && currentUser.email ? (
            <p>You are currently logged in as: {currentUser.email}</p>
          ) : null}
          <button className="button2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>No user is logged in. Please log in to access the features.</p>
          <button className="button2" onClick={() => navigate('/login')}>
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default Logout;