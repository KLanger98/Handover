import ProcessEditor from "./ProcessEditor";
import {  Stack, TextInput, Input, Checkbox, Button, NativeSelect } from "@mantine/core";
import { useListState, randomId } from "@mantine/hooks";
import {useForm } from '@mantine/form'
import { ADD_PROCESS } from "../utils/mutation";
import {useMutation} from "@apollo/client"

const initialcheckboxes = [
  { label: "Physiotherapy", checked: false, key: randomId() },
  { label: "Occupational Therapy", checked: false, key: randomId() },
  { label: "Allied Health Assistant", checked: false, key: randomId() },
];

const editorContent = "<h1>Helllooooo</h1>"

const ProcessEditorModal = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { 
      processTitle: "", 
      processText: "", 
      processCategory: "" 
    },

    // functions will be used to validate values at corresponding key
    validate: {
      processTitle: (value) =>
        value.length < 2 ? "Process must have a title" : null,
      processText: (value) =>
        value.length < 2 ? "Content is required within process text" : null,
      processCategory: (value) =>
        value === "Select Category" ? "Must Select at least one option" : null,
    },
  });

  const [addProcess, { error }] = useMutation(ADD_PROCESS);

  const handleSubmit = async (formValues) => {

    try {
      console.log([
        formValues.processTitle,
        formValues.processText,
        formValues.processCategory,
      ]);
      let variables = {
          processTitle: formValues.processTitle, 
          processText: formValues.processText, 
          processCategory: formValues.processCategory}

      const { data, error } = await addProcess({
        variables: variables
      })

      if(error){
        console.log(error)
      }

      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };


  const [checkboxes, handlers] = useListState(initialcheckboxes);

  const allChecked = checkboxes.every((checkbox) => checkbox.checked);
  const indeterminate = checkboxes.some((checkbox) => checkbox.checked) && !allChecked;

  const items = checkboxes.map((checkbox, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={checkbox.label}
      key={checkbox.key}
      checked={checkbox.checked}
      color="columbia-blue.7"
      onChange={(event) =>
        handlers.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

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
          {...form.getInputProps("processTitle")}
        />
        <Input.Wrapper
          my={10}
          label="Choose a category"
          description="Choose a Category to order your processes"
        >
          <NativeSelect
            label="Input label"
            description="Input description"
            {...form.getInputProps("processCategory")}
            data={[
              "Select Category",
              "Equipment",
              "Six Month Reviews",
              "Falls Reviews",
            ]}
          />
        </Input.Wrapper>
        <Input.Wrapper
          my={10}
          label="Describe your process"
          description="Provide a detailed description of your process."
        >
          <ProcessEditor
            initialValue={editorContent}
            {...form.getInputProps("processText")}
            // onChange={(event) => {
            //   form.setFieldValue("processText", event);
            // }}
          />
        </Input.Wrapper>
        <Input.Wrapper
          my={10}
          label="Select Profession"
          description="Select which individual or group group of professions this process applies to"
        >
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            label="Allied Health"
            color="columbia-blue.7"
            onChange={() =>
              handlers.setState((current) =>
                current.map((checkbox) => ({
                  ...checkbox,
                  checked: !allChecked,
                }))
              )
            }
          />
          {items}
        </Input.Wrapper>
        <Button type="submit" variant="form" fullWidth>
          Submit Process
        </Button>
      </form>
    </Stack>
  );
};

export default ProcessEditorModal;