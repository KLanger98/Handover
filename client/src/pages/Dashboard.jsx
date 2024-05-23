import { Stack, Title, Text, Grid } from '@mantine/core'
import { useEffect } from 'react'
import { Activity, Referrals } from '../components'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_REFERRALS } from "../utils/queries";

import { images }  from '../../assets/';

const Dashboard = () => {
    // const theme = useMantineTheme();

    // const [addReferral, { error }] = useMutation(ADD_REFERRAL, {
    //     refetchQueries: [{ query: QUERY_REFERRALS }]
    // })
    const { data, loading } = useQuery(QUERY_REFERRALS)
    const referrals = data?.findReferrals || []

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

        <Referrals title="Referrals" items={referrals} type='referrals'/>

        <Activity title="Daily Activities" items={daily} type='tasks'/>
        
        <Activity title="Processes" />


    </Stack>
  )
}

export default Dashboard