import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RolesManagement.css';
import { Outlet, useNavigate } from 'react-router-dom';

const RolesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch roles data when the component mounts
    fetchRoles();
  }, [roles]);

  useEffect(() => {
    // Fetch user details for each user when roles change
    if (roles.length > 0) {
      fetchUserDetailsForAllUsers();
    }
  }, [roles]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44389/api/Roles/GetAllRoles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchUserDetailsForAllUsers = async () => {
    try {
      const userDetailsPromises = roles.map((role) =>
        axios.get(`https://localhost:44389/api/Users/GetUserById/${role.userId}`)
      );

      const userDetailsArray = await Promise.all(userDetailsPromises);

      const userDetailsMap = {};
      userDetailsArray.forEach((response, index) => {
        const userId = roles[index].userId;
        userDetailsMap[userId] = response.data;
      });

      setUserDetailsMap(userDetailsMap);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUpdateRole = (roleId) => {
    // Navigate to UpdateDetails page with userRoleId as a URL parameter
    navigate(`updateroles/${roleId}`);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await axios.delete(`https://localhost:44389/api/Roles/Delete/${roleId}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const roleName = localStorage.getItem("roleName");

  return (
    <div className="roles-container">
      <br></br>
      <h2><u>User and Role Details</u></h2>

      <table className="roles-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Full Name</th>
            <th>Role</th>
            {roleName === 'Super Admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.roleId}>
              {Object.keys(userDetailsMap).length > 0 && userDetailsMap[role.userId] && (
                <>
                  <td>{userDetailsMap[role.userId].userName}</td>
                  <td>{userDetailsMap[role.userId].fullName}</td>
                </>
              )}
              <td>{role.roleName}</td>
              {roleName === 'Super Admin' && (
                <td>
                  <button onClick={() => handleUpdateRole(role.roleId)}>Update</button>
                  <button onClick={() => handleDeleteRole(role.roleId)} style={{ marginLeft: "5px" }}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
};



export default RolesManagement;
