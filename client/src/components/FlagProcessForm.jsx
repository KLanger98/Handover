import {Textarea, Text, Button, Stack} from "@mantine/core"
const FlagProcessForm = () => {
    return (
      <Stack>
        <Text>
          Please use this form to submit to administration missing or outdated
          information.
        </Text>
        <Textarea
          label="Describe what you would like to flag about this process"
          resize="vertical"
        />
        <Button variant="form" mt={40}>
          Submit Process for Review
        </Button>
      </Stack>
    );
}

export default FlagProcessForm