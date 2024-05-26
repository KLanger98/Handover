import { useQuery } from "@apollo/client";
import {Title, Card, Stack, Text, Image, Avatar, Group} from "@mantine/core"
import { QUERY_SINGLE_COMPANY } from "../utils/queries";

const SiteInformation = () => {

    const {data, loading} = useQuery(QUERY_SINGLE_COMPANY)
    const companyData = data?.getCompany || {}
    console.log(companyData)

    const renderModerators = (moderators) => {
      console.log(moderators)
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
    if(loading){
      return <h1>Loading</h1>
      
    }
    return (
      <Card>
        <Stack>
          <Title order={2}>{companyData.companyName} Information</Title>
          <Title order={4}>Site Description</Title>
          <Text></Text>
          <Title order={4}>Site Address</Title>
          <Text></Text>
          <Title order={4}>Site Contacts</Title>
          <Text></Text>
          <Title order={4}>Site Map</Title>
          <Image/>
          <Title order={4}>Moderators</Title>
          {renderModerators(companyData.companyModerators)}
          <Title order={4}>Users</Title>
        </Stack>
      </Card>
    );
}

export default SiteInformation;