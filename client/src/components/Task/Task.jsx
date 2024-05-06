import { Stack, Title, Divider } from '@mantine/core'
import { Container } from '../' //I made my own container for styling purposes

const Task = ({ title='', tasks = [] }) => {
  return (
    <Container> 
        <Stack>
        <Title order={3} c='blue-grey.9' align='left'>
        {title} 
        </Title>
        <Divider />
        
        </Stack>
    </Container>
  )
}

export default Task