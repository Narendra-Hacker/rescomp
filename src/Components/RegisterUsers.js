import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterUsers() {
  const [userId, setUserId] = useState();
  const [userName,setUserName]=useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [isActive, setIsActive] = useState(true);

  // Set isActive to true
  //setIsActive(true);
  
  const navigate = useNavigate();
 
  async function save(event) {
    event.preventDefault();

    try {
      await axios.post("https://localhost:44389/api/Users/Register", {
        UserName: userName,
        FullName: fullName,
        Email: email,
        PasswordHash: password,
        Mobile: mobile,  
        IsActive: isActive,      
      });
      alert("User Registration Successfully");
      // ... (unchanged)
      setUserId("");
      setUserName("");
      setFullName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setIsActive("");

      navigate("/");
    } catch (err) {
      alert("Please Check the Details you Entered");
    }
  }

  return (
    <>
                  <br></br>
                  <br></br>
      <div className="container mt-0 container-form" style={{ width: "500px" }}>
        <div className="card">
          <div className="card-body">
            <h2 className="form-header">User Registration</h2>

            <form>
              {/* ... (unchanged) */}


              <div className="mb-5">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    hidden
                    value={userId}
                    onChange={(event) => {
                      setUserId(event.target.value);
                    }}
                  />

                  <label>User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value);
                    }}
                  />
                </div>
              

              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  value={mobile}
                  onChange={(event) => {
                    setMobile(event.target.value);
                  }}
                />
              </div>


              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />

              </div>


              


              <div>
                <button className="btn btn-primary mt-4 mx-2" onClick={save}>
                  Register
                </button>
                <button className="btn btn-primary mt-4 mx-2" onClick={() => navigate("/")}>
                  Already a user
                </button>
              </div>
              </div>

            
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUsers;
