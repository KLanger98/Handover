import ProcessEditorModal from "../components/ProcessEditorModal"
import {Modal, Button, Title, Accordion, Stack} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks"
import {IconLibraryPlus} from '@tabler/icons-react'
import { useQuery } from "@apollo/client"
import { QUERY_PROCESSES_GROUPED} from "../utils/queries"
import AccordionItem from "../components/ProcessAccordion/AccordionItem"
import { ADD_PROCESS } from "../utils/mutation"
import { useMutation } from "@apollo/client"


const ProcessLibrary = () => {
    //Modal open/close hook
    const [opened, { open, close }] = useDisclosure(false);


    //Query processes group by category
    const {loading, data} = useQuery(QUERY_PROCESSES_GROUPED);
    const processData = data?.findProcessesGroupedByCategory || {}

    //Handle add Process
    const [addProcess, { error }] = useMutation(ADD_PROCESS, {
      refetchQueries: [QUERY_PROCESSES_GROUPED],
    });

    const handleAddProcess = async ({processTitle, processText, processCategory}) => {
      const { data, error } = await addProcess({
        variables: {processTitle, processText, processCategory}
      })

      if(error){
        console.log(error)
      }
    }

    const renderAccordian = (dataArray) => {
      console.log(dataArray)
      return dataArray.map((category) => (
        <Stack key={category._id}>
          <Title order={3}>{category._id}</Title>
          <Accordion>
            <AccordionItem dataArray={category.processes}/>
          </Accordion>
        </Stack>
      ));
    }

  if(loading){
    return(<h1>Loading...</h1>)
  }

  return (
    <>
      <Title>Process Library</Title>
      <Modal opened={opened} onClose={close} centered size="70%">
        {/* Modal content */}
        <Title>Add Process</Title>
        <ProcessEditorModal
          closeModal={close}
          contentData={""}
          handleProcess={handleAddProcess}
        />
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
      {renderAccordian(processData)}
    </>
  );
};

export default ProcessLibrary;