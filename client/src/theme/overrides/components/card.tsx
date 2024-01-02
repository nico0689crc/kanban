import { CardProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: CardProps }) => {
          return {
            position: 'relative',
            boxShadow: theme.customShadows.card,
            borderRadius: theme.shape.borderRadius,
            border: '1px solid',
            borderColor: theme.palette.primary.main,
            zIndex: 0, // Fix Safari overflow: hidden with border radius
            backgroundColor: theme.palette.background.paper
          }
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
