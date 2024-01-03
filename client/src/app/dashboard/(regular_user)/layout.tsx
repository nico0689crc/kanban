'use client';


import { Stack, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <Stack height='100%' alignItems='center' justifyContent='center'>
      <Typography variant="h3">Dashboard</Typography>
      {children}
    </Stack>
  )
}

export default Layout