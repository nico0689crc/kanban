import { Container, Box, Stack } from '@mui/material';

type Props = {
  children: React.ReactNode,
  rowGap?: number
}

const FormWrapper = ({ children } : Props) => {
  return (
    <Stack>
      <Container maxWidth='sm'>
        <Box px={2}>
          {children}
        </Box>
      </Container>
    </Stack>
  )
}

export default FormWrapper