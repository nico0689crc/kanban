'use client';

import React from 'react';
import { Button } from '@mui/material';

import { KanbanProvider } from '../kanban-project/context/kanban-provider';
import KanbanProjectDetails from './kanban-project-details';
import KanbanProjectDialog from '../kanban-project/kanban-project-dialog';

import { useGetKanbanProjectByUUID } from '@/hooks/useKanban';

import { useLocales } from '@/locales';

import { RouterLink } from '@/routes/components';
import { LoadingData } from '@/components/loading-data';
import NotFoundView from '@/sections/error/not-found-view';
import { paths } from '@/routes/paths';

const KanbanProjectDetailsView = ({ projectUUID } : { projectUUID: string }) => {
  const { t } = useLocales();
  const { project, isLoadingProject, error } = useGetKanbanProjectByUUID(projectUUID);

  return (
    <>
      {isLoadingProject && <LoadingData />}
      {!isLoadingProject && error && (
        <NotFoundView
          title={t('kanban_project_view.labels.project_not_found_title')}
          subTitle={t('kanban_project_view.labels.project_not_found_subtitle')}
          caButton={(
            <Button component={RouterLink} href={paths.dashboard.kanbanProjects} size="large" color='primary' variant="contained">
              {t('kanban_project_view.labels.project_not_found_cabutton')}
            </Button>
          )} 
        />
      )}
      {!isLoadingProject && !error && project?.sections && (
        <KanbanProvider project={project}>
          <KanbanProjectDetails />
          <KanbanProjectDialog />
        </KanbanProvider>
      )}
    </>
  )
}

export default KanbanProjectDetailsView