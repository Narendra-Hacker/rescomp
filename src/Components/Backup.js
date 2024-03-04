// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RolesManagement = () => {
//   const [roles, setRoles] = useState([]);
//   const [newRoleName, setNewRoleName] = useState('');
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [updatedRoleName, setUpdatedRoleName] = useState(''); // Added this line

//   useEffect(() => {
//     // Fetch roles data when the component mounts
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch roles
//       const response = await axios.get('https://localhost:44327/api/RoleMgmt/Getroles');
//       setRoles(response.data);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//     }
//   };

//   const handleAddRole = async () => {
//     try {
//       // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to add a role
//       await axios.post('https://localhost:44327/api/RoleMgmt/Addrole', { RoleName: newRoleName, UserId: selectedUserId });
//       setNewRoleName('');
//       fetchRoles(); // Fetch roles again after adding a new role
//     } catch (error) {
//       console.error('Error adding role:', error);
//     }
//   };

//   const handleUpdateRole = async (roleId, updatedRoleName) => {
//     try {
//       // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to update a role
//       await axios.put(`https://localhost:44327/api/RoleMgmt/Updaterole/${roleId}`, { RoleName: updatedRoleName, UserId: selectedUserId });
//       fetchRoles(); // Fetch roles again after updating a role
//     } catch (error) {
//       console.error('Error updating role:', error);
//     }
//   };

//   const handleDeleteRole = async (roleId) => {
//     try {
//       // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to delete a role
//       await axios.delete(`https://localhost:44327/api/RoleMgmt/Deleterole/${roleId}`);
//       fetchRoles(); // Fetch roles again after deleting a role
//     } catch (error) {
//       console.error('Error deleting role:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Roles Management</h2>
//       {/* <label>Select User:</label>
//       <select onChange={(e) => setSelectedUserId(e.target.value)}> */}
//         {/* Populate the dropdown with users */}
//         {/* <option value={null}>Select User</option> */}
//         {/* Map through users data */}
//         {/* {users.map((user) => (
//           <option key={user.userId} value={user.userId}>
//             {user.userName}
//           </option>
//         ))}
//       </select> */}
//       <div>
//         <label>New Role Name:</label>
//         <input type="text" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
//         <button onClick={handleAddRole}>Add Role</button>
//       </div>
//       <div className="roles-container">
//         {/* Display roles in a card format */}
//         {roles.map((role) => (
//           <div key={role.userRoleId} className="role-card">
//             <div>{role.roleName}</div>
//             <div>
//               <input
//                 type="text"
//                 value={updatedRoleName}
//                 onChange={(e) => setUpdatedRoleName(e.target.value)}
//                 placeholder="New Role Name"
//               />
//               <button onClick={() => handleUpdateRole(role.userRoleId, updatedRoleName)}>Update</button>
//               <button onClick={() => handleDeleteRole(role.userRoleId)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RolesManagement;
