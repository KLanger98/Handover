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
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutation";
import { useAuth } from "../utils/AppContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginMutation] = useMutation(LOGIN_USER);
  const { login, loggedIn } = useAuth();
  const navigate = useNavigate();
 /* Validation */
 const form = useForm({
  mode: "uncontrolled",
  initialValues: { email: "", password: ""},
  validate: {
    email: (value) => (/^\S+@\S+$/.test(value) ? null : "Enter a valid email"),
    password: (value) => value.length === 0? "Please enter a password." : null,
  },
});
console.log("Render " + loggedIn);

const submitForm = async () => { 
  console.log("Before " + loggedIn);
  //calling Mantine Form validation function
  const {hasErrors, errors} = form.validate();
  console.log("Has Errors: " + hasErrors)
  if(hasErrors) {
    console.log("Errors: " + errors)
    return;
  }

  try {
    const { email, password } = form.getValues();
  
    const { data } = await loginMutation({
      variables: { email, password  }
    });

    login(data.login.token)
    navigate("/application")
  } catch (error) { /// NEED TO DEFINE AUTHETNICATIONERROR AT SOME POINT
    console.log(error);
  }
 
}


  return (
    <Container w="100%">
      <Card w="80%" bg="brown.1" radius="md" p={20}>
        <Stack w="100%" align="center">
          <form onSubmit={form.onSubmit(submitForm)}>
            <Stack align="center">
              <Title>Log In</Title>
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
        </Stack>
      </Card>
    </Container>
  );
};

export default LoginPage;
