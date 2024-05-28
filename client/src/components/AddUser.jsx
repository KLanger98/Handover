import {TextInput, Button, Input, NativeSelect} from "@mantine/core"
import { useForm } from "@mantine/form";
import { CREATE_USER } from "../utils/mutation";
import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_COMPANY } from "../utils/queries";

const AddUser = ({closeModal}) => {

    const [addUser, { error }] = useMutation(CREATE_USER, {
      refetchQueries: [QUERY_SINGLE_COMPANY],
    });

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            profession: "",
            contactNumber: ""
        }
    })

    const handleSubmit = () => {
        try{
            const {firstName, lastName, email, password, profession, contactNumber} = form.getValues()
            
            const {data} = addUser({
                variables: {firstName, lastName, email, password, profession, contactNumber}
            })

            closeModal();
        } catch(error) {
            console.error(error)
        }
    }
    return (
      <>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
            label="First Name"
            description="Please provide your users first name"
          />
          <TextInput
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
            label="Last Name"
            description="Please provide your users last name"
          />
          <TextInput
            key={form.key("email")}
            {...form.getInputProps("email")}
            label="Email"
            description="Your users Email"
          />
          <TextInput
            key={form.key("password")}
            {...form.getInputProps("password")}
            label="Password"
            description="Temporary User Password"
          />
          <TextInput
            key={form.key("profession")}
            {...form.getInputProps("profession")}
            label="User Profession"
            description="What role will this user have"
          />
          <TextInput
            key={form.key("contactNumber")}
            {...form.getInputProps("contactNumber")}
            label="User Contact"
            description="What is the users contact number on site"
          />
          <Button m={10} variant="form" type="submit">
            Create User
          </Button>
        </form>
      </>
    );
}

export default AddUser;