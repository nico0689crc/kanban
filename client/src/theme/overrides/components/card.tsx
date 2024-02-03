import { Theme } from '@mui/material/styles';

export function card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          boxShadow: theme.customShadows.card,
          borderRadius: theme.shape.borderRadius * 2,
          backgroundColor: theme.palette.background.default,
          zIndex: 0
        },
      },
    }
  };
}
