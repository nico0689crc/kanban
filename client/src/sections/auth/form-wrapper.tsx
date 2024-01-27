'use client';

import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Container, Box, useMediaQuery, Stack } from '@mui/material';

type Props = {
  children: React.ReactNode,
  rowGap?: number
}

const FormWrapper = ({ children } : Props) => {
  const { breakpoints } = useTheme();
  
  const isDownSm = useMediaQuery(breakpoints.down('sm'));

  const content = (
    isDownSm ? (
      children
    ) : (
      <Card
        sx={{
          borderRadius: 5,
          p: 2,
          boxShadow: theme => theme.customShadows.card,
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <CardContent>
          {children}
        </CardContent>
      </Card>
    )
  );

  return (
    <Stack mt={8}>
      <Container maxWidth='sm'>
        <Box sx={{mx: { sx: 1, md: 4 }}}>
          {content}
        </Box>
      </Container>
    </Stack>
  )
}

export default FormWrapper