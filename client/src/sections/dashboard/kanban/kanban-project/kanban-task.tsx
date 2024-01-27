import React from 'react';
import { Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TaskType } from './context/types';

const KanbanTask = ({ task } : { task: TaskType }) => {
  return (
    <Stack 
      direction='column'
      sx={{
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.20),
        boxShadow: theme => `5px 5px 1px 0px ${alpha(theme.palette.primary.main, 0.10)}`,
        borderRadius: theme => theme.shape.borderRadius * 0.15,
        padding: 1,
        mt: 2
      }}
      gap={2}
    >
      <Typography 
        variant='subtitle2'
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexGrow: 1 }} 
      >
        { task.title }
      </Typography>
    </Stack>
  )
}

export default KanbanTask