'use client';

import React from 'react';
import { KanbanProvider } from '../kanban-project/context/kanban-provider';
import KanbanProjectForm from './kanban-project-new-form';
import KanbanProjectDialog from '../kanban-project/kanban-project-dialog';

const KanbanProjectNewView = () => {
  return (
    <KanbanProvider>
      <KanbanProjectForm />
      <KanbanProjectDialog />
    </KanbanProvider>
  )
}

export default KanbanProjectNewView