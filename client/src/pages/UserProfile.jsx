import { Image, Title, Stack, Group, Container,  Input, Button, Card, Divider } from "@mantine/core";
import {useForm } from "@mantine/form"
import { UPDATE_USER } from "../utils/mutation";
import { QUERY_ME } from "../utils/queries";
import {useMutation, useQuery} from "@apollo/client"



const UserProfile = () => {
  //User profile form state
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      imageUrl: "",
    },
    validate: {
      imageUrl: (value) =>
        value.length < 2 ? "Content is required within url" : null,
    },
  });
  //Use Query for fetching user data
  const {data, loading} = useQuery(QUERY_ME);

  const userData = data?.me || {}
  
  //Update user input fields with userData
  if(userData){
    form.setFieldValue("imageUrl", userData.imageUrl);
  }
  
  //Use mutation for updating user
  const [updateUser, {data: updateData, error}] = useMutation(UPDATE_USER,
    {
      refetchQuerues: [QUERY_ME]
    }
  )

  //Handle save of user details
  const handleSubmit = async (formValues) => {
    try{
      const variables = {
        imageUrl: formValues.imageUrl
      }

      const {data} = updateUser({
        variables: variables
      })
      
      form.setValues({imageUrl: data.updateUser.imageUrl})
    } catch(error){
      console.error(error)
    }
  }
  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <Container w="100%" mt={40} align="center">
      <Card w="80%" bg="white" shadow="md" radius="md" p={40} >
        <Title order={2}>User Profile:</Title>
        <Divider color="light-brown.2" size="lg"></Divider>
        <Stack w="100%">
          <form
            style={{ width: "100%" }}
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
          >
            <Group justify="space-evenly" mt={20}>
              <Stack>
                <Container border="2px solid black">
                  <Image
                    style={{
                      borderRadius: "50%",
                      height: "200px",
                      width: "200px",
                      maxWidth: "200px",
                      objectiFit: "cover",
                    }}
                    src={userData.imageUrl}
                  ></Image>
                </Container>
              </Stack>
              <Stack align="flex-start">
                <Title order={4}>Profile Picture:</Title>
                <Input.Wrapper
                  label="Provide Image link"
                  key={form.key("imageUrl")}
                >
                  <Input w={400} {...form.getInputProps("imageUrl")} />
                </Input.Wrapper>
              </Stack>
            </Group>
            <Button mt={100} type="submit" variant="form">
              Save Changes
            </Button>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default UserProfile;