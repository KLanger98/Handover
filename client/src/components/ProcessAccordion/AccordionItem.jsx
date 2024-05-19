import {Group, ActionIcon, Accordion, Title, Modal, Text} from "@mantine/core"
import{ IconTrash, IconPencil } from "@tabler/icons-react"
import ProcessEditorModal from "../ProcessEditorModal"
import { useDisclosure } from "@mantine/hooks";
import  AccordionLabel  from "./AccordionLabel"
import { DELETE_PROCESS, UPDATE_PROCESS } from "../../utils/mutation";
import { QUERY_PROCESSES_GROUPED } from "../../utils/queries";
import {useMutation} from "@apollo/client"



function AccordionItem({ dataArray }) {
//Handle Edit Modal Open/Close
  const [editOpened, { open, close }] = useDisclosure(false);

//Handle Modal Delete
 const [deleteProcess, {error: deleteError}] = useMutation(DELETE_PROCESS, 
    {
        refetchQueries: [QUERY_PROCESSES_GROUPED]
    }
 )

 const handleProcessDelete = async (processId) => {
    try{
        console.log('hi', processId)
        const {data} = deleteProcess({
            variables: {processId}
        })
    } catch (error){
        console.error(error)
    }
 }

 //Handle Modal Update 
 const [updateProcess, {error: updateError}] = useMutation(UPDATE_PROCESS, 
  {
    refetchQueries: [QUERY_PROCESSES_GROUPED]
  }
 )
 const handleUpdateProcess = async ({processId, processTitle, processText, processCategory}) => {
  try{
    const { data } = updateProcess({
      variables: {processId, processTitle, processText, processCategory}
    })
  } catch(error){
    console.error(error)
  }
 }
  console.log(dataArray)

  return dataArray.map((contentData) => (
    <Group key={contentData._id}>
      <ActionIcon.Group>
        <ActionIcon variant="edit" size="md" onClick={open}>
          <IconPencil stroke={1.0} />
        </ActionIcon>
        <ActionIcon variant="delete" size="md" onClick={() => handleProcessDelete(contentData._id)}>
          <IconTrash stroke={1.0} />
        </ActionIcon>
      </ActionIcon.Group>

      <Modal opened={editOpened} onClose={close} centered size="70%">
        <Title>Edit Process</Title>
        <ProcessEditorModal contentData={contentData} closeModal={close} handleProcess={handleUpdateProcess}/>
      </Modal>

      <Accordion.Item value={contentData.processTitle} w="90%">
        <Accordion.Control>
          <AccordionLabel
            label={contentData.processTitle}
            formattedDate={contentData.formattedDate}
            description={contentData.processText}
          />
        </Accordion.Control>
        <Accordion.Panel>
          <div
            dangerouslySetInnerHTML={{ __html: contentData.processText }}
          ></div>
          <Text size="sm"></Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Group>
  ));
}

export default AccordionItem