import { Stack, Button, Title, Divider } from '@mantine/core'
import { HomeButton } from '../../components'


const Navbar = () => {


  return (
    <Stack p={5} gap={10} py={10}>
       <HomeButton content='Dashboard'/>
        <Divider></Divider>

        <Button 
        variant='normal'
        justify='left'
        >
          <Title order={4}>
            Handover
          </Title>
        </Button>

        <Button 
        variant='normal' 
        justify='left'
        >
          <Title order={4}>
            Process Library
          </Title>
        </Button>
    </Stack>
  )
}

export default Navbar