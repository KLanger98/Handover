// import { useState } from 'react'
import { MantineProvider, createTheme, AppShell, Burger, Title, Button} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import {theme} from './theme';
// import { TopBar } from './components'

import "@mantine/core/styles.css";

import './App.css'

//Import graphQL apollo packages
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: InMemoryCache(),
  // link: authLink.concat(HttpLink)
})

function App() {
  const [opened, { toggle }] = useDisclosure();
  // We should implement theme colors like this when we get time
  // Would require us to redo the design in illustrator first for dark theme.
  // colors: {
  //   primary: virtualColor({
  //     name: 'primary',
  //     dark: 'pink',
  //     light: 'cyan',
  //   }),
  // },
  const blueBtn = theme.colors.blue[0];
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Button color="columbiaBlue.5">Hello</Button>
            <Burger
              opened={opened}
              onClick={toggle}
              visibleFrom="sm"
              size="lg"
            />
            <div style={{ height: 60 }}>Logo</div>
          </AppShell.Header>

          <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

          <AppShell.Main>
            <Title color="blue.2">MAIN </Title>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App
