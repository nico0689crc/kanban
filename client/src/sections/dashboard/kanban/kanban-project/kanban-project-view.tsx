'use client';

import React from 'react';

import { KanbanProvider } from './context/kanban-provider';
import KanbanProjectForm from './kanban-project-form';

const KanbanProjectView = () => {
  return (
    <KanbanProvider>
      <KanbanProjectForm />
    </KanbanProvider>
  )
}

export default KanbanProjectView