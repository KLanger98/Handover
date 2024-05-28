import { useQuery, useMutation } from "@apollo/client";
import {Title, Card, Stack, Text, Image, Avatar, Group, TextInput, Button, Modal} from "@mantine/core"
import { QUERY_SINGLE_COMPANY } from "../utils/queries";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { UPDATE_COMPANY } from "../utils/mutation";
import {useAuth} from "../utils/AppContext"
import AddUser from "../components/AddUser"

const SiteInformation = () => {
  //State to manage edit state 
  const { userProfile } = useAuth();

  const [opened, { open, close }] = useDisclosure(false);

  const {data, loading} = useQuery(QUERY_SINGLE_COMPANY)
  const companyData = data?.getCompany || {}

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      companyDescription: "",
      companyAddress: "",
      companyImage: "",
      companyModerators: [],
      companyUsers: [],
    },
  });

  useEffect(() => {
    if (companyData) {
      form.setValues({
        companyDescription: companyData.companyDescription || "",
        companyAddress: companyData.companyAddress || "",
        companyImage: companyData.companyImage || "",
        companyModerators: companyData.companyModerators || [],
        companyUsers: companyData.companyUsers || [],
      });
    }
  }, [companyData]);

    const [updateCompany, {error}] = useMutation(UPDATE_COMPANY, {
      refetchQueries: [QUERY_SINGLE_COMPANY]
    }
    );

    const renderAvatars = (users) => {
      return users.map((user) => (
        <Group key={user.fullName} m={5}>
          <Avatar
            src={user.imageUrl}
            variant="filled"
            radius="xl"
            size="md"
            color="columbia-blue.6"
          >
            {user.initials}
          </Avatar>
          <Text>{user.fullName}</Text>
          <Text>{user.profession}</Text>
          <Text>{user.contactNumber}</Text>
        </Group>
      ));
    }

    const handleSubmit = () => {
      try{
        const {companyDescription, companyAddress, companyImage} = form.getValues()
        const { data } = updateCompany({
          variables: { companyDescription, companyAddress, companyImage },
        });

      }catch(error) {
        console.error(error)
      }
    }

    if(loading){
      return <h1>Loading</h1>
      
    }
    return (
      <Card>
        <Stack>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Title order={2}>{companyData.companyName} Information</Title>
            <Title order={4}>Site Description</Title>
            {userProfile.moderator ? (
              <TextInput
                key={form.key("companyDescription")}
                {...form.getInputProps("companyDescription")}
              />
            ) : (
              <Text>{companyData.companyDescription}</Text>
            )}
            <Title order={4}>Site Address</Title>
            {userProfile.moderator ? (
              <TextInput
                key={form.key("companyAddress")}
                {...form.getInputProps("companyAddress")}
              />
            ) : (
              <Text>{companyData.companyAddress}</Text>
            )}

            <Title order={4}>Site Map</Title>
            {userProfile.moderator ? (
              <TextInput
                key={form.key("companyImage")}
                {...form.getInputProps("companyImage")}
              />
            ) : (
              <Image w={400} src={companyData.companyImage} />
            )}
            <Title order={4}>Admin Staff</Title>
            {renderAvatars(companyData.companyModerators)}
            <Title order={4}>Company Contacts</Title>
            {renderAvatars(companyData.companyUsers)}
            {userProfile.moderator && (
              <Group>
                <Button variant="form" type="submit" m={5}>
                  Save
                </Button>
                <Modal opened={opened} onClose={close} title="Add A User">
                  <AddUser closeModal={close} />
                </Modal>
                <Button variant="form" type="submit" m={5} onClick={open}>
                  Add User
                </Button>
              </Group>
            )}
          </form>
        </Stack>
      </Card>
    );
}

export default SiteInformation;