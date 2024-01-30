'use client';

import React from 'react';
import { KanbanProvider } from './context/kanban-provider';
import KanbanProjectForm from './kanban-project-form';
import KanbanProjectDialog from './kanban-project-dialog';

const KanbanProjectView = () => {
  return (
    <KanbanProvider>
      <KanbanProjectForm />
      <KanbanProjectDialog />
    </KanbanProvider>
  )
}

export default KanbanProjectView