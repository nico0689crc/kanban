import React, { MouseEvent, useContext } from 'react';
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Draggable } from '@hello-pangea/dnd';
import { capitalize } from 'lodash';

import LoadingButton from '@/components/loading-button/loading-button';
import Iconify from '@/components/iconify';
import { useSnackbar } from '@/components/snackbar';

import { TaskType } from './context/types';
import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import { KanbanContext } from './context/kanban-context';
import { deleteTaskByUUID } from '@/hooks/useKanban';

const KanbanTask = ({ task, index } : { task: TaskType, index: number }) => {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { removeTaskFromSection, setTaskSelected, dialogTaskOnToggle } = useContext(KanbanContext);
  const deleteTaskToggle = useBoolean(false);
  const deleteTaskRequest = useBoolean(false);

  const onRemoveTaskFromSectionHandler = async () => {
    try {
      deleteTaskRequest.onTrue();
  
      await deleteTaskByUUID(task.uuid!);
      removeTaskFromSection(task.uuid!);
      enqueueSnackbar(t('kanban_project_view.labels.delete_task_message'), { variant: 'success' });

      deleteTaskRequest.onFalse();
    } catch (error:any) {
      if(error?.errors?.detail){
        enqueueSnackbar(error?.errors?.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(t('common.labels.something_went_wrong'), { variant: 'error' });
      }
      
      deleteTaskRequest.onFalse();
    }
  }

  const onClickRemoveTaskFromSectionHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTaskToggle.onToggle();
  }

  const onSelectTaskHandler = () => {
    setTaskSelected(task);
    dialogTaskOnToggle();
  }

  return (
    <Draggable draggableId={task.uuid!} index={index}>
      {(provided, snapshot) => (
        <Stack 
          direction='column'
          sx={{
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.20),
            boxShadow: theme => `5px 5px 1px 0px ${alpha(theme.palette.primary.main, 0.10)}`,
            borderRadius: theme => theme.shape.borderRadius * 0.15,
            padding: 1.5,
            mt: 2,
            cursor: 'pointer',
            ...(snapshot.isDragging && {
              boxShadow: theme => theme.customShadows.z20,
            }),
          }}
          spacing={1}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!deleteTaskToggle.value && (
            <Stack onClick={onSelectTaskHandler} spacing={2}>
              <Stack direction='row' spacing={2}>
                <Typography 
                  variant='subtitle1'
                  flexGrow={1}
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
                >
                  { task.title }
                </Typography>
                <IconButton color='error' aria-label="delete" size='small' onClick={onClickRemoveTaskFromSectionHandler}>
                  <Iconify icon='uiw:delete' width={15}/>
                </IconButton>
              </Stack>
              <Box>
                <Chip 
                  label={`${capitalize(task.priority)}`} 
                  variant='filled' 
                  {...(task.priority === 'low' && { color: 'info' }) }
                  {...(task.priority === 'medium' && { color: 'warning' }) }
                  {...(task.priority === 'hight' && { color: 'error' }) }
                  size='small' 
                />
              </Box>
            </Stack>
          )}

          {deleteTaskToggle.value && (
            <Stack direction='column' height='100%' alignItems='center' justifyContent='center' spacing={1}>
              <Typography variant='body2'>
                {t('kanban_project_view.labels.remove_task_question')}
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button disabled={deleteTaskRequest.value} size='small' variant='outlined' color='error' onClick={deleteTaskToggle.onToggle}>
                  {t('common.labels.cancel')}
                </Button>
                <LoadingButton 
                  disabled={deleteTaskRequest.value} 
                  variant='contained'
                  onClick={onRemoveTaskFromSectionHandler} 
                  color='error'
                  label={t('common.labels.remove')}
                  loadingLabel={t('common.labels.removing')} 
                />
              </Stack>
            </Stack>
          )}
        </Stack>
        )}
    </Draggable>
  )
}

export default KanbanTask