'use client';

import { AuthGuard, RoleBasedGuard } from "@/auth/guard";
import { Box, Stack, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <AuthGuard>
      <RoleBasedGuard hasContent roles={['administrator']}>
        <Box sx={{height: '100vh', width: '100vw'}}>
          <Stack height='100%' alignItems='center' justifyContent='center'>
            <Typography variant="h3">Dashboard Managment</Typography>
            {children}
          </Stack>
        </Box>
      </RoleBasedGuard>
    </AuthGuard>
  )
}

export default Layout