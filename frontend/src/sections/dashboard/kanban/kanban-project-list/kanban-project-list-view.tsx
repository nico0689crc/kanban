'use client';

import { Stack, Button } from '@mui/material';
import { paths } from '@/routes/paths';
import { useLocales } from '@/locales';
import KanbanList from '@/sections/dashboard/kanban/kanban-project-list/kanban-project-list';

import Iconify from '@/components/iconify';
import { PageHead } from '@/components/page-head';
import { LoadingData } from '@/components/loading-data';

import { RouterLink } from '@/routes/components';
import { useGetKanbanProjects } from '@/hooks/useKanban';
import KanbanListEmpty from './kanban-list-empty';

const KanbanListView = () => {
  const { t } = useLocales();
  const { isLoadingProjects, projects, isEmpty } = useGetKanbanProjects();

  return (
    <Stack direction='column' spacing={2} sx={{ width: '100%', height: '100%' }}>
      <PageHead 
        pageTitle={t('kanban_projects_view.title_header')}
        links={[
          {name: t('home_view.title_header'), href: paths.dashboard.root},
          {name: t('kanban_projects_view.title_header')},
        ]}
        action={!isEmpty && (
          <Button
            variant='contained'
            color='primary'
            startIcon={<Iconify icon='iconoir:plus-square'/>}
            component={RouterLink}
            href={paths.dashboard.newProject}
          >
            {t('kanban_projects_view.labels.create_project_button')}
          </Button>
        )}
      />
      { isLoadingProjects && <LoadingData /> }
      { !isLoadingProjects && isEmpty && <KanbanListEmpty />}
      { !isLoadingProjects && !!projects?.length && <KanbanList projects={projects}/> }
    </Stack>
  )
};

export default KanbanListView;