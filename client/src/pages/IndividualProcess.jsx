import { useNavigate, useParams } from "react-router-dom";
import { QUERY_SINGLE_PROCESS } from "../utils/queries";
import { Title, Card } from "@mantine/core";
import { useQuery } from "@apollo/client";
import ProcessContent from "../components/ProcessContent"

const IndividualProcess = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading } = useQuery(QUERY_SINGLE_PROCESS, {
    variables: { processId: id },
  });
  const process = data?.getProcess || {};

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Card>
      <Title order={2}>{process.processTitle}</Title>
      <ProcessContent contentData={process} flagData={process.flags} pageRedirect={false}/>
    </Card>
  );
};

export default IndividualProcess;
