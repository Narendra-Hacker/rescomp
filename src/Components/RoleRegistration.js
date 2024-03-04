// RoleRegistration.js

import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoleRegistration = () => {
  const [userRoleId,setUserRoleId]=useState();
  const [roleName, setRoleName] = useState();
  const [userId,setUserId]=useState();
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();


    // Fetch users from your API or data source
    useEffect(() => {
      // Replace this with your actual API call or data retrieval logic
      const fetchUsers = async () => {
        try {
          // Fetch users data from your API
          const response = await fetch('https://localhost:44389/api/Users/GetAllUsers');
          const data = await response.json();
  
          // Assuming data is an array of users
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []); // The empty dependency array ensures the effect runs only once after the initial render


    async function save(event) {
      event.preventDefault();

      try {
        await axios.post("https://localhost:44389/api/Roles/RegisterRole", {
          RoleName: roleName,
          UserId: userId,
        });
        alert("User Registration Successfully");

        setUserRoleId("");
        setRoleName("");
        setUserId("");

        navigate(-1);
      } catch (err) {
        alert("Please Check the Details you Entered");
      }
    }



  return (
    <div>
      <h2 className="form-header">Role Registration</h2>
      
      <form>

              <div className="mb-0">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="userRoleId"
                    hidden
                    value={userRoleId}
                    onChange={(event) => {
                      setUserRoleId(event.target.value);
                    }}
                  />

                  <label>Role Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="roleName"
                    value={roleName}
                    onChange={(event) => setRoleName(event.target.value)}
                  />
                </div>



                <div className="form-group">
                  <label>Select The User</label>
                  <select
                    id="users"
                    className="form-control"
                    onChange={(event) => {
                      setUserId(event.target.value);
                    }}
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.userId} value={user.userId}>
                        {user.userName} {/* Replace with the actual property representing the user's name */}
                      </option>
                    ))}
                  </select>

                  {/* Display selected user's ID */}
                  {userId && <p>Selected User ID: {userId}</p>}
                </div>

              <div>
                <button className="btn btn-primary mt-4 mx-2" onClick={save}>
                  Register
                </button>
                <button className="btn btn-primary mt-4 mx-2" onClick={() => navigate(-1)}>
                  Already a user
                </button>
              </div>
              </div>             
            </form>

    </div>
  );
};

export default RoleRegistration;
