import { Stack, Button, Title } from '@mantine/core'
import { HomeButton } from '../../components'
const Navbar = () => {
  return (
    <Stack p={5}>
        <Button 
        leftSection={<HomeButton letter="D"/>} 
        rightSection={<span />}
        justify='left'
        >
          <Title order={4}
          >
            Dashboard
          </Title>
        </Button>
    </Stack>
  )
}

export default Navbar