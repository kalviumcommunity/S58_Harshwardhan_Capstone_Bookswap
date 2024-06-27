import React, { useState } from 'react';
import './LoginPage.css';
import Eye from '../assets/Eye.png';
import EyeSlash from '../assets/faEye.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userDoesNotExist, setUserDoesNotExist] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Attempting login for username:', username);
      const loginResponse = await axios.post('http://localhost:3000/login', {

        username,
        password,
      });

      if (loginResponse.status === 200) {
        console.log('Login successful for username:', username);
        document.cookie = `username=${username}; max-age=900000; path=/`;
        localStorage.setItem('isLoggedIn', 'true');
        
        navigate('/');
      } else {
        console.log('Login failed with status:', loginResponse.status);
        setUserDoesNotExist(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid username or password');
      } else {
        console.error('An error occurred while logging in:', error);
      }
      setUserDoesNotExist(true);
    }

  };

  return (
    <>
      <nav>
      </nav>
      <div id='login-div'>

        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <input type="text" id="name" name="name" required placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <div className="password-container">
            <input type={passwordVisible ? "text" : "password"} id="password" name="password" required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <img src={passwordVisible ? EyeSlash : Eye} alt="Toggle Visibility" onClick={togglePasswordVisibility} className="toggle-password" />
          </div>
          <button type="submit">Login</button>

        </form>
      </div>
      {userDoesNotExist && (
        
        <div id='go_to_signup'>
          <p>Invalid username or password. Please try again or sign up if you don't have an account.</p>
          <button onClick={() => navigate('/signup')}>Go to Sign Up</button>
        </div>
        
      )}
    </>
  );
}

export default LoginPage;