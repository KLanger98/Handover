import { useQuery, useMutation } from "@apollo/client";
import {Title, Card, Stack, Text, Image, Avatar, Group, TextInput, Button} from "@mantine/core"
import { QUERY_SINGLE_COMPANY } from "../utils/queries";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { UPDATE_COMPANY } from "../utils/mutation";

const SiteInformation = () => {
  //State to manage edit state 
  const isEditing = true;

  const {data, loading} = useQuery(QUERY_SINGLE_COMPANY)
  const companyData = data?.getCompany || {}


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      companyDescription: companyData.companyDescription || "",
      companyAddress: companyData.companyAddress || "",
      companyImage: companyData.companyImage || "",
      companyModerators: companyData.companyModerators || [],
      companyUsers: companyData.companyUsers || []
    }
  })

    const [updateCompany, {error}] = useMutation(UPDATE_COMPANY, {
      refetchQueries: [QUERY_SINGLE_COMPANY]
    }
    );

    const renderAvatars = (moderators) => {
      return moderators.map((moderator) => (
        <Group key={moderator.fullName}>
          <Avatar
            src={moderator.imageUrl}
            variant="filled"
            radius="xl"
            size="md"
            color="columbia-blue.6"
          >
            {moderator.initials}
          </Avatar>
          <Text>{moderator.fullName}</Text>
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
            {isEditing ? (
              <TextInput
                key={form.key("companyDescription")}
                {...form.getInputProps("companyDescription")}
              />
            ) : (
              <Text>{companyData.companyDescription}</Text>
            )}
            <Title order={4}>Site Address</Title>
            {isEditing ? (
              <TextInput
                key={form.key("companyAddress")}
                {...form.getInputProps("companyAddress")}
              />
            ) : (
              <Text>{companyData.companyAddress}</Text>
            )}
            <Title order={4}>Site Contacts</Title>
            <Text></Text>

            <Title order={4}>Site Map</Title>
            {isEditing ? (
              <TextInput
                key={form.key("companyImage")}
                {...form.getInputProps("companyImage")}
              />
            ) : (
              <Image w={400} src={companyData.companyImage} />
            )}
            <Title order={4}>Moderators</Title>
            {renderAvatars(companyData.companyModerators)}
            <Title order={4}>Users</Title>
            {renderAvatars(companyData.companyUsers)}
            <Button variant="form" type="submit" m={5}>
              Save
            </Button>
            <Button variant="form" type="submit" m={5}>
              Add User
            </Button>
          </form>
        </Stack>
      </Card>
    );
}

export default SiteInformation;