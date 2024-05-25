import { useNavigate } from 'react-router-dom'
import { Title, Stack, Divider, Textarea, Button, TextInput, SegmentedControl, TagsInput } from '@mantine/core'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_REFERRAL } from '../utils/mutation'
import { QUERY_PROCESSES_SIMPLE } from '../utils/queries'
import { useForm } from '@mantine/form'
import { Priority } from '../components'


const NewReferral = () => {

    const { data } = useQuery(QUERY_PROCESSES_SIMPLE);
    const processes = data?.getProcesses || [];

    const [addReferral, { error }] = useMutation(ADD_REFERRAL, {
        refetchQueries: [{ query: QUERY_PROCESSES_SIMPLE }]
    });
    
    const navigate = useNavigate();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: { title: '', desc: '', priority: 'low'},
        validate: {
          title: (value) => value !== '' ? null : "Provide a title"
        },
      });

    const submitForm = async (data) => {
        
        // This insanity is because the Input field 'TagsInput' isn't reutnring the value but instead the label
        // so i have to filter to get the selected process and then map to get the id
        const processIDs = data.processes.length > 0 ? processes.filter(process => data.processes.includes(process.processTitle))
            .map(process => process._id)
            : 
            null;

        try {
            const newReferral = await addReferral({
                variables: {
                    title: data.title,
                    desc: data.desc,
                    priority: data.priority,
                    relatedProcesses: processIDs
                }
            });

            if(newReferral){
                navigate('/app/referrals');
            }
        } catch (err) {
            console.error(err);
        }
        
  
    }
  return (
    <Stack p={10}>
       
        <div style={{ display: 'flex', justifyContent:'left', gap: '10px' }}>
            <Title order={2} c='columbia-blue.9' pl={0}>
            Referral 
            </Title>
        </div>
            
        <Divider color='brown'  style={{ border: '0.1px solid var(--mantine-color-brown-2)' }}/>

        <form onSubmit={form.onSubmit(submitForm)}>
            <Stack>
            <Title order={4}>Title</Title>
            <TextInput
                placeholder="Gary had a fall"
                key={form.key("title")}
                
                {...form.getInputProps('title')}
            />
            <Title order={4}>Details</Title>
            <Textarea
                placeholder="Provide necessary details."
                minRows={2}
                maxRows={4}
                key={form.key("desc")}
                
                {...form.getInputProps('desc')}
            />
            <Title order={4}>Priority</Title>
            <SegmentedControl data={[
                {
                    value: 'low', 
                    label: (
                        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                            <Priority priority='low' />
                            <span> Low</span>
                        </div>
                    )
                },
                {
                    value: 'medium', 
                    label: (
                        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                            <Priority priority='medium' />
                            <span> Medium</span>
                        </div>
                    )
                },
                {
                    value: 'high', 
                    label: (
                        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                            <Priority priority='high' />
                            <span> High</span>
                        </div>
                    )
                }
            ]}
                key={form.key("priority")}
                {...form.getInputProps('priority')}
                style={{ textTransform: 'capitalize'}}
                />

            <TagsInput 
                label='Select Related Processes'
                placeholder='Select related processes'
                key={form.key("processes")}
                {...form.getInputProps('processes')}

                data={processes.map((process) => ({value: `${process._id}`, label: `${process.processTitle}`}))}

                />

            <Button type="submit" bg="green" name='create'>Create</Button>
            </Stack>

        </form>
 
      
      </Stack>
  )
}

export default NewReferral