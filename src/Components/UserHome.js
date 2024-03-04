// UserHome.js

import './UserHome.css'; // Import the CSS file for styling
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const UserHome = () => {

    const [user, setUser] = useState(null);
    const [username,setUsername] = useState(null);
    
    const calluser = (data) => {
     setUser(data);
     setUsername(data.userName);
    }

    //console.log(user);
    //console.log(username);

   
   useEffect(() => {
     const luser = localStorage.getItem('userDetails');  
     if (luser) {
       calluser(JSON.parse(luser)); // Parse the stored JSON data if needed
     }
   }, []);


  return (
    <div className="user-home-container">
      <h1 className="welcome-header">Welcome to the home page {username} !</h1>
      <p className="intro-text">This is your home page. Explore and enjoy the features!</p>
      
      <section className="activity-section">
        <h2>Your Recent Activity</h2>
        <ul className="activity-list">
          <li>Completed Task A</li>
          <li>Read an article on React development</li>
          <li>Updated your profile information</li>
        </ul>
      </section>

      <section className="recommended-section">
        <h2>Recommended Content</h2>
        <div className="recommended-content">
          <p>Check out our latest blog post on web development trends.</p>
          {/* Add more recommended content as needed */}
        </div>
      </section>

      {/* Add more sections or components as needed */}
      <Outlet/>
    </div>
  );
};

export default UserHome;
