import { ReactElement } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import InputBase, { inputBaseClasses, InputBaseProps } from '@mui/material/InputBase';
import { inputAdornmentClasses } from '@mui/material/InputAdornment';
import { alpha, styled } from '@mui/material/styles';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

type Props = InputBaseProps & {
  name: string;
  label?: string;
  InputProps?: {
    endAdornment: ReactElement
  }
};

const InputBaseStyled = styled(InputBase)<InputBaseProps>(({ theme, color }) => {
  const font = {
    label: theme.typography.body1,
    value: theme.typography.body2,
  };

  const colorPallet = {
    focused: theme.palette.text.primary,
    active: theme.palette.text.secondary,
    placeholder: theme.palette.text.disabled,
  };

  return {
    border: '1.5px solid',
    borderColor: alpha(theme.palette[color ?? 'primary'].main, 0.75),
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
      boxShadow: `5px 5px 1px 0px ${alpha(theme.palette[color ?? 'primary'].main, 0.20)}`,
    },
    input: {
      ...font.value,
      '&::placeholder': {
        opacity: 0,
        color: colorPallet.placeholder,
      },
    }
  }
});

const RHFTextField = ({ name, type, label, InputProps, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} sx={{ width: '100%' }}>
          {!!label && <InputLabel>{label}</InputLabel>}
          <InputBaseStyled
            {...field}
            fullWidth
            {...(InputProps && InputProps)}
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            {...other}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default RHFTextField;
