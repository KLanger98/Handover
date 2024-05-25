import { Button, Title, Space, Flex, Group, Avatar } from '@mantine/core';
import {Link} from 'react-router-dom'
import { useAuth } from '../../utils/AppContext';
import { useNavigate } from 'react-router-dom';
import { IconHeartHandshake } from '@tabler/icons-react';
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth();

  //Query current user to display imageUrl
  const {loading, data} = useQuery(QUERY_ME);
  const userData = data?.me || {}
  const userImage = userData.imageUrl;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging out")
    logout();
    navigate('/login')
  }
  return (
    <>
      <Flex justify="space-between" align="center" pl={50}>
        <Group align="center" justify="center" gap={0} mt={5}>
          <Title size={30} style={{ color: "white" }}>
            Hand
          </Title>
          <IconHeartHandshake color="white" size={30}/>
          <Title size={30} style={{ color: "white" }}>
            ver
          </Title>
        </Group>

        <Group mr={50}>
          {!loggedIn && (
            <>
              <Link to="/">
                <Button variant="header" justify="left">
                  <Title order={4}>About</Title>
                </Button>
              </Link>
              <Link to="login">
                <Button variant="headerLogin" justify="left">
                  <Title order={4}>Login</Title>
                </Button>
              </Link>
              <Link to="signup">
                <Button variant="form" justify="left">
                  <Title order={4}>Sign Up</Title>
                </Button>
              </Link>
            </>
          )}

          {/* Need to make it it's own Component */}
          {loggedIn && (
            <>
              <Link to="app/dashboard">
                <Button variant="header" justify="left">
                  <Title order={4}>Home</Title>
                </Button>
              </Link>
              <Button variant="header" justify="left" onClick={handleSubmit}>
                <Title order={4}>Logout</Title>
              </Button>
              <Link to="user">
                <Avatar
                  variant="filled"
                  radius="xl"
                  size="md"
                  color="indigo"
                  src={userImage}
                  alt="Your Avatar"
                >
                </Avatar>
              </Link>
            </>
          )}
        </Group>
      </Flex>
    </>
  );
}

export default Header;