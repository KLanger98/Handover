import { useQuery } from "@apollo/client";
import {Title, Card, Stack, Text, Image} from "@mantine/core"
import { QUERY_SINGLE_COMPANY } from "../utils/queries";

const SiteInformation = () => {

    const {data, loading} = useQuery(QUERY_SINGLE_COMPANY)
    const companyData = data?.getCompany || {}

    return (
      <Card>
        <Stack>
          <Title>Site Information</Title>
          <Title order={4}>Site Description</Title>
          <Text></Text>
          <Title order={4}>Site Address</Title>
          <Text></Text>
          <Title order={4}>Site Contacts</Title>
          <Text></Text>
          <Title order={4}>Site Map</Title>
          <Image/>
        </Stack>
      </Card>
    );
}

export default SiteInformation;