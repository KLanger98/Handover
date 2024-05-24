import { Stack, Button, Title, Divider, Group, Container, Text, Indicator } from '@mantine/core'
import { HomeButton } from '../../components'
import {useQuery} from "@apollo/client"
import { Link } from 'react-router-dom'
import { QUERY_FLAGS } from '../../utils/queries'

const Navbar = () => {
  const {data, loading} = useQuery(QUERY_FLAGS)

  const flagCount = data?.findFlags.length || {};

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
      <Group gap={0}>
        <Link to="processes">
          <Button variant="normal" justify="left">
            <Title order={4}>Process Library</Title>
          </Button>
        </Link>
        {flagCount > 0 && (
          <Container
            bg="red.3"
            justify="center"
            align="center"
            p={5}
            w={30}
            h="auto"
            style={{ borderRadius: "20px" }}
          >
            <Title order={6} style={{ color: "white" }}>
              {flagCount}
            </Title>
          </Container>
        )}
      </Group>

      <Link to="referrals">
        <Button variant="normal" justify="left">
          <Title order={4}>Referrals</Title>
        </Button>
      </Link>
    </Stack>
  );
}

export default Navbar