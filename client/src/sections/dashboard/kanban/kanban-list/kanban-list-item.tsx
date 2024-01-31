'use client';

import { MouseEvent, useCallback } from 'react';
import { mutate } from 'swr';
import NextLink from 'next/link';
import dateFormat from 'dateformat';
import { Grid, Stack, Typography, Link, IconButton, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import nProgress from 'nprogress';

import { KanbanProjectType } from '@/types';
import { paths } from '@/routes/paths';
import Iconify from '@/components/iconify';
import KanbanListItemWrapper from './kanban-list-item-wrapper';
import { useLocales } from '@/locales';
import { useBoolean } from '@/hooks/useBoolean';
import LoadingButton from '@/components/loading-button/loading-button';
import { useSnackbar } from '@/components/snackbar';
import { deleteProjectByUUID } from '@/hooks/useKanban';
import { endpoints } from '@/utils/axios';

const KanbanListItem = ({ project } : { project: KanbanProjectType }) => {
  const { t } = useLocales();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const deleteProjectViewToggle = useBoolean(false);
  const deleteProjectRequest = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();

  const onToggleDeleteHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      nProgress.done();
      deleteProjectViewToggle.onToggle();
    } catch (error) {
      console.log(error);
    }
  },[deleteProjectViewToggle]);

  const onDeleteProjectHandler = useCallback(async () => {
    try {
      deleteProjectRequest.onTrue();
      await deleteProjectByUUID(project.uuid);
      enqueueSnackbar(t('kanban_projects_view.labels.project_removed_successfully'), {
        variant: 'success',
        anchorOrigin: isUpMd ? { horizontal: 'right', vertical: 'bottom' } : { horizontal: 'center', vertical: 'top' }
      });
      mutate(endpoints.projects);
    } catch (error) {
      enqueueSnackbar(t('kanban_projects_view.labels.project_removed_error'), {
        variant: 'error',
        anchorOrigin: isUpMd ? { horizontal: 'right', vertical: 'bottom' } : { horizontal: 'center', vertical: 'top' }
      });
      deleteProjectViewToggle.onToggle();
      deleteProjectRequest.onFalse();
    }
  }, [deleteProjectRequest, deleteProjectViewToggle, enqueueSnackbar, isUpMd, project.uuid, t]);

  return (
    <Grid item xs={12} md={6} lg={4} xl={3} sx={{ display: 'flex' }}>
      {!deleteProjectViewToggle.value && (
        <Link 
          component={NextLink} 
          href={`${paths.dashboard.kanbanProjects}/${project?.uuid}`} 
          sx={{ width: '100%', display: 'flex', textDecoration: 'none' }}
        >
          <KanbanListItemWrapper>
            <Stack direction='column' alignItems='stretch' rowGap={1}>
            <Stack flexGrow={1} gap={1} sx={{ overflow: 'hidden' }}>
              <Stack direction="row" alignItems="center" width="100%">
                <Typography 
                  variant='subtitle1' 
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexGrow: 1 }}
                >
                  {project.title}
                </Typography>
                <IconButton color='error' aria-label="delete" size='small' onClick={onToggleDeleteHandler}>
                  <Iconify icon='uiw:delete' width={15}/>
                </IconButton>
                </Stack>
              <Stack direction='row' justifyContent="end" pl={5}>
                <Typography
                  variant='caption' 
                  component='span'
                  sx={{ color: (theme) => theme.palette.text.disabled, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {`${ dateFormat(project?.createdAt, 'paddedShortDate') } ${ dateFormat(project?.createdAt, 'mediumTime') }`}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction='row' columnGap={2}  justifyContent='space-between'> 
              <Stack direction='row' alignItems='center' gap={1}>
                <Iconify icon='fluent-mdl2:column-vertical-section-edit' />
                <Typography variant='overline'>{ t('kanban_projects_view.labels.sections') }</Typography>
                <Typography variant='overline'>{ ((project) => project?.sections?.length)(project) }</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' gap={1}>
                <Iconify icon='fluent-mdl2:task-list' />
                <Typography variant='overline'>{ t('kanban_projects_view.labels.tasks') }</Typography>
                <Typography variant='overline'>
                  {((project) => {
                    return project?.sections
                            ?.map(section => section?.tasks.length)
                            .reduce((sumTotal, totalTask)=> sumTotal + totalTask, 0)
                  })(project)}
                </Typography>
              </Stack>
            </Stack>
            </Stack>
          </KanbanListItemWrapper>
        </Link>
      )}

      {deleteProjectViewToggle.value && (
        <KanbanListItemWrapper>
          <Stack direction='column' height='100%' alignItems='center' justifyContent='center' spacing={1}>
            <Typography variant='body2'>
              {t('kanban_projects_view.labels.remove_project_question')}
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button disabled={deleteProjectRequest.value} size='small' variant='outlined' color='error' onClick={deleteProjectViewToggle.onToggle}>
                {t('common.labels.cancel')}
              </Button>
              <LoadingButton 
                disabled={deleteProjectRequest.value} 
                size='small' 
                variant='contained' 
                onClick={onDeleteProjectHandler} 
                color='error'
                label={t('common.labels.remove')}
                loadingLabel={t('common.labels.removing')} 
              />
            </Stack>
          </Stack>
        </KanbanListItemWrapper>
      )}
    </Grid>
  )
}

export default KanbanListItem;