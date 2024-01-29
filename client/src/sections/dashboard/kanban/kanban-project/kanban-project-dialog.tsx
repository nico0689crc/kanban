'use client';

import React, { useContext } from 'react';
import { Dialog, useMediaQuery } from '@mui/material';
import KanbanTaskDetails from './kanban-task-details';
import { useTheme } from '@mui/material/styles';
import { KanbanContext } from './context/kanban-context';
import { useBoolean } from '@/hooks/useBoolean';
import KanbanTaskEdit from './kanban-task-edit';

const KanbanProjectDialog = () => {
  const theme = useTheme();
  const editTaskToggleActive = useBoolean(false);
  const { dialogTaskOnToggle, isDialogTaskOpen } = useContext(KanbanContext);
  const isDownToSm = useMediaQuery(theme.breakpoints.down('sm'));

  const onClickCloseHandler = () => {
    dialogTaskOnToggle();
    editTaskToggleActive.onFalse();
  }

  return (
    <>
      {isDialogTaskOpen && (
        <Dialog
          fullScreen={isDownToSm}
          sx={{
            '.MuiDialog-container > div': {
              width: '600px',
              ...(isDownToSm && {
                position: 'absolute',
                top: 0,
                bottom: 0
              })
            }
          }}
          open={isDialogTaskOpen}
          onClose={onClickCloseHandler}
        >
          { editTaskToggleActive.value ? (
            <KanbanTaskEdit {...{editTaskToggleActive, onClickCloseHandler}} />
            ) : (
            <KanbanTaskDetails {...{editTaskToggleActive, onClickCloseHandler} } />
          )}
        </Dialog>
      )}
    </>
  )
}

export default KanbanProjectDialog