import { Theme } from '@mui/material/styles';

export function dialog(theme: Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        root: {
          '.MuiDialog-paper' : {
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: theme.customShadows.card
          }
        },
      },
    }
  };
}
