import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { loginContext } from './components/context/loginContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const [currentUser, , userloginStatus] = useContext(loginContext);

  console.log('ProtectedRoute:', { currentUser, userloginStatus, allowedRoles });

  if (!userloginStatus) {
    console.log('User is not authenticated, redirecting to login');
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(currentUser)) {
    console.log(`User does not have the required role (${currentUser}), redirecting to home`);
    return <Navigate to="/" />;
  }

  console.log('User authenticated and authorized, rendering component');
  return <>{element}</>;
};

export default ProtectedRoute;

