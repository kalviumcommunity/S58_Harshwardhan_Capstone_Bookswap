import React, { useState } from 'react';
import './SignUp.css';
import Eye from '../assets/Eye.png';
import EyeSlash from '../assets/faEye.png';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/Users/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {

        // Handle success response
        navigate('/');
        console.log("SignUp successful");
      } else if (response.status === 400 && data.msg === "User already exists") {
        // User already exists, show appropriate message
        setSignupError('User already exists. Please log in.');
      } else {

        // Handle other server errors or invalid responses
        console.error("SignUp failed");
        setSignupError('Sign up failed. Please try again.');

      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
      setSignupError('Network error. Please try again later.');
    }
  };


  return (
    <>
      <nav></nav>
      <div id='signup-div'>
          <form onSubmit={handleSubmit}>

              <h1>SignUp Form</h1>
              <input type="text" id="name" name="name" required placeholder='Username' value={name} onChange={(e) => setName(e.target.value)}/>
              <input type="email" id="email" name="email" required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <div className="password-container">

                <input type={passwordVisible ? "text" : "password"} id="password" name="password" value={password} onChange={handlePasswordChange} required placeholder='Password'/>
                <img src={passwordVisible ? EyeSlash : Eye} alt="Toggle Visibility" onClick={togglePasswordVisibility} className="toggle-password"/>
              </div>
              
              <div className="password-container">
                <input type={confPasswordVisible ? "text" : "password"} id="conf-password" name="conf-password" value={confPassword} onChange={handleConfPasswordChange} required placeholder='Confirm Password'/>
                <img src={confPasswordVisible ? EyeSlash : Eye} alt="Toggle Visibility" onClick={toggleConfPasswordVisibility} className="toggle-password"/>
              </div>

              {passwordError && <div className="password-error">{passwordError}</div>}
              {signupError && <div className="signup-error">{signupError} <Link to="/login">Go to Login</Link></div>}
              <button type="submit">SignUp</button>

          </form>
      </div>
    </>
  );
}

export default SignUp;
