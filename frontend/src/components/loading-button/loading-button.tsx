import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from '../iconify/iconify';

type PropsType = ButtonProps & {
  loadingLabel: string;
  label: string;
}

const LoadingButton = ({ disabled, loadingLabel, label, ...others } : PropsType) => {
  return (
    <Button disabled={disabled} {...others} >
      <Stack direction='row' spacing={0.5} alignItems='center'>
        {disabled && <Iconify icon="line-md:loading-twotone-loop" />}
        <Typography variant='button'>{ disabled ? loadingLabel : label }</Typography>
      </Stack>
    </Button>
  )
}

export default LoadingButton