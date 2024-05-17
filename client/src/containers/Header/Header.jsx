import { Button, Title, Space, Flex } from '@mantine/core';
import {Link} from 'react-router-dom'
import { useAuth } from '../../utils/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging out")
    logout();
    navigate('/login')
  }
  return (
      <Flex justify="flex-end" align="center" >
        { !loggedIn && (
          <>
              <Link to="/">
                <Button variant="header" justify="left" >
                  <Title order={4}>About</Title>
                </Button>
              </Link>
              <Link to="login">
                <Button variant="header" justify="left" >
                  <Title order={4}>Login</Title>
                </Button>
              </Link>
              <Link to="signup">
                <Button variant="header" justify="left" >
                  <Title order={4}>SignUp</Title>
                </Button>
              </Link>
            </>
        )}


        {/* Need to make it it's own Component */}
        {loggedIn && (
          <>
            <Link to="application">
            <Button variant="header" justify="left" >
              <Title order={4}>Application</Title>
            </Button>
            </Link>
            <Button variant="header" justify="left" onClick={handleSubmit} >
              <Title order={4}>Logout</Title>
            </Button>
          </>
        )} 
      </Flex>
  );
}

export default Header;