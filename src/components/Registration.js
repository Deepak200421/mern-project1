import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [registrationStatus, setRegistrationStatus] = useState(null); // State to track registration status

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios.post('http://localhost:8081/api/users/register', {
      username: data.get('username'),
      password: data.get('password'),
      email: data.get('email'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName')
    }).then((response) => {
      console.log(response.data);
      setRegistrationStatus(response.data.status); // Update registration status
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="signup-background">
        <Container component="main" maxWidth="xs" className="form-container">
          <div className="form">
            <Typography component="h1" variant="h5" className="title">Register</Typography>
            {registrationStatus === 'success' && <Typography component="p" variant="body1" className="success-message">Registration successful!</Typography>}
            <Typography component="p" variant="body1" className="message">
              Signup now and get full access to our app.
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <label>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    placeholder=" "
                    InputProps={{ style: { color: 'white' } }} // Set text color to white
                  />
                  <span>Username</span>
                </label>
                <label>
                  <TextField
                    autoComplete="new-password" // Use new-password for password fields
                    name="password"
                    required
                    fullWidth
                    id="password"
                    placeholder=" "
                    InputProps={{ style: { color: 'white' } }} // Set text color to white
                    type="password"
                  />
                  <span>Password</span>
                </label>
              </div>
              <label>
                <TextField
                  autoComplete="email"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  placeholder=" "
                  InputProps={{ style: { color: 'white' } }} // Set text color to white
                />
                <span>Email</span>
              </label>
              <label>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  id="firstName"
                  name="firstName"
                  placeholder=" "
                  InputProps={{ style: { color: 'white' } }} // Set text color to white
                />
                <span>First Name</span>
              </label>
              <label>
                <TextField
                  autoComplete="family-name"
                  fullWidth
                  id="lastName"
                  name="lastName"
                  placeholder=" "
                  InputProps={{ style: { color: 'white' } }} // Set text color to white
                />
                <span>Last Name</span>
              </label>
              <Button type="submit" fullWidth variant="contained" className="submit">
                Sign Up
              </Button>
              <p className="signin">Already have an account? <Link to="/login">Sign in</Link></p>
            </form>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}
