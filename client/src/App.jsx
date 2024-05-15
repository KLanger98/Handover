// import { useState } from 'react'
import { MantineProvider, AppShell, Burger } from '@mantine/core'
import { Header, Navbar } from './containers';
import { Dashboard } from './pages'
import { useDisclosure } from '@mantine/hooks';
import {theme} from './theme.jsx';
import '@mantine/core/styles.css';
// import { TopBar } from './components'

import { Outlet } from 'react-router-dom'

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
  cache: new InMemoryCache(),
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

  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
      <AppShell
      
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p={5}bg='brown'>
        
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Header />
      </AppShell.Header>

      <AppShell.Main >
        <Outlet/>
      </AppShell.Main>
    </AppShell>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App
