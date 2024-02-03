'use client';

import { Button } from '@mui/material';

import { KanbanProvider } from '../kanban-project/context/kanban-provider';
import KanbanProjectDetails from './kanban-project-details';
import KanbanProjectDialog from '../kanban-project/kanban-project-dialog';

import { useGetKanbanProjectByUUID } from '@/hooks/useKanban';

import { useLocales } from '@/locales';

import { RouterLink } from '@/routes/components';
import { LoadingData } from '@/components/loading-data';
import { paths } from '@/routes/paths';
import { PageNotFoundIllustration } from '@/assets/illustrations';
import Illustration from '@/components/illustrations';

const KanbanProjectDetailsView = ({ projectUUID } : { projectUUID: string }) => {
  const { t } = useLocales();
  const { project, isLoadingProject, error } = useGetKanbanProjectByUUID(projectUUID);

  return (
    <>
      {isLoadingProject && <LoadingData />}
      {!isLoadingProject && error && (
        <Illustration 
          illustration={<PageNotFoundIllustration />}
          title={t('common.labels.not_found_title')}
          subTitle={t('common.labels.not_found_subtitle')}
          caButton={( 
            <Button component={RouterLink} href={paths.dashboard.root} size="large" color='primary' variant="contained">
              {t('common.labels.not_found_cabutton')}
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