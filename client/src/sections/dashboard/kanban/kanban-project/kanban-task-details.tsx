'use client';

import React, { useContext } from 'react';
import dateFormat from 'dateformat';
import { capitalize } from 'lodash';
import { Button, Chip, DialogActions, DialogContent,  DialogTitle, ListItemText, Stack, Grid, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import Iconify from '@/components/iconify';
import { useLocales } from '@/locales';
import { ReturnType } from '@/hooks/useBoolean';
import { KanbanContext } from './context/kanban-context';

type Props = {
  onClickCloseHandler: () => void, 
  editTaskToggleActive: ReturnType
}

const NoDataToPresent = ({ content } : { content: string }) => {
  return (
    <Stack 
      sx={{
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
        border: theme => `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme => theme.shape.borderRadius / 16,
        p: 2 
      }} 
      alignItems='center' 
      justifyContent='center'
    >
      <Typography variant='subtitle2' color='text.secondary'>{content}</Typography>
    </Stack>
  )
}

const KanbanTaskDetails = ({ onClickCloseHandler, editTaskToggleActive} : Props) => {
  const { t } = useLocales();
  const { taskSelected } = useContext(KanbanContext);

  return (
    <>
      <DialogTitle variant='h4'>
        {taskSelected?.title}
      </DialogTitle>
      <DialogContent 
        sx={{
          '& .MuiPaper-root': {
            minWidth: '500px'
          }
        }}
      >
        <Stack spacing={3}>
          <Stack direction='row' spacing={5} justifyContent='space-between'>
            {taskSelected?.priority && (
              <Stack spacing={1} direction="row">
                <ListItemText
                  primary={t('kanban_project_view.labels.dialog_task_priority')}
                  secondary={capitalize(taskSelected?.priority)}
                  primaryTypographyProps={{
                    typography: 'body2',
                    color: 'text.secondary',
                    mb: 0.5,
                  }}
                  secondaryTypographyProps={{
                    typography: 'subtitle2',
                    ...(taskSelected?.priority === 'low' && {
                      color: 'info.main',
                    }),
                    ...(taskSelected?.priority === 'medium' && {
                      color: 'warning.main',
                    }),
                    ...(taskSelected?.priority === 'hight' && {
                      color: 'error.main',
                    }),
                    component: 'span',
                  }}
                />
                <Iconify
                  icon={
                    (taskSelected?.priority === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
                    (taskSelected?.priority === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
                    'solar:double-alt-arrow-up-bold-duotone'
                  }
                  sx={{
                    ...(taskSelected?.priority === 'low' && {
                      color: 'info.main',
                    }),
                    ...(taskSelected?.priority === 'medium' && {
                      color: 'warning.main',
                    }),
                    ...(taskSelected?.priority === 'hight' && {
                      color: 'error.main',
                    }),
                  }}
                />
              </Stack>
            )}
            <Stack spacing={1} direction="row">
              <Iconify icon="solar:calendar-date-bold" />
              <ListItemText
                primary={t('kanban_project_view.labels.dialog_task_date_created')}
                secondary={`${ dateFormat(taskSelected?.createdAt, 'paddedShortDate') } ${ dateFormat(taskSelected?.createdAt, 'mediumTime') }`}
                primaryTypographyProps={{
                  typography: 'body2',
                  color: 'text.secondary',
                  mb: 0.5,
                }}
                secondaryTypographyProps={{
                  typography: 'subtitle2',
                  color: 'text.primary',
                  component: 'span',
                }}
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant='body2' mb={0.5} color='text.secondary'>
              {t('kanban_project_view.labels.dialog_task_features')}
            </Typography>
            {!!taskSelected?.labels?.length ? (
              <Grid container spacing={1}>
                {taskSelected?.labels?.map((label, index) => (
                  <Grid key={index} item>
                    <Chip label={label} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoDataToPresent content={t('kanban_project_view.labels.dialog_task_no_features')} />
            )}
          </Stack>  
          <Stack spacing={1} justifyContent='start' direction="row">
          <ListItemText
            primary={t('kanban_project_view.labels.dialog_task_description')}
            secondary={!!taskSelected?.description ? (
              capitalize(taskSelected?.description)
            ) : (
              <NoDataToPresent content={t('kanban_project_view.labels.dialog_task_no_description')} />
            )}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mt: 0.25, 
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span'
            }}
          />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3}}>
        <Stack direction='row' spacing={2}>
          <Button color='warning' variant='contained' onClick={editTaskToggleActive.onToggle}>{t('common.labels.edit')}</Button>
          <Button color='primary' variant='contained' onClick={onClickCloseHandler}>{t('common.labels.close')}</Button>
        </Stack>
      </DialogActions>
    </>
  )
}

export default KanbanTaskDetails