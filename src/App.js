// App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestLogin from './Components/TestLogin';
import UserDetails from './Components/Userdetails';
//import Users from './Components/Users';
import UserHome from './Components/UserHome';
import RolesManagement from './Components/RolesManagement';
import UpdateRoles from './Components/UpdateRoles';
//import RoleRegistration from './Components/RoleRegistration'; // Import the RoleRegistration component
import Error from './Error';
import AuthWrapper from './AuthWrapper';
import MainHeader from './MainHeader';  
//import RegisterUser from './Components/RegisterUser';
import RegisterUsers from './Components/RegisterUsers';

function App(props){
  const roleName=localStorage.getItem("roleName"); 
  console.log(roleName); 

  return <BrowserRouter>
  <Routes>
        <Route index element={<TestLogin />} />

          <Route path='/' element={<AuthWrapper><MainHeader/></AuthWrapper>}>
          {/* <Route path='/home' element= {(roleName==="Super Admin") || (roleName==="Admin")?<UserHome />:<Error/>} /> */}
          
          <Route path='/home' element={<UserHome />} />

          <Route path="/userdetails" element={(roleName==="Super Admin") || (roleName==="Admin") || (roleName==="User")? <UserDetails />:<Error/>} />
          <Route path="/rolesmgmt" element={(roleName==="Super Admin") || (roleName==="Admin")? <RolesManagement />:<Error/>}>
            <Route path="updateroles/:roleId" element={(roleName==="Super Admin") || (roleName==="Admin")? <UpdateRoles />:<Error/>} />            
          </Route>          

          {/* <Route path="register" element={<RoleRegistration />} />  */}
 
        </Route>


        <Route path='/registeruser' element={<RegisterUsers/>}/>
        <Route path='*' element={<Error />} />
  </Routes>   


  </BrowserRouter>
}
export default App;

// const App = () => {
//   return (
//     <Router> 
//       <Routes>
//         <Route path="/" element={<Login />} />

//         <Route path="/users" element={<Users />}>
//           <Route index element={<UserHome />} />
//           <Route path="userdetails" element={<UserDetails />} />
//           <Route path="rolesmgmt" element={<RolesManagement />}>
//             <Route path="updateroles/:roleId" element={<UpdateRoles />} />            
//           </Route>
//           <Route path="register" element={<RoleRegistration />} /> 
//         </Route>

//         <Route path="*" element={<UserHome />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
