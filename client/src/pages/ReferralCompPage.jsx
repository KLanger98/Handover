import { useParams } from 'react-router-dom'
import { Title, Stack, Divider, Text, TextInput, Button } from '@mantine/core'
import { useQuery } from '@apollo/client'
import { QUERY_REFERRALS } from '../utils/queries'
import { useForm } from '@mantine/form'
import { Priority } from '../components'


const ReferralCompPage = () => {
  const { id } = useParams()

  const { data, loading } = useQuery(QUERY_REFERRALS);
  const referrals = data?.findReferrals || [];
  const referral = referrals.find(referral => referral._id === id)

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { completionNotes: "", },
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Enter a valid email"),
    //   password: (value) => value.length === 0? "Please enter a password." : null,
    // },
  });

  const submitForm = () => {

  }


  
  return (
    <div>
        <Stack p={10}>

            
            { !loading && (
              <> 
                <Title order={2} c='columbia-blue.9' pl={0}>
                Referral 
                </Title>

                <div style={{ display: 'flex', justifyContent:'space-between' }}>
                  <div style={{ display: 'flex', justifyContent:'left' }}>
                    <Priority priority={referral.priority} />     
                    <Title order={3}>{referral.title}</Title>
                  </div>
                  <div style={{ display: 'flex', justifyContent:'left', verticalAlign: 'middle' }}>
                    <Title order={4}>Assigned by <span style={{ color: 'var(--mantine-color-columbia-blue-9'}}>{referral.assignedBy.fullName}</span></Title>
                  </div>
                  <div style={{ display: 'flex', justifyContent:'right' }}>
                  </div>
                </div>
                
                <Divider />

                <Text>{referral.desc}</Text>

              <form onSubmit={form.onSubmit(submitForm)}>
                <Stack>
                  <Title order={4}>Completion Notes</Title>
                  <TextInput
                    placeholder="Add a comment"
                    required
                    // {...form.getProps('comment')}
                  />
                  <Button type="submit" bg="blue-grey">Complete</Button>
                </Stack>

              </form>
            </>
          )}
        </Stack>

    </div>
  )
}

export default ReferralCompPage