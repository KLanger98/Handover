import { AppShell} from "@mantine/core";
import { Navbar } from '../containers'
import {Outlet} from 'react-router-dom'

const ApplicationPage = () => {
  return (
    <>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <Outlet/>
    </>
  );
};

export default ApplicationPage