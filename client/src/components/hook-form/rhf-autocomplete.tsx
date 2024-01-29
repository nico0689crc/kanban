import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  placeholder,
  helperText,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              sx={{
                border: '1px solid trasparent',
                borderRadius: theme =>  theme.shape.borderRadius * 0.0625,
                '.MuiInputBase-root': {
                  border: theme => `1px solid ${alpha(theme.palette['primary'].main, 0.75)}`,
                  borderRadius: theme => theme.shape.borderRadius * 0.0625,
                }
              }}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
