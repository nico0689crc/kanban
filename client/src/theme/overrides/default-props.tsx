import { Theme } from '@mui/material/styles';

export function defaultProps(theme: Theme) {
  return {
    MuiButton: {
      defaultProps: {
        color: 'inherit',
        disableElevation: true,
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary'
      }
    }
  };
}
