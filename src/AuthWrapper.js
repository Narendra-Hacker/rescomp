import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Login from './Components/Login';
import TestLogin from './Components/TestLogin';


const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    
    const userIsAuthorized = localStorage.getItem('r') === 'Authorized';
    // const googleIsAuthorized = localStorage.getItem('resultGoogle') === 'Authorized';
    // const googleSignup = localStorage.getItem('GoogleSignup') ==='Authorized'
    
 
    if (userIsAuthorized) {
      setIsAuthorized(true);
    } else {
   
      navigate('/');
    }
  }, [navigate]);

  return isAuthorized ? children: <TestLogin/>;
};

export default AuthWrapper;

