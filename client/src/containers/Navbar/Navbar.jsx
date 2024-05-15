import { Stack, Button, Title, Divider } from '@mantine/core'
import { HomeButton } from '../../components'

//import react router link
import { Link } from 'react-router-dom'

const Navbar = () => {


  return (
    <Stack p={5} gap={10} py={10}>
      <Link to="dashboard">
        <HomeButton content="Dashboard" />
      </Link>
      <Divider></Divider>

      <Link>
        <Button variant="normal" justify="left">
          <Title order={4}>Handover</Title>
        </Button>
      </Link>
      <Link to="processes">
        <Button variant="normal" justify="left">
          <Title order={4}>Process Library</Title>
        </Button>
      </Link>
    </Stack>
  );
}

export default Navbar