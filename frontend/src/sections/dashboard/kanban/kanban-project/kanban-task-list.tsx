import React, { forwardRef } from 'react';
import { TaskType } from './context/types';
import { Stack, StackProps } from '@mui/material';
import KanbanTask from './kanban-task';

type ComponentProps = { 
  tasks: TaskType[] 
}

const KanbanTaskList = forwardRef<HTMLDivElement, StackProps & ComponentProps>(({ tasks } : ComponentProps, ref) => {
  return (
    <Stack ref={ref} direction='column' flexGrow={1}>
      {tasks.map((task, index) => <KanbanTask index={index} task={task} key={task.uuid}/>)}
    </Stack>
  )
});

KanbanTaskList.displayName = 'KanbanTaskList';

export default KanbanTaskList