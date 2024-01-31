'use client';

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { PageHead } from '@/components/page-head'
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from '@/components/iconify';
import { RouterLink } from '@/routes/components';
import CustomCardForm from './kanban-form-card';
import KanbanSectionsList from './kanban-section-list';
import axios, { endpoints } from '@/utils/axios';
import { KanbanContext } from './context/kanban-context';

const KanbanProjectForm = () => {
  const { t } = useLocales();
  const { sections } = useContext(KanbanContext);

  const KanbanProjectSchema = Yup.object().shape({
    title: Yup.string().required(t('kanban_project_view.validation.project_title_required')),
  });

  const methods = useForm({ resolver: yupResolver(KanbanProjectSchema), defaultValues: { title: 'Probando test 1' } });

  const { formState: { isSubmitting }, trigger, getValues } = methods;

  const onClickAddKanbanProjectHandler = async () => {
    const result = await trigger();

    if (result) {
      const response = await axios.post(endpoints.projects, {
        title: getValues('title'),
        sections
      })

      console.log(response);
    }
  }

  return (
    <Stack direction='column' rowGap={{ xs: 2, md: 6 }} sx={{ width: '100%', height: '100%' }}>
      <PageHead 
        pageTitle={t('kanban_project_view.title_header')}
        links={[
          {name: t('home_view.title_header'), href: paths.dashboard.root},
          {name: t('kanban_projects_view.title_header'), href: paths.dashboard.kanbanProjects},
          {name: t('kanban_project_view.title_header')},
        ]}
      />
      <Stack rowGap={{ xs: 2, md: 7 }} alignItems='center'>
        <CustomCardForm>
          <FormProvider methods={methods}>
            <RHFTextField fullWidth name='title' label={ t('kanban_project_view.labels.project_name') } />
          </FormProvider>
        </CustomCardForm>
        <CustomCardForm>
          <KanbanSectionsList />
        </CustomCardForm>
        <Stack direction="row" columnGap={2} alignItems='center'>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<Iconify icon='bx:arrow-back'/>}
            component={RouterLink}
            href={paths.dashboard.kanbanProjects}
          >
            {t('common.labels.cancel')}
          </Button>
          <LoadingButton
            color='primary'
            loading={isSubmitting}
            onClick={onClickAddKanbanProjectHandler}
            startIcon={<Iconify icon='iconoir:plus-square'/>}
            loadingIndicator={ t('login_view.labels.create_project_button_loading') }
          >
            { t('kanban_project_view.labels.create_project_button') }
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default KanbanProjectForm