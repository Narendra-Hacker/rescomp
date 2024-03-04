// // App.js

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './Components/Login';
// import UserDetails from './Components/Userdetails';
// import Users from './Components/Users';
// import UserHome from './Components/UserHome';
// import RolesManagement from './Components/RolesManagement';
// import UpdateRoles from './Components/UpdateRoles';
// import RoleRegistration from './Components/RoleRegistration'; // Import the RoleRegistration component


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
