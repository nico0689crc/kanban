import { Box, Stack, Typography } from "@mui/material";

export const metadata = {
  title: '404 Page Not Found!',
};

const NotFoundPage = () => {
  return (
    <Box sx={{height: '100vh', width: '100vw'}}>
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <Typography variant="h3">Not Found Page</Typography>
      </Stack>
    </Box>
  )
}

export default NotFoundPage