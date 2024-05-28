import { Stack, Title, Text, Grid, Image } from '@mantine/core'
import { useEffect } from 'react'
import { Activity, Referrals } from '../components'
import { useQuery } from "@apollo/client";
import { QUERY_REFERRALS, QUERY_SINGLE_COMPANY } from "../utils/queries";

import { images }  from '../../assets/';

const Dashboard = () => {
    // const theme = useMantineTheme();

    // const [addReferral, { error }] = useMutation(ADD_REFERRAL, {
    //     refetchQueries: [{ query: QUERY_REFERRALS }]
    // })
    const { data, loading } = useQuery(QUERY_REFERRALS)
    const referrals = data?.findReferrals || []
    const incomplete = referrals.filter(referral => referral.status === 'incomplete')
    const inprogress = referrals.filter(referral => referral.status === 'inprogress')
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

  const {data: companyData, loading: companyLoading} = useQuery(QUERY_SINGLE_COMPANY);
  const dashData = companyData?.getCompany || {}



  return (
    <Stack p={10}>
      <Title order={2} c="columbia-blue.9" pl={3}>
        Dashboard
      </Title>

      {/* Main Notes */}
      <Grid p="sm" width="50%" justify="left">
        <Grid.Col p={0} span={9}>
          <Text>
            {dashData.dashboardText}
          </Text>
        </Grid.Col>
        <Grid.Col span={3} align="right">
          <Image w={100} h="auto" src={dashData.companyImage} />
        </Grid.Col>
      </Grid>

      {/* Referrals */}

      {/*
            
        */}

      <Referrals
        title="Referrals"
        incomplete={incomplete}
        inprogress={inprogress}
      />

      <Activity title="Daily Activities" items={daily} type="tasks" />

      {/* <Activity title="Processes" /> */}
    </Stack>
  );
}

export default Dashboard