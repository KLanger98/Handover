import ProcessEditorModal from "../components/ProcessEditorModal"
import {Modal, Button, Title, Stack, TextInput, Input, Checkbox, Group} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks"
import {IconLibraryPlus} from '@tabler/icons-react'




const ProcessLibrary = () => {
    const [opened, { open, close }] = useDisclosure(false);

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
