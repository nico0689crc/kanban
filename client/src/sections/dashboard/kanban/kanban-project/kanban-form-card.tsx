import { Card } from '@mui/material';

const CustomCardForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        p: { xs: 2, md: 3 },
        boxShadow: theme => theme.customShadows.card,
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        width: '100%'
      }}
    >
      {children}
    </Card>
  );
}

export default CustomCardForm;