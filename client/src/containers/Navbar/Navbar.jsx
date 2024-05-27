import { Stack, Button, Title, Divider, Group, Container, Text, Indicator } from '@mantine/core'
import { HomeButton } from '../../components'
import {useQuery} from "@apollo/client"
import { Link } from 'react-router-dom'
import { QUERY_FLAGS } from '../../utils/queries'
import { IconBooks, IconInfoCircle, IconClipboardList } from "@tabler/icons-react";
import './Navbar.scss'
import { useAuth } from '../../utils/AppContext'
const Navbar = () => {
  const {data} = useQuery(QUERY_FLAGS)
  const { userProfile } = useAuth();
  const flagCount = data?.findFlags.length || {};

  return (
    <Stack p={5} gap={10} py={10} id='navArea'>
      <Link to="dashboard">
        <HomeButton content="Dashboard" />
      </Link>
      <Divider></Divider>

     
        <Link to="processes" style={{display: 'contents'}}>
          <Button
            variant="normal"
            className='processButton'
            leftSection={<IconBooks size={25} />}
            rightSection={(
              flagCount > 0 && userProfile.moderator && 
              <Container
                bg="red.3"
                p={5}
                w={25}
                h={25}
                className='flagContainer'
              >
                <Title order={6} style={{ color: "white" }}>
                  {flagCount}
                </Title>
              </Container>
              )}
            
            justify="left"
          >
            <Title order={4}>Process Library</Title>
           
          </Button>
        </Link >
        {/* {flagCount > 0 && (
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
        )} */}
    

      <Link to="referrals" style={{display: 'contents'}}>
        <Button variant="normal" leftSection={<IconClipboardList size={25}/>} justify="left">
          <Title order={4}>Referrals</Title>
        </Button>
      </Link>
      <Link to="site" style={{display: 'contents'}}>
        <Button variant="normal" leftSection={<IconInfoCircle size={25}/>} justify="left">
          <Title order={4}>Site Information</Title>
        </Button>
      </Link>
    </Stack>
  );
}

export default Navbar