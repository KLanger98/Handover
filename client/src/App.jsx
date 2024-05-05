// import { useState } from 'react'
import { Header, Navbar } from './containers';
import { MantineProvider, AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import {theme} from './theme';
import '@mantine/core/styles.css';
// import { TopBar } from './components'


import './App.css'


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

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main >
     
      </AppShell.Main>
    </AppShell>
    </MantineProvider>
  )
}

export default App
