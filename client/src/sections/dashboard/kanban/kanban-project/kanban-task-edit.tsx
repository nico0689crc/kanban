'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button, Chip, DialogActions, DialogContent,  DialogTitle, useMediaQuery, Stack, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { capitalize } from 'lodash';
import { Controller, useForm } from 'react-hook-form';

import { useSnackbar } from '@/components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocales } from '@/locales';
import { KanbanContext } from './context/kanban-context';
import { ReturnType, useBoolean } from '@/hooks/useBoolean';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFAutocomplete from '@/components/hook-form/rhf-autocomplete';
import { patchTaskByUUID } from '@/hooks/useKanban';
import LoadingButton from '@/components/loading-button/loading-button';

type Props = {
  onClickCloseHandler: () => void, 
  editTaskToggleActive: ReturnType
}

const KanbanTaskEdit = ({ onClickCloseHandler, editTaskToggleActive} : Props) => {
  const [labels, setLabels] = useState<string[]>();
  const editTaskRequest = useBoolean(false);
  const { t } = useLocales();
  const theme = useTheme();
  const isDownToSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { editTaskFromSection, setTaskSelected, taskSelected, sections, isExistingProject } = useContext(KanbanContext);
  const { enqueueSnackbar } = useSnackbar();

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

  const onClickUpdateTaskHandler = async () => {
    try {
      const result = await trigger();

      if(result) {
        editTaskRequest.onTrue();
        const taskToUpdate = {
          ...taskSelected,
          labels: labels,
          title: getValues('title_task_edit'),
          description: getValues('description_task_edit'),
          priority: getValues('priority_task_edit')
        }

        isExistingProject && await patchTaskByUUID(taskToUpdate.uuid!, taskToUpdate);

        setTaskSelected(taskToUpdate);
        editTaskFromSection(taskToUpdate);
        editTaskToggleActive.onToggle();
        enqueueSnackbar(t('kanban_project_view.labels.update_task_message'), { variant: 'success' });
        editTaskRequest.onFalse();
      }
    } catch (error:any) {
      enqueueSnackbar(t('common.labels.something_went_wrong'), { variant: 'error' });
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
      <FormProvider methods={methods}>
        <DialogTitle variant='h4'>
          <RHFTextField 
            label={t('kanban_project_view.labels.add_task_title')} 
            fullWidth 
            name='title_task_edit' 
          />
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3}>
            <Stack direction='row' spacing={5} justifyContent='space-between'>
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
            </Stack>
            <Stack>
              <Typography variant='body2' mb={0.5} color='text.secondary'>
                {t('kanban_project_view.labels.dialog_task_features')}
              </Typography>
              <RHFAutocomplete
                name="tags"
                label="Tags"
                placeholder="+ Tags"
                multiple
                freeSolo
                options={taskSelected?.labels?.map((option) => option) ?? []}
                defaultValue={taskSelected?.labels?.map((option) => option)}
                onChange={(_ ,options)=> setLabels(() => options.map(option => option))}
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
            </Stack>  
            <Stack spacing={1} justifyContent='start' direction="row">
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
            </Stack>
          </Stack>
        </DialogContent>
      </FormProvider>
      <DialogActions sx={{ p: 3}}>
        <Stack direction='row' spacing={2}>
          <Button color='warning' variant='outlined' onClick={onClickCancelTaskHandler}>{t('common.labels.cancel')}</Button>
          <LoadingButton 
            disabled={editTaskRequest.value} 
            variant='contained'
            onClick={onClickUpdateTaskHandler} 
            color='warning'
            label={t('common.labels.update')}
            loadingLabel={t('common.labels.updating')} 
          />
          <Button color='primary' variant='contained' onClick={onClickCloseHandler}>{t('common.labels.close')}</Button>
        </Stack>
      </DialogActions>
    </>
  )
}

export default KanbanTaskEdit