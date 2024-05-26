import {Container, Text, Group, Button} from "@mantine/core"
import {IconFlag, IconFlagCheck} from "@tabler/icons-react"
import { DELETE_FLAG } from "../utils/mutation";
import {useMutation} from "@apollo/client"
import { QUERY_FLAGS, QUERY_PROCESSES_GROUPED } from "../utils/queries";

const FlagBanner = ({flagData}) => {
    const [deleteProcess, {error}] = useMutation(DELETE_FLAG,
        {
            refetchQueries: [QUERY_PROCESSES_GROUPED, QUERY_FLAGS]
        }
    )
    
    const handleFlagDelete = async (flagId) => {
      try {
        const { data } = deleteProcess({
          variables: { flagId },
        });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <Container
          bg="red.2"
          fluid
          mt={8}
          p={5}
          style={{ borderRadius: "10px" }}
        >
          <Group justify="space-between">
            <Group>
              <IconFlag  size={25} />
              <Text size="md">{flagData.flagText}</Text>
              <Text size="sm"fw={400}> - {flagData.formattedDate}</Text>
            </Group>
            <Button variant="delete" rightSection={<IconFlagCheck size={20}/>} onClick={() => handleFlagDelete(flagData._id)}>Resolve Flag</Button>
          </Group>
        </Container>
      </>
    );
}
export default FlagBanner;