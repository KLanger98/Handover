import { Stack, Title, Divider } from "@mantine/core";
import { Container } from ".."; //I made my own container for styling purposes
import { useQuery } from "@apollo/client";
import { QUERY_FLAGS } from "../../utils/queries";
import FlagItem from "./FlagItem"


const FlagContainer = () => {
    
  const {data, loading} = useQuery(QUERY_FLAGS);

  const flagData = data?.findFlags || {};

  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <Container>
      <Stack gap={0}>
        <Title order={3} c="blue-grey.9" align="left" pb={15} pt={15} pl={22}>
          Flagged Processes
        </Title>

        <Divider className="divider" />
          {flagData.map((flag) => (
            <FlagItem key={flag.id} data={flag} />
          ))}
        <Stack gap={0}></Stack>
      </Stack>
    </Container>
  );
};

export default FlagContainer;
