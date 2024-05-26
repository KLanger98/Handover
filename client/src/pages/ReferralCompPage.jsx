import { useParams, useNavigate } from 'react-router-dom'
import { Title, Stack, Grid, Divider, Text, Textarea, Button, Space, Pill } from '@mantine/core'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_REFERRAL_INC_PROCESSES, QUERY_REFERRALS } from '../utils/queries'
import { COMPLETE_REFERRAL, INPROGRESS_REFERRAL } from '../utils/mutation'
import { useForm } from '@mantine/form'
import { Priority, UserStamp, ProcessPillGroup } from '../components'



const ReferralCompPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading } = useQuery(QUERY_REFERRAL_INC_PROCESSES, {
    variables: { referralId: id },
  });

  const referral = data?.findReferralWithProcesses || {};


  const form = useForm({
    mode: "uncontrolled",
    initialValues: { comment: referral.completionNotes || '' },
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Enter a valid email"),
    //   password: (value) => value.length === 0? "Please enter a password." : null,
    // },
  });



  const [completeReferral] = useMutation(COMPLETE_REFERRAL, {
    refetchQueries: [QUERY_REFERRALS],
  });
  const [inprogressReferral] = useMutation(INPROGRESS_REFERRAL, {
    refetchQueries: [QUERY_REFERRALS],
  });


  
  const submitForm = async () => {
    const { comment } = form.getValues();
    const submitButton = event.submitter.name;

    if(submitButton === 'inprogress'){
      try {
        const inprogressRef = await inprogressReferral({
          variables: {
            referralId: referral._id,
            completionNotes: comment,
          },
        });
    
        if(inprogressRef){
          navigate('/app/referrals');
        }
    
      } catch (err) {
        console.error(err);
      }
    } else if(submitButton === 'complete'){
      try {
        const completedRef = await completeReferral({
          variables: {
            referralId: referral._id,
            completionNotes: comment
          },
        });

        if(completedRef){
          navigate('/app/referrals');
        }

      } catch (err) {
        console.error(err);
      }
    }
  }


  
  return (
 
      <Stack p={10}>
        { !loading && (
          <> 
            <Grid>
              <Grid.Col span={2} pb={1} style={{ display:'flex', flexDirection: 'row', gap: '10px'}}>
                <Title order={2} c='columbia-blue.9' pl={0}>
                Referral 
                </Title>
                <Priority priority={referral.priority} />
              </Grid.Col>
              <Grid.Col span={6} />
              <Grid.Col span={4} p={5} style={{ alignSelf: 'end'}}>
                <UserStamp user={referral.assignedBy} />
              </Grid.Col>
              
            </Grid>

            <Divider color='brown'  style={{ border: '0.1px solid var(--mantine-color-brown-2)' }}/>
            
            <div style={{ display: 'flex', justifyContent:'left' }}>
              <Title order={5} c='columbia-blue.9'>{referral.title}</Title>
            </div>
            <Text c='brown.9' size='16px' pt={10}>Details:</Text>
            <Text c='brown.4' size='14px' pt={5}>{referral.desc}</Text>

            { referral.relatedProcesses && (
              <>
                <Text c='brown.9' size='16px' pt={10}>Related Processes:</Text>
                <ProcessPillGroup processes={referral.relatedProcesses} />
              </>
            )}
            

            <Space h={20} />
            <form onSubmit={form.onSubmit(submitForm)}>
              <Stack>
                <Title order={4}>Completion Notes</Title>
                <Textarea
                  placeholder="Anything worth mentioning about the completion of this?"
                  minRows={2}
                  maxRows={4}
                  key={form.key("comment")}
                  
                  {...form.getInputProps('comment')}
                />

                <Button type="submit" bg="green" name='complete'>Complete</Button>
                <Button type="submit" bg="blue-grey" name='inprogress'>In-Progress</Button>
               
              </Stack>

            </form>
          </>
        )}
      </Stack>

   
  )
}

export default ReferralCompPage