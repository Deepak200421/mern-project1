import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Import the CSS file
import backgroundImage5 from './background5.png'; // Import background image 5

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="background-image" style={{backgroundImage: `url(${backgroundImage5})`}}></div>
      <div className="welcome-content">
        <h1>Welcome to Our Task Management Application</h1>
        <p>
          Organize your work with us<br />
          <em>"Greatness is not where we stand, but in what direction we are moving. We are excited to embark on this journey with you."</em><br />
          
          <br />
          Sign up now and join the thousands of satisfied users who have transformed their productivity with our application.
        </p>
        <div className="buttons">
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/registration" className="register-button">Register</Link>
        </div>
      
      </div>
    </div>
  );
}
