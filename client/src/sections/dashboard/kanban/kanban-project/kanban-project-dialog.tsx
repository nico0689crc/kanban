'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button, Chip, Dialog, DialogActions, DialogContent,  DialogTitle, ListItemText, useMediaQuery, Stack, Grid, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import * as Yup from 'yup';
import { capitalize } from 'lodash';
import dateFormat from 'dateformat';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useLocales } from '@/locales';
import { useTheme } from '@mui/material/styles';
import { KanbanContext } from './context/kanban-context';
import Iconify from '@/components/iconify';
import { useBoolean } from '@/hooks/useBoolean';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFAutocomplete from '@/components/hook-form/rhf-autocomplete';

const KanbanProjectDialog = () => {
  const [labels, setLabels] = useState<string[]>();
  const { t } = useLocales();
  const theme = useTheme();
  const editTaskToggleActive = useBoolean(false);
  const { dialogTaskOnToggle, editTaskFromSection, setTaskSelected, taskSelected, isDialogTaskOpen, sections } = useContext(KanbanContext);

  const isDownToSm = useMediaQuery(theme.breakpoints.down('sm'));

  const KanbanTaskEditSchema = Yup.object().shape({
    title_task_edit: Yup.string().required(t('kanban_project_view.validation.task_title_required')),
    description_task_edit: Yup.string().required(t('kanban_project_view.validation.task_title_required')),
    priority_task_edit: Yup.string().required(t('kanban_project_view.validation.task_title_required')),
  });

  const methods = useForm({ resolver: yupResolver(KanbanTaskEditSchema), defaultValues: {
    title_task_edit: '', 
    description_task_edit: '',
    priority_task_edit: ''
  }});

  const { trigger, reset, setValue, getValues, control } = methods;

  useEffect(()=> {
    if(taskSelected) {
      reset({
        title_task_edit: taskSelected?.title,
        description_task_edit: taskSelected?.description,
        priority_task_edit: taskSelected?.priority
      })
      setLabels(taskSelected?.labels);
    }
  },[reset, setValue, taskSelected]);

  const onClickCloseHandler = async () => {
    dialogTaskOnToggle();
    reset();
    editTaskToggleActive.onFalse();
  }

  const onClickUpdateTaskHandler = async () => {
    const result = await trigger();

    if(result) {
      const taskToUpdate = {
        ...taskSelected,
        labels: labels,
        title: getValues('title_task_edit'),
        description: getValues('description_task_edit'),
        priority: getValues('priority_task_edit')
      }
      setTaskSelected(taskToUpdate);
      editTaskFromSection(taskToUpdate);
      editTaskToggleActive.onToggle();
    }
  }

  const onClickCancelTaskHandler = () => {
    let labels;
    
    sections.forEach(section => section.tasks.forEach(task => {
      if(task.uuid === taskSelected?.uuid && task?.labels) {
        labels = [...task?.labels];
      }
    }));

    if(labels){
      setLabels(labels);
    }

    reset({
      title_task_edit: taskSelected?.title,
      description_task_edit: taskSelected?.description
    });

    editTaskToggleActive.onToggle();
  }

  return (
    <>
      {isDialogTaskOpen && (
        <Dialog
          fullScreen={isDownToSm}
          sx={{
            '.MuiDialog-container > div': {
              ...(isDownToSm && {
                position: 'absolute',
                top: 0,
                bottom: 0
              })
            }
          }}
          open={isDialogTaskOpen}
          onClose={onClickCloseHandler}
        >
          <FormProvider methods={methods}>
            <DialogTitle variant='h4'>
              {editTaskToggleActive.value ? (
                <RHFTextField 
                  label={t('kanban_project_view.labels.add_task_title')} 
                  fullWidth 
                  name='title_task_edit' 
                />
              ) : (
                taskSelected?.title
              )}
            </DialogTitle>
            
            <DialogContent>
              <Stack spacing={3}>
                <Stack direction='row' spacing={5} justifyContent='space-between'>
                  {taskSelected?.priority && (
                    editTaskToggleActive.value ? (
                      <Stack>
                        <Typography variant='body2' color='text.secondary'>
                          {t('kanban_project_view.labels.dialog_task_priority')}
                        </Typography>
                        <FormControl>
                          <Controller
                            rules={{ required: true }}
                            control={control}
                            name="priority_task_edit"
                            render={({field}) => (
                              <RadioGroup
                                {...field}
                                row
                                aria-labelledby="task-priority"
                              >
                                {['low', 'medium', 'hight'].map((priority, index) => (
                                  <FormControlLabel 
                                    key={index} 
                                    value={priority} 
                                    control={<Radio />}
                                    label={capitalize(priority)} 
                                  />
                                ))}
                              </RadioGroup>
                            )}
                          />
                        </FormControl>
                      </Stack>
                    ) : (
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
                    )
                  )}
                  {taskSelected?.createdAt && !editTaskToggleActive.value && (
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
                  )}
                </Stack>
                {labels && (
                  <Stack>
                    <Typography variant='body2' mb={0.5} color='text.secondary'>
                      {t('kanban_project_view.labels.dialog_task_features')}
                    </Typography>
                    {editTaskToggleActive.value ? (
                      <RHFAutocomplete
                        name="tags"
                        label="Tags"
                        placeholder="+ Tags"
                        multiple
                        freeSolo
                        options={labels.map((option) => option)}
                        defaultValue={labels.map((option) => option)}
                        onChange={(_ ,options, reason)=> setLabels(() => {
                          console.log(options);
                          console.log(reason);
                          
                          return options.map(option => option)
                        })}
                        getOptionLabel={(option) => option}
                        renderOption={(props, option) => (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        )}
                        renderTags={(selected, getTagProps) =>
                          selected.map((option, index) => (
                            <Chip
                              {...getTagProps({ index })}
                              key={option}
                              label={option}
                              size="small"
                              color="primary"
                            />
                          ))
                        }
                      />
                    ) : (
                      <Grid container spacing={1}> 
                        {labels.map((label, index) => (
                          <Grid key={index} item>
                            <Chip label={label} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Stack>  
                )}
                {taskSelected?.description && (
                  <Stack spacing={1} justifyContent='start' direction="row">
                    {editTaskToggleActive.value ? (
                      <RHFTextField
                        multiline
                        fullWidth 
                        label={t('kanban_project_view.labels.add_task_description')} 
                        name='description_task_edit'
                        sx={{
                          ...(!isDownToSm && {
                            width: '550px'
                          })
                        }} 
                      />
                    ) : (
                      <ListItemText
                        primary={t('kanban_project_view.labels.dialog_task_description')}
                        secondary={capitalize(taskSelected?.description)}
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
                    )}
                  </Stack>
                )}
              </Stack>
            </DialogContent>
          </FormProvider>
          <DialogActions sx={{ p: 3}}>
            <Stack direction='row' spacing={2}>
              {!editTaskToggleActive.value ? (
                <Button color='warning' variant='contained' onClick={editTaskToggleActive.onToggle}>{t('common.labels.edit')}</Button>
              ): (
                <>
                  <Button color='warning' variant='outlined' onClick={onClickCancelTaskHandler}>{t('common.labels.cancel')}</Button>
                  <Button color='warning' variant='contained' onClick={onClickUpdateTaskHandler}>{t('common.labels.update')}</Button>
                </>
              )}
              <Button color='primary' variant='contained' onClick={onClickCloseHandler}>{t('common.labels.close')}</Button>
            </Stack>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default KanbanProjectDialog