import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(true);  
  const[data,setData]=useState();

  useEffect(()=>{

  },[data]);
  

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

    // Add two random letters to the end
    const randomLetters = Array.from({ length: 2 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))); // 'a' to 'z'
    hashArray.push(...randomLetters.map(letter => letter.charCodeAt(0)));

    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  };

 

  const handleLogin = async () => {
    try {
      // Hash the password before sending it to the server
      const hashedPassword = await hashPassword(password);

      console.log(hashedPassword);

      // Make a POST request to your backend API for login
      const response = await axios.post('https://localhost:44389/api/Users/login', {
        Username: username,
        Password: hashedPassword,
      });

      console.log(response); 

      console.log(response.data.user.roleName);

      const roleName = response.data.user.roleName;

      console.log(roleName);

      localStorage.setItem('roleName', roleName)

      console.log(response.data.token);

      const token = response.data.token;

      localStorage.setItem('token', token);

      const userName = response.data.user.userName;

      localStorage.setItem('userName', userName);


      // Assuming the API returns a user object in the response
      const user = response.data;

      //console.log(user);

      // Store the user object in local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Fetch user details based on the username
      const userDetailsResponse = await axios.get(`https://localhost:44389/api/Users/GetUserByUsername/${username}`);

      // Assuming the API returns user details in the response
      const userDetails = userDetailsResponse.data;

      //console.log(userDetails);

      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      console.log(response.status);

      const status = response.status;



      if (status === 200 && status !== 400) {
        localStorage.setItem('r', "Authorized");
        setisLoggedIn(true);

        // Navigate to userdetails.js with user details upon successful login
        navigate(`/home`);
        //window.location.reload();

      } else {
        console.log('User not found');
        setisLoggedIn(false);
      }



      //console.log('Login successful!');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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

        <br></br>

          <p>New User? <Link to="/registeruser">Register Here</Link></p>

        

        {isLoggedIn ? null : (
          <p style={{ fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: '1rem' }}>
            Email or Password is Incorrect
          </p>
        )}


      </form>
    </div>
  );
};

export default Login;
