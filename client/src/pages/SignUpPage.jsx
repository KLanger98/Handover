import {Stack, Title, TextInput, Group, PasswordInput, Container, Card, Button} from '@mantine/core'
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../state/auth/authActions.js";
import { Link } from "react-router-dom"
import { IconAt } from "@tabler/icons-react";
import { useForm as useFormMantine } from '@mantine/form'
import { useForm as useFormReactHook } from 'react-hook-form'

const SignUpPage = () => {

  const { loading, userInfo, error, success } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useFormReactHook();


  /* Validation */
  const form = useFormMantine({
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


  const submitForm = () => { //{ firstName, lastName, email, password }
    
    //calling Mantine Form validation function
    const {hasErrors, errors} = form.validate();
    console.log("Has Errors: " + hasErrors)
    if(hasErrors) {
      console.log("Errors: " + errors)
      return;
    }

    const {firstName, lastName, email, password} = form.getValues();
    console.log("First Name: " + firstName)

    dispatch(registerUser({ firstName, lastName, email, password }));
 
  }

  return (
    <Container w="100%">
      <Card w="80%" bg="brown.1" radius="md" p={20}>
        <Stack w="100%" align="center">
<<<<<<< Updated upstream
          <form onSubmit={onSubmit(console.log)}>
=======
          <form onSubmit={handleSubmit(submitForm)}>
>>>>>>> Stashed changes
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
