import {
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Container,
  Card,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconAt } from "@tabler/icons-react";
import { useForm } from "react-hook-form";

const LoginPage = () => {

  const { register, handleSubmit } = useForm()

  const submitForm = (data) => {
    console.log(data)
  }

  return (
    <Container w="100%">
      <Card w="80%" bg="brown.1" radius="md" p={20}>
        <Stack w="100%" align="center">
          <form onSubmit={handleSubmit(submitForm)}>
            <Stack align="center">
              <Title>Log In</Title>
              <Stack>
                <TextInput
                  leftSectionPointerEvents="none"
                  leftSection={<IconAt size={14} />}
                  label="Your email"
                  placeholder="seymour@gmail.com"
                  {...register("email")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="********"
                  {...register("password")}
                />
              </Stack>
              <Link to="/signup">Don't have an account? Sign Up</Link>
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
