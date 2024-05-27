import { Stack, Button, Title, Divider, Container, Avatar, Space } from '@mantine/core'
import { HomeButton } from '../../components'
import {useQuery} from "@apollo/client"
import { Link, useNavigate } from 'react-router-dom'
import { QUERY_FLAGS } from '../../utils/queries'
import { IconBooks, IconInfoCircle, IconClipboardList } from "@tabler/icons-react";
import './Navbar.scss'
import { useAuth } from '../../utils/AppContext'
import { useDisclosure } from '@mantine/hooks'

const Navbar = () => {
  const {data} = useQuery(QUERY_FLAGS)
  const { userProfile, loggedIn } = useAuth();
  const flagCount = data?.findFlags.length || {};
  const { logout, toggle } = useAuth();

  const navigate = useNavigate();
  



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging out")
    logout();
    navigate('/login')
  }

  if(!loggedIn){
    navigate('/login')
  }

  return (
    <Stack p={5} gap={10} py={10} id='navArea' onClick={toggle}>
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
      <Divider />
      <Space h={30} />
     
        <Link to="user" style={{display: 'contents'}} className='mobile-only'>
          <Button variant="normal" leftSection={<Avatar
          className='mobile-only'
          variant="filled"
          radius="xl"
          size="md"
          color="columbia-blue.6"
          src={userProfile.imageUrl}
          alt="Your Avatar"
          onClick={()=> navigate("user")}
          styles={{cursor: "grab"}}
        >
          {userProfile.initials}
        </Avatar>} justify="left">
          
            <Title className='mobile-only' order={4}>Profile</Title>
          </Button>
        </Link>
        <Space h={10} />
        <Button variant="normal" className='mobile-only' c='red.9' bg='red.0' h={50} onClick={handleSubmit}  justify="left">
          <Title order={4}>Logout</Title>
        </Button>
     
      
     
    </Stack>
  );
}

export default Navbar