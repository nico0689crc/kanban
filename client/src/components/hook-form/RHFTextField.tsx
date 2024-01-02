import { useFormContext, Controller } from 'react-hook-form';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { ReactElement } from 'react';

type Props = InputBaseProps & {
  name: string;
  label: string;
  InputProps?: {
    endAdornment: ReactElement
  }
};

const RHFTextField = ({ name, type, label, InputProps, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <InputLabel>{label}</InputLabel>
          <InputBase
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
