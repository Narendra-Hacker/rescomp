import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateRoles = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roleId: "",
    roleName: "", // Remove the roleName from the initial state
    userId: "",
    fullName: "",
  });

  const [availableRoles] = useState(["Super Admin", "Admin", "User"]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      roleId: formData.roleId,
      roleName: formData.roleName,
      userId: formData.userId,
    };

    axios
      .put(`https://localhost:44389/api/Roles/UpdateRoleById/${roleId}`, updatedData)
      .then(() => {
        console.log("Saved successfully.");
        alert("User Updated Successfully");
        navigate("/rolesmgmt");
      })
      .catch((err) => {
        console.error(err.message);
        alert("An error occurred while updating the user.");
      });
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44389/api/Roles/GetById/${roleId}`)
      .then((resp) => {
        const data = resp.data;
        setFormData({
          roleId: data.roleId,
          roleName: data.roleName,
          userId: data.userId,
          fullName: formData.fullName,
        });
        console.log(data);
      })
      .catch((err) => {
        console.error(err.message);
        alert("An error occurred while fetching user details.");
      });
  }, [roleId]);

  // Fetch user details and update userName when userId changes
  useEffect(() => {
    if (formData.userId) {
      axios
        .get(`https://localhost:44389/api/Users/GetUserById/${formData.userId}`)
        .then((resp) => {
          const userData = resp.data;
          setFormData((prevData) => ({
            ...prevData,
            fullName: userData.fullName,
          }));
        })
        .catch((err) => {
          console.error(err.message);
          alert("An error occurred while fetching user details.");
        });
    }
  }, [formData.userId]);

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roleName" className="form-label">
            <strong>Update Role For "<u>{formData.fullName}</u>"</strong>
          </label>
          {/* Use a dropdown select instead of a text input */}
          <select
            className="form-select"
            id="roleName"
            value={formData.roleName}
            onChange={handleChange}
          >
            <option value="">Select a Role</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* The following fields are hidden or disabled */}
        <input type="hidden" id="roleId" value={formData.roleId} disabled />
        <input type="hidden" id="userId" value={formData.userId} disabled />

        <div className="d-flex">
          <button className="btn btn-primary me-2" type="submit">
            Update
          </button>
          <Link to="/rolesmgmt">
            <button className="btn btn-danger">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateRoles;
