import {Group, ActionIcon, Accordion, Title, Modal, Text, Flex} from "@mantine/core"
import{ IconTrash, IconPencil, IconFlag } from "@tabler/icons-react"
import {useState} from 'react'
import ProcessEditorModal from "../ProcessEditorModal"
import { useDisclosure } from "@mantine/hooks";
import  AccordionLabel  from "./AccordionLabel"
import { DELETE_PROCESS, UPDATE_PROCESS } from "../../utils/mutation";
import { QUERY_PROCESSES_GROUPED } from "../../utils/queries";
import {useMutation} from "@apollo/client"
import "./Accordion.scss"
import FlagProcessForm from "../FlagProcessForm";



function AccordionItem({ dataArray }) {
//Handle Edit Modal Open/Close
  const [editOpened, { open, close }] = useDisclosure(false);
  const [flagOpened, { open: openFlag, close: closeFlag}] = useDisclosure(false);
  const [currentContentData, setCurrentContentData] = useState(null);

//Handle Modal Delete
 const [deleteProcess, {error: deleteError}] = useMutation(DELETE_PROCESS, 
    {
        refetchQueries: [QUERY_PROCESSES_GROUPED]
    }
 )

 const handleProcessDelete = async (processId) => {
    try{
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
 
 const handleOpenEditorModal = (contentData) => {
  setCurrentContentData(contentData)
  open()
 }

  return dataArray.map((contentData) => (
    <Group key={contentData._id} m={4}>
      <ActionIcon.Group>
        <ActionIcon variant="edit" size="md" onClick={() => handleOpenEditorModal(contentData)}>
          <IconPencil stroke={1.0} />
        </ActionIcon>
        <ActionIcon
          variant="delete"
          size="md"
          onClick={() => handleProcessDelete(contentData._id)}
        >
          <IconTrash stroke={1.0} />
        </ActionIcon>
      </ActionIcon.Group>

      <Modal opened={editOpened} onClose={close} centered size="70%">
        <Title order={3}>Edit Process</Title>
        <ProcessEditorModal
          contentData={currentContentData}
          closeModal={close}
          handleProcess={handleUpdateProcess}
        />
      </Modal>

      <Accordion.Item
        className="item"
        variant="accordionDetail"
        value={contentData.processTitle}
        w="90%"
      >
        <Accordion.Control className="control">
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
          <Flex justify="flex-end" align="center" direction="row" gap={8}>
            <Text mt={0}>Something Missing?</Text>
            <ActionIcon
              style={{borderRadius: "100%"}}
              size="xl"
              aria-label="Flag process"
              variant="light"
              bg="red.1"
              onClick={openFlag}
            >
              <IconFlag style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Flex>
          <Modal opened={flagOpened} onClose={closeFlag} size="60%" title="Flag a Process for review" centered>
            <FlagProcessForm/>
          </Modal>
        </Accordion.Panel>
      </Accordion.Item>
    </Group>
  ));
}

export default AccordionItem