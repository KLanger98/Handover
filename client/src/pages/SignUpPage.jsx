import {Stack, Title, TextInput, Group, PasswordInput, Container, Card, Button, Grid} from '@mantine/core'
import { Link } from "react-router-dom"
import { IconAt, IconHeartHandshake } from "@tabler/icons-react";
import { useForm } from '@mantine/form'
import { useMutation } from '@apollo/client'
import { CREATE_USER_AND_COMPANY } from '../utils/mutation'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AppContext";


const SignUpPage = () => {

  const [createUserAndCompany, { error }] = useMutation(CREATE_USER_AND_COMPANY);
  const navigate = useNavigate();
  const { login, loggedIn } = useAuth();

  /* Validation */
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", companyName: ""},

    // functions will be used to validate values at corresponding key
    validate: {
      firstName: (value) => value.length < 2 ? "Name must have at least 2 letters" : null,
      lastName: (value) => value.length < 1 ? "Name must have at least 2 letters" : null,
      companyName: (value) => value.length < 2 ? "Company Name must have at least 2 letters" : null,
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
      const {firstName, lastName, email, password, companyName} = form.getValues();
    
      const { data } = await createUserAndCompany({
        variables: { firstName, lastName, email, password, companyName}
      });
      
      navigate("/login?newUser=true")
      
    } catch (error) {
      console.log(error);
    }
   
  }

  return (
    <Container w="100%" mt={100}>
      <Card w="100%" bg="white" shadow="md" radius="md" p={0}>
        <Grid>
          <Grid.Col
            span={6}
            bg="brown.4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack mb="20%">
              <Title order={6} style={{ color: "white" }}>
                Less Dawdle.
              </Title>
              <Title order={6} style={{ color: "white" }}>
                More Doing.
              </Title>
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
          <Grid.Col span={6} p={20}>
            <form onSubmit={form.onSubmit(submitForm)}>
              <Stack align="center">
                <Title order={3}>Create an Account</Title>
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
                  <TextInput
                  label="Your Company Name"
                  key={form.key("companyName")}
                  placeholder='Your Company Name'
                  {...form.getInputProps("companyName")}
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
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};

export default SignUpPage;
