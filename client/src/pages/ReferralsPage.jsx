import { Stack, Button } from "@mantine/core";
import { Referrals } from "../components";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REFERRAL } from '../utils/mutation'

const ReferralsPage = () => {

    const [addReferral, { error }] = useMutation(ADD_REFERRAL)

    const handleClick = async () => {
        const { data, error } = await addReferral({
            variables: { title: "Bennedict has fallen", desc: "Fortunately, for the kingdom...", priority: "high", relatedProcesses: [] 
        }})

        if(error){
            console.log(error)
        }

        console.log(data)

    }

  useEffect(() => {});
  return (
    <>
      <Stack gap={10} p={10}>
        <Button color="blue" size="lg" onClick={handleClick}> CLICK</Button>
      </Stack>
    </>
  );
};

export default ReferralsPage;
