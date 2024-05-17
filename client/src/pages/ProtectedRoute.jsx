import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AppContext'; // Adjust the import path as necessary
import { PropTypes } from 'prop-types';


const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth(); // Assuming your AuthContext provides isLoggedIn or similar

  if (!loggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


export default ProtectedRoute;