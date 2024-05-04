// import { useState } from 'react'
import { MantineProvider, createTheme, AppShell, Burger, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import {theme} from './theme';
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
      <AppShell.Header >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div style={{ height: 60}}>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main >
      <Title color="red.9">MAIN </Title>
      </AppShell.Main>
    </AppShell>
    </MantineProvider>
  )
}

export default App
