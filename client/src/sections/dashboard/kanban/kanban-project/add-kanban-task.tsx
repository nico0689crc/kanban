import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button, Stack } from '@mui/material';

import Iconify from '@/components/iconify';
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFTextField } from '@/components/hook-form';
import { useSnackbar } from '@/components/snackbar';
import LoadingButton from '@/components/loading-button/loading-button';

import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';

import { KanbanContext } from './context/kanban-context';
import { SectionType } from './context/types';
import { postTask } from '@/hooks/useKanban';
import { faker } from '@faker-js/faker';

const AddKabanTask = ({ section } : { section: SectionType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const addTaskRequest = useBoolean(false);
  const { addTaskToSection, isExistingProject } = useContext(KanbanContext);
  const { t } = useLocales();
  const toggleForm = useBoolean();

  const AddKanbanSectionSchema = Yup.object().shape({
    new_task_title: Yup.string().required(t('kanban_project_view.validation.task_title_required')),
  });

  const defaultValues = {
    new_task_title: '',
  };
  
  const methods = useForm({ resolver: yupResolver(AddKanbanSectionSchema), defaultValues });

  const { trigger, reset, getValues } = methods;

  const onAddSectionHandler = async () => {
    try {
      const result = await trigger();

      if(result) {
        addTaskRequest.onTrue();

        let response;

        if(isExistingProject){
          response = await postTask(section.uuid, getValues('new_task_title'));
        }
        
        addTaskToSection(response?.data?.data?.uuid ?? faker.string.uuid(), section.uuid, getValues('new_task_title'));

        toggleForm.onToggle();

        reset();
        
        enqueueSnackbar(t('kanban_project_view.labels.create_task_message'), { variant: 'success' });

        addTaskRequest.onFalse();
      }
    } catch (error: any) {
      if(error?.errors?.detail){
        enqueueSnackbar(error?.errors?.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(t('common.labels.something_went_wrong'), { variant: 'error' });
      }

      addTaskRequest.onFalse();
    }
  }

  const onCancelSectionHandler = () => {
    toggleForm.onToggle();
    reset();
  }
  
  return (
    <Stack mt={2}>
      {!toggleForm.value && (
        <Button
          variant='contained'
          color='primary'
          startIcon={<Iconify icon='iconoir:plus-square'/>}
          onClick={toggleForm.onToggle}
        >
          {t('kanban_project_view.labels.add_task')}
        </Button>
      )}

      {toggleForm.value && (
        <FormProvider methods={methods}>
          <Stack rowGap={1}>
            <RHFTextField fullWidth name='new_task_title' label={t('kanban_project_view.labels.add_task_title')}/>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button size='small' variant='outlined' color='primary' onClick={onCancelSectionHandler}>
                {t('common.labels.cancel')}
              </Button>
              <LoadingButton 
                disabled={addTaskRequest.value} 
                size='small'
                variant='contained'
                onClick={onAddSectionHandler} 
                color='primary'
                label={t('common.labels.add')}
                loadingLabel={t('common.labels.adding')}
              />
            </Stack>
          </Stack>
        </FormProvider>
      )}
    </Stack>
  )
}

export default AddKabanTask