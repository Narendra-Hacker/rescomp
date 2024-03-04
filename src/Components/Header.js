import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'



function Header(){
    const roleName=localStorage.getItem('roleName');

    const Notify = () => {
        alert("Logout Successfull");
        localStorage.clear();
        console.clear();
    }

    const location = useLocation();
    
    if(roleName=='Super Admin'){
        return(
            <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
  
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li className="nav-item" style={{ marginLeft: "30px" }}>
                    <NavLink to="/home" className="userhome" style={{ textDecoration: "none",fontWeight: location.pathname === '/userhome' ? 'bold' : 'normal', color:"black"}}  >Home</NavLink>
                  </li>
                  <li className='nav-item' style={{ marginLeft: "60px" }}>
                    <NavLink to="/userdetails" className="profile" style={{textDecoration: "none",fontWeight: location.pathname === '/userdetails' ? 'bold' : 'normal',color:"black"}}>Profile</NavLink>
                  </li>
                  <li className='nav-item' style={{ marginLeft: "60px" }}>
                    <NavLink to="/rolesmgmt" className="rolesmgmt" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/rolesmgmt' ? 'bold' : 'normal' }}>RolesMgmt</NavLink>
                  </li>  
  
            <div style={{marginLeft:"30px"}}>
              
            </div>
 
                </ul>
                <ul className='navbar-nav'>
                  <li className='nav-item' style={{ marginLeft: "800px" }}>
                    <h5> <u>(Super Admin)</u> Welcome {localStorage.getItem('userName')}</h5>
                  </li>
  
                  <li className='nav-item' style={{ marginLeft: "50px" }}>
                    <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
                      <button color="secondary" variant="contained" onClick={Notify}>
                        Logout
                      </button>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        );
    }

    else if(roleName=='Admin'){
      return(
          <div>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li className="nav-item" style={{ marginLeft: "30px" }}>
                  <NavLink to="/home" className="userhome" style={{ textDecoration: "none",fontWeight: location.pathname === '/userhome' ? 'bold' : 'normal', color:"black"}}  >Home</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/userdetails" className="profile" style={{textDecoration: "none",fontWeight: location.pathname === '/userdetails' ? 'bold' : 'normal',color:"black"}}>Profile</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/rolesmgmt" className="rolesmgmt" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/rolesmgmt' ? 'bold' : 'normal' }}>RolesMgmt</NavLink>
                </li>  

          <div style={{marginLeft:"30px"}}>
            
          </div>

              </ul>
              <ul className='navbar-nav'>
                <li className='nav-item' style={{ marginLeft: "800px" }}>
                  <h5> <u>(Admin)</u> Welcome {localStorage.getItem('userName')}</h5>
                </li>

                <li className='nav-item' style={{ marginLeft: "50px" }}>
                  <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
                    <button color="secondary" variant="contained" onClick={Notify}>
                      Logout
                    </button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      );
  }

  else if(roleName=='User'){
    return(
        <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li className="nav-item" style={{ marginLeft: "30px" }}>
                <NavLink to="/home" className="userhome" style={{ textDecoration: "none",fontWeight: location.pathname === '/userhome' ? 'bold' : 'normal', color:"black"}}  >Home</NavLink>
              </li>
              <li className='nav-item' style={{ marginLeft: "60px" }}>
                <NavLink to="/userdetails" className="profile" style={{textDecoration: "none",fontWeight: location.pathname === '/userdetails' ? 'bold' : 'normal',color:"black"}}>Profile</NavLink>
              </li>
              {/* <li className='nav-item' style={{ marginLeft: "60px" }}>
                <NavLink to="/rolesmgmt" className="rolesmgmt" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/rolesmgmt' ? 'bold' : 'normal' }}>RolesMgmt</NavLink>
              </li>   */}

        <div style={{marginLeft:"30px"}}>
          
        </div>

            </ul>
            <ul className='navbar-nav'>
              <li className='nav-item' style={{ marginLeft: "800px" }}>
                <h5> <u>(User)</u> Welcome {localStorage.getItem('userName')}</h5>
              </li>

              <li className='nav-item' style={{ marginLeft: "50px" }}>
                <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
                  <button color="secondary" variant="contained" onClick={Notify}>
                    Logout
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    );
  }

}

export default Header;