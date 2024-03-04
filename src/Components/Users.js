import React from "react";
import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetails from "./Userdetails";
import { useNavigate } from 'react-router-dom';
import RolesManagement from "./RolesManagement";

function UserHome() { 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(UserDetails);

        navigate("/");
      };


  return (
    <div className="md-3">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <br></br>
        <br></br>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/users">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" aria-current="page">              
                <Link className="navbar-brand" to={`userdetails`}>Profile</Link>
              </li>
              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`rolesmgmt`} >Roles_Mgmt</Link>
              </li>
              <li className="nav-item" aria-current="page">
                <Link className="navbar-brand" to={`register`}>Register</Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
        <br></br>
      </nav>

      {/* <div className="container mt-4">
        <h2>Welcome to User Home Page!</h2>       
        <p style={{ textAlign: 'center' }}>
          Use the Navbar shown above to navigate to other pages of the application
        </p>
      </div> */}

      <Outlet />
    </div>
  );
}

export default UserHome;
