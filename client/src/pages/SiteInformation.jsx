import { useQuery, useMutation } from "@apollo/client";
import {Title, Card, Stack, Text, Image, Avatar, Group, TextInput, Button, Modal, Divider, Textarea} from "@mantine/core"
import { QUERY_SINGLE_COMPANY } from "../utils/queries";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { REMOVE_COMPANY_USER, UPDATE_COMPANY } from "../utils/mutation";
import {useAuth} from "../utils/AppContext"
import AddUser from "../components/AddUser"

const SiteInformation = () => {
  //State to manage edit state 
  const { userProfile } = useAuth();

  //Manage modal state for adding user 
  const [opened, { open, close }] = useDisclosure(false);

  //Query data about single company
  const {data, loading} = useQuery(QUERY_SINGLE_COMPANY)
  const companyData = data?.getCompany || {}

  //useMutations for updated company details and deleting user
  const [updateCompany, { error }] = useMutation(UPDATE_COMPANY, {
    refetchQueries: [QUERY_SINGLE_COMPANY],
  });

  const [removeUserAccount, { error: deleteUserError }] = useMutation(
    REMOVE_COMPANY_USER,
    {
      refetchQueries: [QUERY_SINGLE_COMPANY],
    }
  );

  //State for form variables
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      companyDescription: "",
      companyAddress: "",
      companyImage: "",
      companyModerators: [],
      companyUsers: [],
      companyMaps: "",
      dashboardText: ""
    },
  });

  //Set state of form values once companyData loads
  useEffect(() => {
    if (!loading && companyData) {
      form.setValues({
        companyDescription: companyData.companyDescription || "",
        companyAddress: companyData.companyAddress || "",
        companyImage: companyData.companyImage || "",
        companyModerators: companyData.companyModerators || [],
        companyUsers: companyData.companyUsers || [],
        companyMap: companyData.companyMap || "",
        dashboardText: companyData.dashboardText || ""
      });
    }
  }, [loading, companyData]);

  //Handle submission of updated company Data
  const handleSubmit = () => {
      try{
        const {
          companyDescription,
          companyAddress,
          companyImage,
          companyMap,
          dashboardText,
        } = form.getValues();
        const { data } = updateCompany({
          variables: { companyDescription, companyAddress, companyImage, companyMap, dashboardText },
        });

      }catch(error) {
        console.error(error)
      }
    }
  //Handle Deleting user 
    const handleDeleteUser = (userId) => {
      try{
        const { data } = removeUserAccount({
          variables: { userId }
        })
      } catch(error){
        console.error(error)
      }
    }
    //Render avatar cards with their name, profession and contactNumber 
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
          <Text>{user.contactEmail}</Text>
          <Text>{user.contactNumber}</Text>
          {user._id != userProfile._id && (
            <Button
              onClick={() => handleDeleteUser(user._id)}
              size="sm"
              variant="delete"
            >
              Delete User
            </Button>
          )}
        </Group>
      ));
    };
    //If companyData loading, return loading screen
    if(loading){
      return <h1>Loading</h1>
      
    }
    return (
      <Card>
        <Stack>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Title order={2}>{companyData.companyName} Information</Title>
            <Divider size="md" color="light-brown.8" m={8} />
            <Title order={4}>Site Description</Title>
            <Divider size="md" color="light-brown.4" m={4} />
            {userProfile.moderator ? (
              <Textarea
                key={form.key("companyDescription")}
                {...form.getInputProps("companyDescription")}
                resize="vertical"
              />
            ) : (
              <Text>{companyData.companyDescription}</Text>
            )}
            <Title order={4}>Site Address</Title>
            <Divider size="md" color="light-brown.4" m={4} />
            {userProfile.moderator ? (
              <TextInput
                key={form.key("companyAddress")}
                {...form.getInputProps("companyAddress")}
              />
            ) : (
              <Text>{companyData.companyAddress}</Text>
            )}
            <Title order={4}>Admin Staff</Title>
            <Divider size="md" color="light-brown.4" m={4} />
            {renderAvatars(companyData.companyModerators)}
            <Title order={4}>Company Contacts</Title>
            <Divider size="md" color="light-brown.4" m={4} />
            {renderAvatars(companyData.companyUsers)}
            {!companyData.companyUsers.length ? (
              <Text>No Users added yet..</Text>
            ): null}
            <Stack m={8}>
                <Title order={4}>Site Map</Title>
                {userProfile.moderator ? (
                  <TextInput
                    w={500}
                    key={form.key("companyMap")}
                    {...form.getInputProps("companyMap")}
                  />
                ) : null}
              <Image w={400} src={companyData.companyMap} />
            </Stack>
            {userProfile.moderator ? (
              <>
                <Stack m={8}>
                  <Stack>
                    <Title order={4}>Company Image</Title>
                    {userProfile.moderator ? (
                      <TextInput
                        w={500}
                        key={form.key("companyImage")}
                        {...form.getInputProps("companyImage")}
                      />
                    ) : null}
                  </Stack>
                  <Image w={400} src={companyData.companyImage} />
                </Stack>
                <Title order={4}>Dashboard Description</Title>

                <Divider size="md" color="light-brown.4" m={4} />
                <Textarea
                resize="vertical"
                  key={form.key("dashboardText")}
                  {...form.getInputProps("dashboardText")}
                />
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
              </>
            ) : null}
          </form>
        </Stack>
      </Card>
    );
}

export default SiteInformation;