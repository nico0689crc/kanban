import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function AuthenticateIllustration({ ...other }: BoxProps) {
  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <image href="/assets/illustrations/authenticate.svg" height="300"/>
    </Box>
  );
}

export default memo(AuthenticateIllustration);
