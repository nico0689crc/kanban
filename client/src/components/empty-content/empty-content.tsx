import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';

export default function EmptyContent() {
  return (
    <Stack flexGrow={1} alignItems='center' justifyContent='center'>
      <Box
        component='img'
        alt='empty content'
        src={'/assets/icons/ic_content.svg'}
        sx={{ width: 1, maxWidth: 160 }}
      />
      <Typography variant='h6' component='span' sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}>
        No data found
      </Typography>
    </Stack>
  );
}
