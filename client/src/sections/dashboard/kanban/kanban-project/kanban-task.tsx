import React, { useContext } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TaskType } from './context/types';
import Iconify from '@/components/iconify';
import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import { KanbanContext } from './context/kanban-context';

const KanbanTask = ({ task } : { task: TaskType }) => {
  const { t } = useLocales();
  const { removeTaskFromSection, dialogTaskOnToggle } = useContext(KanbanContext);
  const deleteTaskToggle = useBoolean(false);

  const onRemoveTaskFromSectionHandler = () => {
    removeTaskFromSection(task.uuid);
  }

  return (
    <Stack 
      direction='column'
      sx={{
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.20),
        boxShadow: theme => `5px 5px 1px 0px ${alpha(theme.palette.primary.main, 0.10)}`,
        borderRadius: theme => theme.shape.borderRadius * 0.15,
        padding: 1.5,
        mt: 2,
        cursor: 'pointer'
      }}
      spacing={1}
    >
      {!deleteTaskToggle.value && (
        <Box onClick={dialogTaskOnToggle}>
          <Stack direction='row' spacing={2}>
            <Typography 
              variant='subtitle1'
              flexGrow={1}
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
            >
              { task.title }
            </Typography>
            <IconButton color='error' aria-label="delete" size='small' onClick={deleteTaskToggle.onToggle}>
              <Iconify icon='uiw:delete' width={15}/>
            </IconButton>
          </Stack>
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
        </Box>
      )}

      {deleteTaskToggle.value && (
        <Stack direction='column' height='100%' alignItems='center' justifyContent='center' spacing={1}>
          <Typography variant='body2'>
            {t('kanban_project_view.labels.remove_task_question')}
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button size='small' variant='outlined' color='error' onClick={deleteTaskToggle.onToggle}>
              {t('common.labels.cancel')}
            </Button>
            <Button size='small' variant='contained' onClick={onRemoveTaskFromSectionHandler} color='error'>
              {t('common.labels.remove')}
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

export default KanbanTask