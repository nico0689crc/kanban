'use client';

import { Stack, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { useBoolean } from '@/hooks/useBoolean';
import { paths } from '@/routes/paths';
import { useLocales } from '@/locales';
import { RootState } from '@/store';
import { fetchProjectsActionCreator } from '@/store/project/projectActionCreator';

import KanbanList from '@/sections/dashboard/kanban/kanban-list';
import KanbanCreate from '@/sections/dashboard/kanban/kanban-create';

import Iconify from '@/components/iconify';
import { PageHead } from '@/components/page-head';
import { LoadingData } from '@/components/loading-data';
import EmptyContent from '@/components/empty-content/empty-content';

const KanbanView = () => {
  const { t } = useLocales();
  const dialog = useBoolean();
  const dispatch = useDispatch();
  const { projects, isLoading, isEmpty } = useSelector((state: RootState) => state.projectStore);

  dispatch<any>(fetchProjectsActionCreator());
  
  return (
    <>
      <Stack direction='column' gap={6} sx={{ width: '100%', height: '100%' }}>
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
        { isLoading && <LoadingData /> }
        { !isLoading && isEmpty && <EmptyContent />}
        { !isLoading && !!projects?.length && <KanbanList projects={projects}/> }
      </Stack>

      <KanbanCreate dialog={dialog}/>
    </>
  )
};

export default KanbanView;