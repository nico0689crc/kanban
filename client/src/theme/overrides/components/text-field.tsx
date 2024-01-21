import { Theme } from '@mui/material/styles';
import { inputLabelClasses } from '@mui/material/InputLabel';

// ----------------------------------------------------------------------

export function textField(theme: Theme) {
  return {
    // HELPER
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '0.25rem 0 0 0',
          ...theme.typography.caption
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'relative',
          marginBottom: '0.25rem',
          [`&.${inputLabelClasses.shrink}`]: {
            fontSize: '0.8125rem',
            fontWeight: 400,
            transform: 'initial',
            lineHeight: '1.154',
            color: theme.palette.text.primary
          },
          [`&.${inputLabelClasses.error}`]: {
            color: theme.palette.error.main
          }
        }
      }
    },
  };
}
