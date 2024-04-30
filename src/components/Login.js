import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook instead of useHistory
import axios from 'axios';
import '../App.css';

export default function Login({ onLogin }) {
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (loginStatus === 'success') {
      navigate('/main'); // Redirect to main page after successful login using navigate
    }
  }, [loginStatus, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
  
    axios.post('http://localhost:8081/api/users/login', { username: username, password: password })
      .then((response) => {
        if (response.data !== "fail") {
          onLogin();
          setLoginStatus('success');
          navigate('/taskmanagement', { replace: true }); // Redirect to main page and replace current history entry
        } else {
          setShake(true);
          setTimeout(() => setShake(false), 500);
          setLoginStatus('fail');
        }
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
      });
  }
  

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          {loginStatus === 'fail' && <p className="error-message">Login failed. Please try again.</p>}
          <div className={`user-box ${shake ? 'shake' : ''}`}>
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className={`user-box ${shake ? 'shake' : ''}`}>
            <input type={showPassword ? "text" : "password"} name="password" required />
            <label>Password</label>
          </div>
          <center>
            <button type="submit">
              SEND
              <span></span>
            </button>
          </center>
        </form>
        <Link to="/registration">Register</Link>
      </div>
    </div>
  );
}
