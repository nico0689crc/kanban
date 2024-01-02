'use client';

import { AuthGuard } from "@/auth/guard";
import { Box, Stack, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <AuthGuard>
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <Typography variant="h3">Dashboard</Typography>
        {children}
      </Stack>
    </AuthGuard>
  )
}

export default Layout