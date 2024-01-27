import React from 'react';
import { TaskType } from './context/types';
import { Stack } from '@mui/material';
import KanbanTask from './kanban-task';


const KanbanTaskList = ({ tasks } : { tasks: TaskType[] }) => {
  return (
    <Stack direction='column'>
      {tasks.map((task) => <KanbanTask task={task} key={task.uuid}/>)}
    </Stack>
  )
}

export default KanbanTaskList