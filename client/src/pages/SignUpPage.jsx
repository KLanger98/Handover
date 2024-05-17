import {Stack, Title, TextInput, Group, PasswordInput, Container, Card, Button} from '@mantine/core'
import { Link } from "react-router-dom"
import { IconAt } from "@tabler/icons-react";
import { useForm } from '@mantine/form'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../utils/mutation'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AppContext";


const SignUpPage = () => {

  const [createUser, { error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const { login, loggedIn } = useAuth();

  /* Validation */
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: ""},

    // functions will be used to validate values at corresponding key
    validate: {
      firstName: (value) => value.length < 2 ? "Name must have at least 2 letters" : null,
      lastName: (value) => value.length < 1 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => value.length < 2? "Password must be at least 2 characters long" : null,
      confirmPassword: (value, values) => value !== values.password? "Password's must match" : null
    },
  });


  const submitForm = async () => {
    
    //calling Mantine Form validation function
    const {hasErrors, errors} = form.validate();
    console.log("Has Errors: " + hasErrors)
    if(hasErrors) {
      console.log("Errors: " + errors)
      return;
    }

    try {
      const {firstName, lastName, email, password} = form.getValues();
    
      const { data } = await createUser({
        variables: { firstName, lastName, email, password  }
      });

      navigate("/application")
      login(data.login.token)
      
    } catch (error) {
      console.log(error);
    }
   
  }

  return (
    <Container w="100%">
      <Card w="80%" bg="brown.1" radius="md" p={20}>
        <Stack w="100%" align="center">
          <form onSubmit={form.onSubmit(submitForm)}>
            <Stack align="center">
              <Title>Create an Account</Title>
              <Stack>
                <Group>
                  <TextInput
                    label="First Name"
                    placeholder="Seymour"
                    key={form.key("firstName")}
                    {...form.getInputProps("firstName")}
                    // {...register("firstName")}
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Butts"
                    key={form.key("lastName")}
                    // {...register("lastName")}
                    {...form.getInputProps("lastName")}
                  />
                </Group>
                <TextInput
                  leftSectionPointerEvents="none"
                  leftSection={<IconAt size={14} />}
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                  // {...register("email")}
                  label="Your email"
                  placeholder="seymour@gmail.com"
                />
                <PasswordInput
                  label="Password"
                  description="Password must be..."
                  placeholder="********"
                  key={form.key("password")}
                  // {...register("password")}
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="********"
                  key={form.key("confirmPassword")}
                  {...form.getInputProps("confirmPassword")}
                />
              </Stack>
              <Link to="/login">Already have an Acount? Log In</Link>
              <Button type="submit" variant="form" m={20}>
                Sign Up
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default SignUpPage;
