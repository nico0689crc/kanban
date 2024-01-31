import React from 'react';
import { Card } from '@mui/material';

const KanbanListItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card 
      sx={{
        width: '100%', 
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        p: 3,
        boxShadow: theme => theme.customShadows.card,
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        transition: (theme) => theme.transitions.create(['box-shadow'], {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }),
        '&:hover': {
          boxShadow: theme => theme.customShadows.cardHover,
        } 
      }}
    >
      {children}
    </Card>
  )
}

export default KanbanListItemWrapper