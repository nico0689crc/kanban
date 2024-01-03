import { alpha, Theme } from '@mui/material/styles';
import { inputBaseClasses, InputBaseProps } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { inputAdornmentClasses } from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

export function textField(theme: Theme) {
  const color = {
    focused: theme.palette.text.primary,
    active: theme.palette.text.secondary,
    placeholder: theme.palette.text.disabled,
  };

  const font = {
    label: theme.typography.body1,
    value: theme.typography.body2,
  };

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
