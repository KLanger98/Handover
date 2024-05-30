import {
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Container,
  Card,
  Button,
  Grid,
  Group,
  Space
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconAt } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutation";
import { useAuth } from "../utils/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {IconHeartHandshake} from "@tabler/icons-react"
import { QUERY_ME } from "../utils/queries";

const LoginPage = () => {
  const [loginMutation] = useMutation(LOGIN_USER, {
    refetchQueries: ['QUERY_ME', 'SIGNINS']
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  // This is a bad method of passing data, but it works for now
  const [searchParams] = useSearchParams();

  const newUser = searchParams.get("newUser") || false;

 /* Validation */
 const form = useForm({
  mode: "uncontrolled",
  initialValues: { email: "", password: ""},
  validate: {
    email: (value) => (/^\S+@\S+$/.test(value) ? null : "Enter a valid email"),
    password: (value) => value.length === 0? "Please enter a password." : null,
  },
});


const submitForm = async () => { 
  //calling Mantine Form validation function
  const {hasErrors, errors} = form.validate();

  if(hasErrors) {
    console.log("Errors: " + errors)
    return;
  }

  try {
    const { email, password } = form.getValues();
  
    const { data } = await loginMutation({
      variables: { email, password  }
    });
 
    login(data.login.token, data.login.user);
    
    navigate("/app/dashboard")
  } catch (error) { /// NEED TO DEFINE AUTHETNICATIONERROR AT SOME POINT
    console.log(error);
  }
 
}


  return (
    <Container mt={100}>
      <Card w="100%" bg="white" shadow="md" radius="md" p={0}>
        <Grid w="100%">
          <Grid.Col
            span={{ lg: 6, md: 6, sm: 12 }}
            bg="brown.4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack>
              <Space h={30} />
              <Title order={6} style={{color: "white"}} className="large-only">Welcome.</Title>
              <Group align="center" justify="center" gap={0} mb={60}>
                <Title size={30} style={{ color: "white" }}>
                  Hand
                </Title>
                <IconHeartHandshake color="white" size={30} />
                <Title size={30} style={{ color: "white" }}>
                  ver
                </Title>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ lg: 6, md: 6, sm: 12 }} p={40}>
            <Container>
              <form onSubmit={form.onSubmit(submitForm)}>
                <Stack align="center">
                  <Title order={3}>Log In</Title>
                  {newUser === "true" ? (
                    <Title order={3} c="green">
                      New user created! Please log in.
                    </Title>
                  ) : null}
                  <Stack>
                    <TextInput
                      leftSectionPointerEvents="none"
                      leftSection={<IconAt size={14} />}
                      label="Your email"
                      placeholder="seymour@gmail.com"
                      key={form.key("email")}
                      {...form.getInputProps("email")}
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="********"
                      key={form.key("password")}
                      {...form.getInputProps("password")}
                    />
                  </Stack>
                  <Link to="/signup"> Don&apos;t have an account? Sign Up</Link>
                  <Button type="submit" variant="form" m={20}>
                    Login
                  </Button>
                </Stack>
              </form>
            </Container>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};

export default LoginPage;
