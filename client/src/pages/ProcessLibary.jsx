import ProcessEditorModal from "../components/ProcessEditorModal"
import {Modal, Button, Title, Stack, TextInput, Input, Checkbox, Group} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks"
import {IconLibraryPlus} from '@tabler/icons-react'
import { QUERY_COMPANY_PROCESSES } from "../utils/queries"
import {useQuery} from "@apollo/client"




const ProcessLibrary = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const {loading, data } = useQuery(QUERY_COMPANY_PROCESSES);

    const processData = data?.findProcesses || {};
    console.log(processData)

  if(loading){
    return (<h1>Loading</h1>)
  }

  return (
    <>
      <Title>Process Library</Title>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="70%"
      >
        {/* Modal content */}
        <Title>Add Process</Title>
        <ProcessEditorModal />
      </Modal>

      <Button
        variant="form"
        size="lg"
        m={20}
        leftSection={<IconLibraryPlus size={14} />}
        onClick={open}
      >
        Add Process
      </Button>


    </>
  );
};

export default ProcessLibrary;
