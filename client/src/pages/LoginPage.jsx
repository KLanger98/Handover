import {
  Stack,
  Title,
  TextInput,
  Group,
  PasswordInput,
  Container,
  Card,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconAt } from "@tabler/icons-react";

const LoginPage = () => {
  return (
    <Container w="100%">
      <Card w="80%" bg="brown.1" radius="md" p={20}>
        <Stack w="100%" align="center">
          <form>
            <Stack align="center">
              <Title>Create an Account</Title>
              <Stack>
                <TextInput
                  leftSectionPointerEvents="none"
                  leftSection={<IconAt size={14} />}
                  label="Your email"
                  placeholder="seymour@gmail.com"
                />
                <PasswordInput
                  label="Password"
                  placeholder="********"
                />
              </Stack>
              <Link to="signup">Don't have an account? Sign Up</Link>
              <Button variant="form" m={20}>
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default LoginPage;
