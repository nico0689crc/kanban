import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button, Stack } from '@mui/material';

import Iconify from '@/components/iconify';
import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';

import FormProvider from '@/components/hook-form/FormProvider';
import { RHFTextField } from '@/components/hook-form';
import KanbanSectionCard from './kanban-section-card';
import { KanbanContext } from './context/kanban-context';
import LoadingButton from '@/components/loading-button/loading-button';
import { useSnackbar } from '@/components/snackbar';
import { postSection } from '@/hooks/useKanban';

const AddKabanSection = () => {
  const { addSection, isExistingProject, uuid } = useContext(KanbanContext);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const toggleForm = useBoolean();
  const addSectionRequest = useBoolean(false);

  const AddKanbanSectionSchema = Yup.object().shape({
    new_section_title: Yup.string().required(t('kanban_project_view.validation.section_title_required')),
  });

  const defaultValues = {
    new_section_title: '',
  };
  
  const methods = useForm({ resolver: yupResolver(AddKanbanSectionSchema), defaultValues });

  const { trigger, reset, getValues } = methods;

  const onAddSectionHandler = async () => {
    try {
      const result = await trigger();

      if(result) {
        addSectionRequest.onTrue();

        isExistingProject && uuid && await postSection(uuid, getValues('new_section_title'));

        addSection(getValues('new_section_title'));

        toggleForm.onToggle();

        reset();
        
        enqueueSnackbar(t('kanban_project_view.labels.create_section_message'), { variant: 'success' });

        addSectionRequest.onFalse();
      }
    } catch (error: any) {
      if(error?.errors?.detail){
        enqueueSnackbar(error?.errors?.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(t('common.labels.something_went_wrong'), { variant: 'error' });
      }

      addSectionRequest.onFalse();
    }
  }

  const onCancelSectionHandler = () => {
    toggleForm.onToggle();
    reset();
  }
  
  return (
    <KanbanSectionCard>
      <Stack {...(!toggleForm.value && ({ justifyContent : 'center' }))}  height='100%'>
        {!toggleForm.value && (
          <Button
            variant='contained'
            color='primary'
            startIcon={<Iconify icon='iconoir:plus-square'/>}
            onClick={toggleForm.onToggle}
          >
            {t('kanban_project_view.labels.add_section')}
          </Button>
        )}

        {toggleForm.value && (
          <FormProvider methods={methods}>
            <Stack rowGap={1}>
              <RHFTextField fullWidth name='new_section_title' label={t('kanban_project_view.labels.add_section_title')}/>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button disabled={addSectionRequest.value} size='small' variant='outlined' color='primary' onClick={onCancelSectionHandler}>
                  {t('common.labels.cancel')}
                </Button>
                <LoadingButton 
                  disabled={addSectionRequest.value} 
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
    </KanbanSectionCard>
  )
}

export default AddKabanSection