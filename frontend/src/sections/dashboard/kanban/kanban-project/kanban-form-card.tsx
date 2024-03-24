import { Card } from '@mui/material';

const CustomCardForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        p: 3,
        pt: 5,
        boxShadow: theme => theme.customShadows.card,
        width: '100%'
      }}
    >
      {children}
    </Card>
  );
}

export default CustomCardForm;