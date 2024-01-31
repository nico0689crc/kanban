'use client';

import React from 'react';
import { KanbanProvider } from '../kanban-project/context/kanban-provider';
import KanbanProjectDetails from './kanban-project-details';
import KanbanProjectDialog from '../kanban-project/kanban-project-dialog';
import { useGetKanbanProjectByUUID } from '@/hooks/useKanban';
import { LoadingData } from '@/components/loading-data';

const KanbanProjectDetailsView = ({ projectUUID } : { projectUUID: string }) => {
  const { project, isLoadingProject } = useGetKanbanProjectByUUID(projectUUID);

  return (
    !isLoadingProject && project ? (
      <KanbanProvider project={project}>
        <KanbanProjectDetails />
        <KanbanProjectDialog />
      </KanbanProvider>
    ) : (
      <LoadingData />
    )
  )
}

export default KanbanProjectDetailsView