'use client'

import { Box, Container, Paper, Stack  } from "@mui/material";
import Navbar from "./Navbar";
import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeModeButton from "../common/ThemeModeButton";
import LogoutButton from "../common/LogoutButton";

type Props = {
  children: React.ReactNode;
}

const DashboardLayout = ({children}: Props) => {
  return (
    <Stack direction='row' height='100vh' position='relative'>
      <Navbar />
      <Stack direction="column" gap={3} sx={{ overflow: 'auto', width: '100%', position:'relative' }}>
        <Stack 
          direction="row" 
          justifyContent='flex-end' 
          sx={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 1,
            p: 2, 
            backgroundColor: (theme) => theme.palette.background.paper, 
          }}
        >
          <LanguageSwitcher />
          <ThemeModeButton />
          <LogoutButton />
        </Stack>
        <Container maxWidth='xl' >
          {children}
        </Container>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout