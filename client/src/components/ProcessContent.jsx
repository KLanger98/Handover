import { IconFlag, IconPencil, IconTrash } from "@tabler/icons-react";
import {
  ActionIcon,
  Button,
  Group,
  Flex,
  Text,
  Modal,
  Title,
  Stack,
  Box
} from "@mantine/core";
import ProcessEditorModal from "../components/ProcessEditorModal";
import FlagProcessForm from "./FlagProcessForm";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROCESS, UPDATE_PROCESS } from "../utils/mutation";
import { QUERY_PROCESSES_GROUPED } from "../utils/queries";
import FlagBanner from "./FlagBanner";

const ProcessContent = ({ contentData, flagData, pageRedirect }) => {
  const navigate = useNavigate();
  //Handle Edit Modal Open/Close
  const [editOpened, { open, close }] = useDisclosure(false);
  const [flagOpened, { open: openFlag, close: closeFlag }] =
    useDisclosure(false);
  const [currentContentData, setCurrentContentData] = useState(null);

  //Handle Modal Delete
  const [deleteProcess, { error: deleteError }] = useMutation(DELETE_PROCESS, {
    refetchQueries: [QUERY_PROCESSES_GROUPED],
  });

  //Handle deleting process
  const handleProcessDelete = async (processId) => {
    try {
      const { data } = deleteProcess({
        variables: { processId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  //Handle Modal Update
  const [updateProcess, { error: updateError }] = useMutation(UPDATE_PROCESS, {
    refetchQueries: [QUERY_PROCESSES_GROUPED],
  });
  const handleUpdateProcess = async ({processId, processTitle, processText, processCategory, processSubCategory,}) => {
    try {
      const { data } = updateProcess({
        variables: {
          processId,
          processTitle,
          processText,
          processCategory,
          processSubCategory,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  //Modal handlers
  const handleOpenEditorModal = (contentData) => {
    setCurrentContentData(contentData);
    open();
  };

  const handleOpenFlagModal = (contentData) => {
    setCurrentContentData(contentData);
    openFlag();
  };
  //Filter from dataArray processes that do not match the search terms based on title or content

  const renderFlags = (flagData) => {
    return flagData.map((flag) => (
        <FlagBanner key={flag._id} flagData={flag} w="100%" />
    ));
  };

  return (
    <Stack key={contentData._id}>
      <Modal opened={editOpened} onClose={close} centered size="70%">
        <Title order={3}>Edit Process</Title>
        <ProcessEditorModal
          contentData={currentContentData}
          closeModal={close}
          handleProcess={handleUpdateProcess}
        />
      </Modal>
      <Group>
        <Button
          variant="edit"
          size="md"
          onClick={() => handleOpenEditorModal(contentData)}
          rightSection={<IconPencil stroke={1.0} />}
        >
          Edit Process
        </Button>
        <Button
          variant="delete"
          size="md"
          onClick={() => handleProcessDelete(contentData._id)}
          rightSection={<IconTrash stroke={1.0} />}
        >
          Delete Process
        </Button>
        {pageRedirect ? (
          <Button
            variant="form"
            size="md"
            onClick={() => navigate(`/app/processes/${contentData._id}`)}
          >
            Open As Page
          </Button>
        ) : (
          <Button
            variant="form"
            size="md"
            onClick={() => navigate(`/app/processes`)}
          >
            Return To Library
          </Button>
        )}
      </Group>
      <Box>{flagData && renderFlags(flagData)}</Box>
      <div dangerouslySetInnerHTML={{ __html: contentData.processText }}></div>
      <Flex justify="flex-end" align="center" direction="row" gap={8}>
        <Text mt={0} c="red.8">
          Something Missing?
        </Text>
        <ActionIcon
          style={{ borderRadius: "100%" }}
          size="xl"
          aria-label="Flag process"
          variant="light"
          bg="red.1"
          onClick={() => handleOpenFlagModal(contentData)}
        >
          <IconFlag style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Flex>
      <Modal
        opened={flagOpened}
        onClose={closeFlag}
        size="60%"
        title="Flag a Process for review"
        centered
      >
        <FlagProcessForm
          contentData={currentContentData}
          closeModal={closeFlag}
        />
      </Modal>
    </Stack>
  );
};

export default ProcessContent;
