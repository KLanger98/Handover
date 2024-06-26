import ProcessEditorModal from "../components/ProcessEditorModal"
import {Modal, Button, Title, Accordion, Stack, Divider, TextInput, Group, ActionIcon, Image, Text, Indicator} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks"
import {IconLibraryPlus, IconSearch, IconFlagCog} from '@tabler/icons-react'
import { useQuery, useMutation } from "@apollo/client"
import {useState} from "react"
import { QUERY_PROCESSES_GROUPED, QUERY_PROCESSES, QUERY_PROCESSES_SIMPLE} from "../utils/queries"
import AccordionItem from "../components/ProcessAccordion/AccordionItem"
import { ADD_PROCESS } from "../utils/mutation"
import "../components/ProcessAccordion/Accordion.scss"
import {useAuth} from "../utils/AppContext"


const ProcessLibrary = () => {
    //User admin variable 
    const { userProfile } = useAuth();
    //Modal open/close hook
    const [opened, { open, close }] = useDisclosure(false);

    //useState to store search term 
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (event) =>{
      setSearchTerm(event.target.value);
    }

    const [filterFlags, setFilterFlags] = useState(false);
    const handleFlagFilterChange = () => {
      if(filterFlags == true){
        setFilterFlags(false)
      } else{
        setFilterFlags(true)
      }
    }

    //Query processes group by category
    const {loading, data} = useQuery(QUERY_PROCESSES_GROUPED);
    const processData = data?.findProcessesGroupedByCategory || {}
    
    //Handle add Process
    const [addProcess, { error }] = useMutation(ADD_PROCESS, {
      refetchQueries: [QUERY_PROCESSES_GROUPED, QUERY_PROCESSES, QUERY_PROCESSES_SIMPLE],
    });

    const handleAddProcess = async ({processTitle, processText, processCategory, processSubCategory, referenceProcesses}) => {
      
      const { data, error } = await addProcess({
        variables: {processTitle, processText, processCategory, processSubCategory, referenceProcesses}
      })

      if(error){
        console.log(error)
      }
    }

    const renderAccordian = (dataArray) => {
      const items = dataArray.map((category) => {
        let filteredArr = category.processes.filter((process) => {
          const matchesSearchTerms =
            process.processTitle
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            process.processText
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          let matchesFilter = true;
          if (filterFlags == true && process.populatedFlags.length < 1) {
            matchesFilter = false;
          }
          return matchesSearchTerms && matchesFilter;
        });

        return {...category, filteredArr}
      })
      

      return items.map((category) => (
        <>
          {category.filteredArr.length > 0 ? (
            <Stack key={category._id}>
              <Title mt={10} order={3}>
                {category._id}
              </Title>
              <Divider size="lg" color="light-brown.8" />
              <Accordion variant="separated" className="root">
                <AccordionItem
                  dataArray={category.filteredArr}
                />
              </Accordion>
            </Stack>
          ) : null}
        </>
      ));
    }

  if(loading){
    return(<h1>Loading...</h1>)
  }

  return (
    <Stack>
      <Group>
        <Stack>
          <Title order={2}>Process Library</Title>
          <Text>
            Here you can find all relevant processes for your position!
          </Text>
        </Stack>
      </Group>
      <Stack>
        <Group w="80%" direction="row" wrap="nowrap" m={10}>
          <TextInput
            placeholder="Search for a Process"
            size="md"
            w={800}
            onChange={handleSearchChange}
          />
          <ActionIcon size="input-md" variant="default" bg="columbia-blue.6">
            <IconSearch color="white" />
          </ActionIcon>
        </Group>
        {userProfile.moderator === true && (
          <Group>
            <Button
              variant="form"
              size="lg"
              ml={10}
              w={300}
              leftSection={<IconLibraryPlus size={25} />}
              onClick={open}
            >
              Add Process
            </Button>
            {!filterFlags ? (
              <Button
                variant="delete"
                ml={10}
                w={300}
                size="lg"
                leftSection={<IconFlagCog size={25} />}
                onClick={handleFlagFilterChange}
              >
                View Flagged Processes
              </Button>
            ) : (
              <Button
                variant="edit"
                ml={10}
                w={300}
                size="lg"
                leftSection={<IconFlagCog size={25} />}
                onClick={handleFlagFilterChange}
              >
                Show All Processes
              </Button>
            )}
          </Group>
        )}
      </Stack>

      <Modal opened={opened} onClose={close} centered size="70%">
        {/* Modal content */}
        <Title>Add Process</Title>
        <ProcessEditorModal
          closeModal={close}
          contentData={""}
          handleProcess={handleAddProcess}
        />
      </Modal>

      {renderAccordian(processData)}
    </Stack>
  );
};

export default ProcessLibrary;