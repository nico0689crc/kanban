'use client'

import { Box, Container, Stack } from '@mui/material';

import Navbar from './Navbar';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeModeButton from '../common/ThemeModeButton';
import LogoutButton from '../common/LogoutButton';

type Props = {
  children: React.ReactNode;
}

const DashboardLayout = ({children}: Props) => {

  return (
    <Stack direction='row' height='100vh' position='relative'>
      <Navbar />
      <Stack direction='column' sx={{ overflow: 'auto', width: '100%', position:'relative' }}>
        <Stack 
          direction='row' 
          justifyContent='flex-end'
          gap={{ xs: 1, md: 3 }} 
          sx={{ 
            position: 'sticky', top: 0, zIndex: 1, py: 2, px: { xs: 1, md: 5 },
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`, 
            backgroundColor: (theme) => theme.palette.background.paper }}
        >
          <LanguageSwitcher />
          <ThemeModeButton />
          <LogoutButton />
        </Stack>
        <Container maxWidth='xl' sx={{ flexGrow: 1 }}>
          <Box pt={5} pb={{ xs: 15, md: 8 }} height='100%'>
            {children}
          </Box>
        </Container>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout