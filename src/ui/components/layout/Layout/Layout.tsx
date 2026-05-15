import './Layout.css';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import Header from '../Header/Header.tsx';

const Layout = () => {
  return (
    <Box className='layout-box'>
      <Header/>
      <Container className='outlet-container' sx={{ mt: 3, py: 3 }} maxWidth='lg'>
        <Outlet/>
      </Container>
    </Box>
  );
};

export default Layout;
