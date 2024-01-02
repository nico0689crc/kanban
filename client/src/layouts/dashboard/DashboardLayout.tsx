'use client'

import { Box, Container, Stack  } from "@mui/material";
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
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          m: 2
        }}
      >
        <LanguageSwitcher />
        <ThemeModeButton />
        <LogoutButton />
      </Box>
      <Navbar />
      <Container maxWidth="xl">
        {children}
      </Container>
    </Stack>
  )
}

export default DashboardLayout