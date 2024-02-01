'use client';

import { Stack } from '@mui/material';

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <Stack alignItems='center' justifyContent='center' height='100%'>
      {children}
    </Stack>
  )
}

export default Layout