import { MantineProvider, AppShell, Burger, Group, Title } from '@mantine/core'
import { Header } from './containers';
import { useDisclosure } from '@mantine/hooks';
import {theme} from './theme.jsx';
import '@mantine/core/styles.css';
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './utils/AppContext.jsx';
import {useEffect, useState} from 'react';
import { IconHeartHandshake } from '@tabler/icons-react';

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

const httpLink = new HttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink])
  })



function App() {
  const [opened, { toggle }] = useDisclosure();
  const [navbarWidth, setNavbarWidth] = useState(0);
  const location = useLocation();

  //Check if we are within the application, use this to determine navbar state
  useEffect(() => {
    const currentUrl = window.location.pathname;
    
    if (currentUrl.slice(0,5) === "/app/" || currentUrl === "/app"){
      setNavbarWidth(300)
    } else{
      setNavbarWidth(0)
    }
  }, [location]);

  

  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <AuthProvider>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: navbarWidth,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header p={5} bg="brown">
              <Group justify="space-between">
                <Group ml={40}>
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                    color="white.0"
                  />
                  <Group align="center" justify="center" gap={0} mt={5}>
                    <Title size={30} style={{ color: "white" }}>
                      Hand
                    </Title>
                    <IconHeartHandshake color="white" size={30} />
                    <Title size={30} style={{ color: "white" }}>
                      ver
                    </Title>
                  </Group>
                </Group>

                <Header />
              </Group>
            </AppShell.Header>

            <AppShell.Main bg="light-brown.0">
              <Outlet />
            </AppShell.Main>
          </AppShell>
        </AuthProvider>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App
