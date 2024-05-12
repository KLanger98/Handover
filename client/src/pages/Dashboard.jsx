import { useMantineTheme, Stack, Title, Text, Grid } from '@mantine/core'
import { useEffect } from 'react'
import { Task } from '../components'
const Dashboard = () => {
    const theme = useMantineTheme();

    //Create a Task Object
    //     2 Types:
    //     - Clicking Opens Module with Details: Title, Desc, Processes
    //     - Clicking Completes the task
    // Both are tasks that can be completed but the former must have a click on the checkbox to be completed
    // {
    // title,
    // desc,
    // processes: []
    // user: User Object (name, profileImg)
    // }
    // Create a Task Object that has the commonalities
    // Extend it to create one with differences
    const referrals = [
        {
            title: "Bennedict has fallen",
            desc: "Fortunately, for the kingdom, Bennedict has finally fallen.",
        },
        {
            title: "Sir Ian is sore on le caboose",
            desc: "Got hurt bum, need a lil rub (on the bum).",
        },
    ]
    useEffect(()=> {
        
    }, [])

  return (
    <Stack>
        <Title order={2} c='columbia-blue.9'>
            Dashboard
        </Title>

        {/* Main Notes */}
        <Grid p="sm" width="50%" justify='left'>
            <Grid.Col p={0} span={9}>
                <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </Grid.Col>
            <Grid.Col span={3} align="right">
                LOGO HERE
            </Grid.Col>
        </Grid>

        {/* Referrals */}
        
        {/*
            
        */}

        <Task title="Referrals" tasks={referrals} />

        <Task title="Daily Tasks" />
        
        <Task title="Processes" />


    </Stack>
  )
}

export default Dashboard