import {Textarea, Text, Button, Stack, Title} from "@mantine/core"
import { ADD_FLAG } from "../utils/mutation";
import { useMutation } from "@apollo/client";
import {useForm } from "@mantine/form"
import { QUERY_FLAGS, QUERY_PROCESSES_GROUPED } from "../utils/queries";


const FlagProcessForm = ({closeModal, contentData}) => {
  const [addFlag, { data, error }] = useMutation(ADD_FLAG, 
    {
      refetchQueries: [QUERY_FLAGS, QUERY_PROCESSES_GROUPED]
    }
  );

  //Handle form state
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      flagText: ""
    },
    validate: {
      flagText: (value) =>
        value.length < 2 ? "Content is required within flag text" : null,
    },
  });
  console.log(contentData)
  //Handle submission of form
  const handleSubmit = async (formValues) => {
    console.log(formValues)

    try {
      let variables = {
        flagText: formValues.flagText,
        referenceProcess: contentData._id
      };
      console.log(variables)
      const {data} = addFlag({
        variables: variables
      })

      //Close modal once processes has been added
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

    return (
      <Stack>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Text>
            Please use this form to submit to administration missing or outdated
            information.
          </Text>
          <Textarea
            {...form.getInputProps("flagText")}
            label="Describe what you would like to flag about this process"
            resize="vertical"
          />
          <Button type="submit" variant="form" fullWidth mt={40}>
            Submit Process for Review
          </Button>
        </form>
      </Stack>
    );
}

export default FlagProcessForm