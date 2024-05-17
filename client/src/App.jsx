import { MantineProvider, AppShell, Burger } from '@mantine/core'
import { Header } from './containers';
import { useDisclosure } from '@mantine/hooks';
import {theme} from './theme.jsx';
import '@mantine/core/styles.css';
import { Outlet } from 'react-router-dom'
import "@mantine/core/styles.css";
import './App.css'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


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
  link: authLink.concat(HttpLink)
  })



function App() {
  const [opened, { toggle }] = useDisclosure();

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

      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App
