import ProcessEditor from "./ProcessEditor";
import {  Stack, TextInput, Input, Checkbox, Button, NativeSelect, Radio, Group, TagsInput } from "@mantine/core";
import { useListState, randomId } from "@mantine/hooks";
import {useForm } from '@mantine/form'
import { ADD_PROCESS } from "../utils/mutation";
import {useMutation, useQuery} from "@apollo/client"
import { QUERY_PROCESSES_GROUPED, QUERY_PROCESSES_SIMPLE } from "../utils/queries";
import {IconListDetails, IconMapSearch, IconPencil, IconArrowsRandom} from "@tabler/icons-react"
import { useEffect, useState } from "react";

const initialcheckboxes = [
  { label: "Physiotherapy", checked: false, key: randomId() },
  { label: "Occupational Therapy", checked: false, key: randomId() },
  { label: "Allied Health Assistant", checked: false, key: randomId() },
];



const ProcessEditorModal = ({contentData, closeModal, handleProcess}) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      processTitle: "",
      processText: "",
      processCategory: "",
      processSubCategory: "",
      referenceProcesses: []
    },

    // functions will be used to validate values at corresponding key
    validate: {
      processTitle: (value) =>
        value.length < 2 ? "Process must have a title" : null,
      processText: (value) =>
        value.length < 2 ? "Content is required within process text" : null,
      processCategory: (value) =>
        value === "Select Category" ? "Must Select at least one option" : null,
      processSubCategory: (value) =>
        value === "Select a Sub Category" ? "Must Select at least one option" : null,
    },
  });
  //If data already exists, set field state
  const [tagsData, setTagsData] = useState([])
  const [editorContent, setEditorContent] = useState(" ")

  useEffect(() => {
    if(contentData){
    form.setFieldValue('processTitle', contentData.processTitle)
    form.setFieldValue("processText", contentData.processText);
    form.setFieldValue("processCategory", contentData.processCategory);
    form.setFieldValue("processSubCategory", contentData.processSubCategory);
    setEditorContent(contentData.processText)
    let referenceProcessArray;
    if(contentData.referenceProcesses){
      referenceProcessArray = contentData.referenceProcesses.map(
        (content) => {
          return content.processTitle;
        }
      );
      setTagsData(referenceProcessArray)
    }
    if(contentData.populatedReferenceProcesses){
      referenceProcessArray = contentData.populatedReferenceProcesses.map((content) => {
        return content.processTitle;
      });
      setTagsData(referenceProcessArray);
    }
  }
  }, [contentData])

  
    //Query all processes for referencing
    const { data } = useQuery(QUERY_PROCESSES_SIMPLE);
    const processes = data?.getProcesses || [];
    

  const handleSubmit = async (formValues) => {

    const processIDs = tagsData.length > 0 ? processes.filter(process => tagsData.includes(process.processTitle))
            .map(process => process._id)
            : 
            null;

    try {
      let variables = {
        processTitle: formValues.processTitle,
        processText: formValues.processText,
        processCategory: formValues.processCategory,
        processSubCategory: formValues.processSubCategory,
        referenceProcesses: processIDs
      };

      //If this modal is being used to edit an existing process, hand in ID
      if(contentData){
        variables.processId = contentData._id
      }

      handleProcess(variables);
      //Close modal once processes has been added 
      closeModal()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          my={10}
          name="processTitle"
          label="Process Title"
          description="Give your Process a title"
          placeholder="How to complete a falls review"
          key={form.key("processTitle")}
          withAsterisk
          {...form.getInputProps("processTitle")}
        />
        <Input.Wrapper
          my={10}
          label="Choose a category"
          description="Choose a Category to order your processes"
          withAsterisk
        >
          <NativeSelect
          key={form.key('processCategory')}
            {...form.getInputProps("processCategory")}
            data={[
              "Select Category",
              "Equipment",
              "Six Month Reviews",
              "Falls Reviews",
            ]}
          />
        </Input.Wrapper>
        <Radio.Group
          key={form.key("processSubCategory")}
          {...form.getInputProps("processSubCategory")}
          name="favoriteFramework"
          label="Select a sub-category for this process"
          withAsterisk
        >
          <Group mt="xs">
            <Group>
              <Radio
                value="IconPencil"
                label="Note Writing"
                color="columbia-blue.4"
              />
              <IconPencil />
            </Group>
            <Group>
              <Radio
                value="IconMapSearch"
                label="Finding an item"
                color="columbia-blue.4"
              />
              <IconMapSearch />
            </Group>
            <Group>
              <Radio
                value="IconListDetails"
                label="List of tasks"
                color="columbia-blue.4"
              />
              <IconListDetails />
            </Group>
            <Group>
              <Radio
                value="IconArrowsRandom"
                label="Miscellaneous"
                checked
                color="columbia-blue.4"
              />
              <IconArrowsRandom />
            </Group>
          </Group>
        </Radio.Group>
        <Input.Wrapper
          withAsterisk
          my={10}
          label="Describe your process"
          description="Provide a detailed description of your process."
        >
          <ProcessEditor
            initialValue={editorContent}
            key={form.key("processText")}
            {...form.getInputProps("processText")}
            // onChange={(event) => {
            //   form.setFieldValue("processText", event);
            // }}
          />
        </Input.Wrapper>
        <TagsInput
          label="Select Related Processes"
          placeholder="Select related processes"
          value={tagsData}
          onChange={(value) => setTagsData(value)}
          // key={form.key("referenceProcesses")}
          // {...form.getInputProps("referenceProcesses")}
          data={processes.map((process) => ({
            value: `${process._id}`,
            label: `${process.processTitle}`,
          }))}
        ></TagsInput>

        <Button type="submit" variant="form" fullWidth mt={40}>
          Submit Process
        </Button>
      </form>
    </Stack>
  );
};

export default ProcessEditorModal;