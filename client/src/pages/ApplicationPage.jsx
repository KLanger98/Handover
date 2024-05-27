import { useEffect } from 'react';
import { AppShell} from "@mantine/core";
import { Navbar } from '../containers'
import {Outlet, useNavigate} from 'react-router-dom'
const ApplicationPage = ( ) => {
  const navigate = useNavigate();
  useEffect(() => {

    const currentUrl = window.location.pathname;

    if(currentUrl === '/app/') navigate('dashboard');

    
  }, [navigate]);
  
  return (
    <>
      <AppShell.Navbar >
        <Navbar />
      </AppShell.Navbar>
      <Outlet/>
    </>
  );
};

export default ApplicationPage