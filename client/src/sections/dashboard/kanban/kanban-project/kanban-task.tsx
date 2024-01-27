import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TaskType } from './context/types';
import Iconify from '@/components/iconify';

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
      spacing={1}
    >
      <Typography 
        variant='subtitle1'
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
      >
        { task.title }
      </Typography>
      {task.description && (
        <Typography 
          variant='body2'
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '4',
            WebkitBoxOrient: 'vertical',
            fontStyle: 'italic',
            px: 0.5
          }} 
        >
          {task.description}
        </Typography>
      )}
      <Stack direction='row' justifyContent='space-around'>
        <IconButton color='info' aria-label="delete" size='small' onClick={()=>{}}>
          <Iconify icon='uiw:eye' width={15}/>
        </IconButton>
        <IconButton color='warning' aria-label="delete" onClick={()=>{}} size='small'>
          <Iconify icon='uiw:edit' width={15}/>
        </IconButton>
        <IconButton color='error' aria-label="delete" size='small' onClick={()=>{}}>
          <Iconify icon='uiw:delete' width={15}/>
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default KanbanTask