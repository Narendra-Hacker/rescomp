// UserDetails.js
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    mobile: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data using the user ID from local storage
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`https://localhost:44389/api/Users/GetUserById/${userId}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error scenarios (e.g., show an error message)
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleEdit = () => {
    setIsEditMode(true);
    setFormData({
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
    });
  };

  const handleSave = async () => {
    try {
      console.log('formData:', formData);
      console.log('user.userId:', user.userId);
      await axios.put(`https://localhost:44389/api/Users/UpdateUserById/${user.userId}`, formData);

      setUser({
        userName: formData.userName,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        userId: user.userId, // Ensure userId is included in the updated user object
      });

      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error scenarios (e.g., show an error message)
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textDecoration: 'underline' }}>User Details</h2>

      {isEditMode ? (
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="userName">Username:</label>
            <input type="text" id="userName" value={formData.userName} onChange={handleChange} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={formData.email} onChange={handleChange} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="mobile">Mobile:</label>
            <input type="text" id="mobile" value={formData.mobile} onChange={handleChange} />
          </div>

          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-danger" onClick={handleCancel} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p>
            <strong>User ID:</strong> {user.userId}
          </p>
          <p>
            <strong>Username:</strong> {user.userName}
          </p>
          <p>
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>

          <button className="btn btn-primary" onClick={handleEdit} style={{ marginTop: '15px' }}>
            Edit
          </button>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default UserDetails;
