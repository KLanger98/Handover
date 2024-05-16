import { useMantineTheme, Stack, Title, Text, Grid } from '@mantine/core'
import { useEffect } from 'react'
import { Activity } from '../components'

import { images }  from '../../assets/';

const Dashboard = () => {
    const theme = useMantineTheme();

    //Create a Activity Object
    //     2 Types:
    //     - Clicking Opens Module with Details: Title, Desc, Processes
    //     - Clicking Completes the Activity
    // Both are Activitys that can be completed but the former must have a click on the checkbox to be completed
    // {
    // title,
    // desc,
    // type: 'task' || 'referral' || 'process',
    // items: []
    // user: User Object (name, profileImg)
    // }
    // Create a Activity Object that has the commonalities
    // Extend it to create one with differences


    const referrals = [
        {
            title: "Bennedict has fallen",
            desc: "Fortunately, for the kingdom...",
            assignedUser: {
                name: "Karlos Santana",
                profileImg: images.karlos
            }
        },
        {
            title: "Sir Ian is sore on le caboose",
            desc: "Got hurt bum, need a lil rub (on the bum).",
            assignedUser: {
                name: "Benson Baby",
                profileImg: images.ben
            }
        },
        {
            title: "Lady Jane is in distress",
            desc: "She's been kidnapped by a dragon",
            assignedUser: {
                name: "Karlos Santana",
                profileImg: images.karlos
            }
        }
    ]

    const daily = [
        {
            title: "Complete Referrals",
            desc: "Complete all referrals for the day"
        },
        {
            title: "Falls Reviews",
            desc: "Review all falls for the day"
        },
        {
            title: " New Residents",
            desc: "Dno what this is but here so I can show  that tasks take more desc space than referrals"
        }
    ]


    useEffect(()=> {
        
    }, [])

  return (
    <Stack p={10}>
        <Title order={2} c='columbia-blue.9' pl={3}>
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

        <Activity title="Referrals" items={referrals} type='referrals'/>

        <Activity title="Daily Activities" items={daily} type='tasks'/>
        
        <Activity title="Processes" />


    </Stack>
  )
}

export default Dashboard