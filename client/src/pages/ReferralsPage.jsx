import { Stack } from "@mantine/core";
import { Referrals } from "../components";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REFERRAL } from '../utils/mutation'
import { QUERY_REFERRALS } from "../utils/queries";

const ReferralsPage = () => {

    const [addReferral, { error }] = useMutation(ADD_REFERRAL, {
        refetchQueries: [{ query: QUERY_REFERRALS }]
    })
    const { data, loading } = useQuery(QUERY_REFERRALS)
    const referrals = data?.findReferrals || []
    console.log(referrals)
    let incomplete = [];
    let inprogress = [];
    let completed = [];

    referrals.forEach(referral => {
        if(referral.status === 'incomplete'){
            incomplete.push(referral)
        } else if(referral.status === 'inprogress'){
            inprogress.push(referral)
        } else if(referral.status === 'completed'){
            completed.push(referral)
        }
    });

    const handleClick = async () => {
        // const { data, error } = await addReferral({
        //     variables: { title: "Paul took a stick and hit Kevin", desc: "Actually Kevin ded", priority: "medium", relatedProcesses: [] 
        // }})

        if(error){
            console.log(error)
        }

        // console.log(data)

    }


  return (
    <>
      <Stack gap={10} p={10}>
       <Referrals title="Referrals" incomplete={incomplete} inprogress={inprogress} completed={completed} />
      </Stack>
    </>
  );
};

export default ReferralsPage;
