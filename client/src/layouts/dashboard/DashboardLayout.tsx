'use client'

import { Box, Stack } from '@mui/material';

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
          spacing={2} 
          sx={{ 
            position: 'sticky', top: 0, zIndex: 1, py: 3, px: { xs: 2, md: 4 },
            backgroundColor: (theme) => theme.palette.background.paper 
          }}
        >
          <LanguageSwitcher />
          <ThemeModeButton />
          <LogoutButton />
        </Stack>
        <Box 
          px={{ xs: 2, md: 6 }} 
          sx={{ 
            backgroundColor: theme => theme.palette.background.paper,
            display: 'flex',
            flexGrow: 1
          }} 
          pb={5}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout