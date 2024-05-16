import { Button, Title, Space, Flex } from '@mantine/core';
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <>
      <Flex justify="flex-end" align="center" >
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
        <Link to="application">
          <Button variant="header" justify="left" >
            <Title order={4}>Application</Title>
          </Button>
        </Link>
      </Flex>
    </>
  );
}

export default Header;