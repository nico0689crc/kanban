'use client';

import React, { useContext } from 'react';
import { Stack } from '@mui/material';
import { PageHead } from '@/components/page-head'
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import CustomCardForm from '../kanban-project/kanban-form-card';
import KanbanSectionsList from '../kanban-project/kanban-section-list';
import { KanbanContext } from '../kanban-project/context/kanban-context';

const KanbanProjectDetails = () => {
  const { t } = useLocales();
  const { title } = useContext(KanbanContext);

  return (
    <Stack direction='column' rowGap={{ xs: 2, md: 6 }} sx={{ width: '100%', height: '100%' }}>
      <PageHead 
        pageTitle={title!}
        links={[
          {name: t('home_view.title_header'), href: paths.dashboard.root},
          {name: t('kanban_projects_view.title_header'), href: paths.dashboard.kanbanProjects},
          {name: title!},
        ]}
      />
      <Stack rowGap={{ xs: 2, md: 7 }} alignItems='center'>
        <CustomCardForm>
          <KanbanSectionsList />
        </CustomCardForm>
      </Stack>
    </Stack>
  )
}

export default KanbanProjectDetails