'use client';

import { Stack, Button } from '@mui/material';
import { useFetchProjects } from '@/hooks/useKanban';
import { paths } from '@/routes/paths';
import Iconify from '@/components/iconify';
import { useLocales } from '@/locales';
import KanbanList from './kanban-list';
import { PageHead } from '@/components/page-head';
import { LoadingData } from '@/components/loading-data';
import EmptyContent from '@/components/empty-content/empty-content';
import { useBoolean } from '@/hooks/useBoolean';
import KanbanCreate from './kanban-create';

const KanbanView = () => {
  const { t } = useLocales();
  const dialog = useBoolean();
  const { projects, projectsEmpty, projectsLoading } = useFetchProjects();
  
  return (
    <>
      <Stack direction='column' gap={6} sx={{ height: '100%', width: '100%' }}>
        <PageHead 
          pageTitle={t('kanban_projects_view.title_header')}
          links={[
            {name: t('home_view.title_header'), href: paths.dashboard.root},
            {name: t('kanban_projects_view.title_header')},
          ]}
          action={
            <Button 
              onClick={dialog.onTrue}
              variant='contained'
              color='primary'
              startIcon={<Iconify icon='iconoir:plus-square'/>}
            >
              {t('kanban_projects_view.labels.create_project_button')}
            </Button>
          }
        />
        { projectsLoading && <LoadingData /> }
        { projectsEmpty && <EmptyContent />}
        { !!projects?.length && <KanbanList projects={projects}/> }
      </Stack>

      <KanbanCreate dialog={dialog}/>
    </>
  )
};

export default KanbanView;