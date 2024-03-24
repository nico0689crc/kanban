import { Box, CircularProgress, Stack } from '@mui/material';

export const metadata = {
  title: '404 Page Not Found!',
};

const Loading = () => {
  return (
    <Box sx={{height: '100vh', width: '100vw'}}>
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <CircularProgress color='primary' />
      </Stack>
    </Box>
  )
}

export default Loading