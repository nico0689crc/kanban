'use client';

import { Stack, Button } from '@mui/material';
import { paths } from '@/routes/paths';
import { useLocales } from '@/locales';
import KanbanList from '@/sections/dashboard/kanban/kanban-project-list/kanban-project-list';

import Iconify from '@/components/iconify';
import { PageHead } from '@/components/page-head';
import { LoadingData } from '@/components/loading-data';
import EmptyContent from '@/components/empty-content/empty-content';

import { RouterLink } from '@/routes/components';
import { useGetKanbanProjects } from '@/hooks/useKanban';

const KanbanListView = () => {
  const { t } = useLocales();
  const { isLoadingProjects, projects, isEmpty } = useGetKanbanProjects();

  return (
    <Stack direction='column' gap={{ xs: 3, sm: 8 }} sx={{ width: '100%', height: '100%' }}>
      <PageHead 
        pageTitle={t('kanban_projects_view.title_header')}
        links={[
          {name: t('home_view.title_header'), href: paths.dashboard.root},
          {name: t('kanban_projects_view.title_header')},
        ]}
        action={
          <Button
            variant='contained'
            color='primary'
            startIcon={<Iconify icon='iconoir:plus-square'/>}
            component={RouterLink}
            href={paths.dashboard.newProject}
          >
            {t('kanban_projects_view.labels.create_project_button')}
          </Button>
        }
      />
      { isLoadingProjects && <LoadingData /> }
      { !isLoadingProjects && isEmpty && <EmptyContent />}
      { !isLoadingProjects && !!projects?.length && <KanbanList projects={projects}/> }
    </Stack>
  )
};

export default KanbanListView;