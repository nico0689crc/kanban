import React from 'react'
import { Box, BoxProps } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const KanbanSectionCard = ({ children, ...others } : { children: React.ReactNode, others?: BoxProps }) => {
  const theme = useTheme();
  
  return (
    <Box
      {...others}
      flexShrink={0}
      sx={{
        p: 3,
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
        borderRadius: theme => theme.shape.borderRadius * 0.25,
        [theme.breakpoints.up('sm')]: {
          width: '300px',
          minHeight: '250px',
          alignItems: 'center'
        }
      }}>
        {children}
      </Box>
  )
}

export default KanbanSectionCard