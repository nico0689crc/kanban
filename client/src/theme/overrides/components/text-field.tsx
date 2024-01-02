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
    // BASE
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: InputBaseProps }) => {
          return {
            border: '1.5px solid',
            borderColor: alpha(theme.palette.text.secondary, 0.75),
            borderRadius: (theme.shape.borderRadius * 0.5),
            padding: '0.35rem 1rem',
            transition: theme.transitions.create(['border', 'border-color', 'box-shadow'], {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeInOut
            }),
            [`&.${inputBaseClasses.error}`]: {
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              [`.${inputAdornmentClasses.root} svg`]: {
                color: theme.palette.error.main
              },
              [`&.${inputBaseClasses.focused}`]: {
                borderColor: alpha(theme.palette.error.main, 0.75),
                boxShadow: `5px 5px 2px 0px ${alpha(theme.palette.error.main, 0.15)}`,
              },
            },
            [`&.${inputBaseClasses.sizeSmall}`]: {
              padding: '0.25rem',
            },
            [`&.${inputBaseClasses.focused}`]: {
              borderColor: alpha(theme.palette[ownerState.color!].main, 0.75),
              boxShadow: theme.customShadows.card,
            },
            input: {
              ...font.value,
              '&::placeholder': {
                opacity: 0,
                color: color.placeholder,
              },
            }
          }
        }
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
