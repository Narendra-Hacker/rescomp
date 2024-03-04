import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    // Add other fields as needed
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:44389/api/Users/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, you can redirect or show a success message
        console.log('User registered successfully');
      } else {
        // Registration failed, handle errors
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error.message);
    }
  };

  const handlecancel = ()=>{
    navigate(-1);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="userName">Username:</label>
          <input
            style={styles.input}
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="fullName">Full Name:</label>
          <input
            style={styles.input}
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password:</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="mobile">Mobile:</label>
          <input
            style={styles.input}
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <button style={styles.button} type="submit">Register</button>

          <button style={styles.button1} onClick={handlecancel}>Already A User</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '13px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '140px',
  },
  button1: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },


  // Add more styles as needed
};

export default RegisterUser;
