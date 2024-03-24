import { Stack, CircularProgress } from '@mui/material'

const loadingData = () => {
  return (
    <Stack width='100%' height='100%' alignItems='center' justifyContent='center'>
      <CircularProgress color='primary' />
    </Stack>
  )
}

export default loadingData