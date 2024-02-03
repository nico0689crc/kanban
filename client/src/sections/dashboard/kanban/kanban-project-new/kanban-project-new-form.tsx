'use client';

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { Button, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSnackbar } from '@/components/snackbar';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { PageHead } from '@/components/page-head'
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import LoadingButton from '@/components/loading-button/loading-button';
import Iconify from '@/components/iconify';
import { RouterLink } from '@/routes/components';
import CustomCardForm from '../kanban-project/kanban-form-card';
import KanbanSectionsList from '../kanban-project/kanban-section-list';
import { KanbanContext } from '../kanban-project/context/kanban-context';
import { postProject } from '@/hooks/useKanban';
import { useBoolean } from '@/hooks/useBoolean';

const KanbanProjectNewForm = () => {
  const createProjectRequest = useBoolean(false);
  const { t } = useLocales();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const { sections } = useContext(KanbanContext);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const KanbanProjectSchema = Yup.object().shape({
    title: Yup.string().required(t('kanban_project_view.validation.project_title_required')),
  });

  const methods = useForm({ resolver: yupResolver(KanbanProjectSchema), defaultValues: { title: '' } });
  const { trigger, getValues } = methods;

  const onClickAddKanbanProjectHandler = async () => {
    try {
      const result = await trigger();

      if (result) {
        createProjectRequest.onTrue();
        const { data: data } = await postProject({
          title: getValues('title'),
          sections
        });

        enqueueSnackbar(t('kanban_project_view.labels.project_created_successfully'), {
          variant: 'success',
          anchorOrigin: isUpMd ? { horizontal: 'right', vertical: 'bottom' } : { horizontal: 'center', vertical: 'top' }
        });

        router.push(`${paths.dashboard.kanbanProjects}/${data?.data?.uuid}`);
      }
    } catch (error) {
      createProjectRequest.onFalse();

      enqueueSnackbar(t('kanban_project_view.labels.project_created_error'), {
        variant: 'error',
        anchorOrigin: isUpMd ? { horizontal: 'right', vertical: 'bottom' } : { horizontal: 'center', vertical: 'top' }
      });
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
            disabled={createProjectRequest.value}
            color='primary'
            startIcon={<Iconify icon='bx:arrow-back'/>}
            component={RouterLink}
            href={paths.dashboard.kanbanProjects}
          >
            {t('common.labels.cancel')}
          </Button>
          <LoadingButton 
            disabled={createProjectRequest.value} 
            variant='contained'
            onClick={onClickAddKanbanProjectHandler} 
            color='primary'
            label={t('kanban_project_view.labels.create_project_button')}
            loadingLabel={t('kanban_project_view.labels.create_project_button_loading')} 
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default KanbanProjectNewForm