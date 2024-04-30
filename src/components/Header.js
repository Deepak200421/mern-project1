import React from 'react';

const Header = () => {
  // Function to handle redirection to welcome page
  const redirectToWelcomePage = () => {
    // Redirect logic goes here
    console.log("Redirecting to welcome page...");
  };

  return (
    <header style={{ backgroundColor: '#333', color: '#fff', padding: '40px', textAlign: 'center', cursor: 'pointer' }} onClick={redirectToWelcomePage}>
      <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Task Management</h1>
    </header>
  );
};

export default Header;
