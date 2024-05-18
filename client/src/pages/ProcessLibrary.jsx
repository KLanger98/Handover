import ProcessEditorModal from "../components/ProcessEditorModal"
import {Modal, Button, Title, Accordion, Stack, Text, Avatar, Group, ActionIcon} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks"
import {IconLibraryPlus, IconPencil, IconTrash} from '@tabler/icons-react'
import { useQuery } from "@apollo/client"
import { QUERY_PROCESSES_GROUPED} from "../utils/queries"

function AccordionLabel({ label, image, description }) {
  let shortenedDescription = description.slice(0,10) + "..."
  return (
    <Group wrap="nowrap" justify="space-between">
      <Group>
        <Avatar src={image} radius="xl" size="lg" />
        <div>
          <Text>{label}</Text>
          <Text size="sm" c="dimmed" fw={400}>
            {shortenedDescription}
          </Text>
        </div>
      </Group>
    </Group>
  );
}

function AccordianItem({dataArray}){
  console.log(dataArray)
  const [editOpened, { open, close }] = useDisclosure(false);
      return dataArray.map((contentData) => (
        <Group key={contentData._id}>
          <ActionIcon.Group>
            <ActionIcon variant="edit" size="md" onClick={open}>
              <IconPencil stroke={1.0} />
            </ActionIcon>
            <ActionIcon variant="delete" size="md">
              <IconTrash stroke={1.0} />
            </ActionIcon>
          </ActionIcon.Group>

          <Modal opened={editOpened} onClose={close} centered size="70%">
            <Title>Edit Process</Title>
            <ProcessEditorModal contentData={contentData} />
          </Modal>

          <Accordion.Item value={contentData.processTitle} w="90%">
            <Accordion.Control>
              <AccordionLabel
                label={contentData.processTitle}
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

const ProcessLibrary = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const {loading, data} = useQuery(QUERY_PROCESSES_GROUPED);
    const processData = data?.findProcessesGroupedByCategory || {}

    console.log(processData)


    const renderAccordian = (dataArray) => {
      return dataArray.map((category) => (
        <>
          <Title order={3}>{category._id}</Title>
          <Accordion>
            <AccordianItem dataArray={category.processes}/>
          </Accordion>
        </>
      ));
    }

  if(loading){
    return(<h1>Loading...</h1>)
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
        <ProcessEditorModal contentData={""}/>
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