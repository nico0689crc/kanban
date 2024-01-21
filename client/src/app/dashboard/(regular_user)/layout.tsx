'use client';

import { Stack } from '@mui/material';

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <Stack height='100%' alignItems='center' justifyContent='center'>
      {children}
    </Stack>
  )
}

export default Layout