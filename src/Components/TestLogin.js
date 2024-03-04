import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const TestLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  //const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const hashPassword = async (password) => {
    const sha256 = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest('SHA-256', sha256);

    const hashArray = Array.from(new Uint8Array(hash));

    const randomLetters = Array.from({ length: 2 }, () =>
      String.fromCharCode(97 + Math.floor(Math.random() * 26))
    );
    hashArray.push(...randomLetters.map((letter) => letter.charCodeAt(0)));

    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async () => {
    try {
      if (username.trim() === '' && password.trim() === '') {
        
        toast.error('Username and password are required.'); // Show a toast
        return;
      }

      if(username.trim() === ''){
        toast.error('Username is required.'); // Show a toast
        return;
      }

      if(password.trim() === ''){
        toast.error('Password is required.'); // Show a toast
        return;
      }
  
      const hashedPassword = await hashPassword(password);
  
      const response = await axios.post('https://localhost:44389/api/Users/login', {
        Username: username,
        Password: hashedPassword,
      });
  
      const { data, status } = response;
  
      if (status === 200) {
        const token = data;
        const decodedToken = jwtDecode(token);
        const roleName = decodedToken?.RoleName;
        const userEmail = decodedToken?.Email;
  
        localStorage.setItem('roleName', roleName);
        localStorage.setItem('token', token);
  
        try {
          const userDetailsResponse = await axios.get(
            `https://localhost:44389/api/Users/GetUserByEmail/${userEmail}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          const userDetails = userDetailsResponse.data;
          const userId = userDetailsResponse.data.userId;
  
          localStorage.setItem('userId', userId);
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
        } catch (error) {
          console.log('Token is required');
        }
  
        localStorage.setItem('r', 'Authorized');
        setLoggedIn(true);
        navigate(`/home`);
      } else {
        setLoggedIn(false);
        
        toast.error('Email or Password is Incorrect'); // Show a toast
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setLoggedIn(false);
  
      if (error.response && error.response.data) {
        // Use the specific error message from the backend
        
        toast.error(error.response.data); // Show a toast
      } else {
        
        toast.error('Login Failed. Please try again.'); // Show a toast
      }
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <ToastContainer />
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label className="password-label">
          Password:
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle-button"
            >
              {showPassword ? '👁️' : '👁️‍🗨'}
            </button>
          </div>
        </label>
        <br />
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>

        <br />

        <p>
          New User? <Link to="/registeruser">Register Here</Link>
        </p>

        {/* {isLoggedIn ? null : (
          <p
            style={{
              fontWeight: 'bold',
              color: 'red',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            {loginError}
          </p>
        )} */}
      </form>
    </div>
  );
};

export default TestLogin;
