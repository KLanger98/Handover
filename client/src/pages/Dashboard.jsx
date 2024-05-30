import { Stack, Title, Text, Grid, Image, Container } from '@mantine/core'
import { Activity, Referrals, SignIns } from '../components'
import { useQuery } from "@apollo/client";
import { QUERY_REFERRALS, QUERY_SINGLE_COMPANY, SIGNINS } from "../utils/queries";

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
  
  const {data: signInData, loading: signInLoading} = useQuery(SIGNINS);
  const signIns = signInData?.getSignIns || []



  return (
    <Stack p={10}>
      {/* Main Notes */}
      <Grid p="sm" width="50%" align="center">
        <Grid.Col p={0} span={9}>
          <Stack>
            <Title order={2} c="columbia-blue.9" pl={3}>
              Dashboard
            </Title>
            <Text>{dashData.dashboardText}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3} align="center">
          <Container
            w={200}
            h={200}
            bg="light-brown.8"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            <Image
              w={100}
              h="auto"
              src={dashData.companyImage}
              style={{ border: "2px solid black" }}
            />
          </Container>
        </Grid.Col>
      </Grid>

      {/* Referrals */}

      <Referrals
        title="Referrals"
        incomplete={incomplete}
        inprogress={inprogress}
      />

      {/* Daily Activities */}
      <Activity title="Daily Activities" items={daily} type="tasks" />

      {/* Sign-ins */}
      <SignIns title="Sign-ins" signIns={signIns} />
    </Stack>
  );
}

export default Dashboard