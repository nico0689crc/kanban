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

const AddKabanSection = () => {
  const { addSection } = useContext(KanbanContext);
  const { t } = useLocales();
  const toggleForm = useBoolean();

  const AddKanbanSectionSchema = Yup.object().shape({
    new_section_title: Yup.string().required(t('kanban_project_view.validation.section_title_required')),
  });

  const defaultValues = {
    new_section_title: '',
  };
  
  const methods = useForm({ resolver: yupResolver(AddKanbanSectionSchema), defaultValues });

  const { trigger, reset, getValues } = methods;

  const onAddSectionHandler = async () => {
    const valid = await trigger();

    if(valid){
      valid && addSection(getValues('new_section_title'));
      toggleForm.onToggle();
      reset();
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
                <Button size='small' variant='outlined' color='primary' onClick={onCancelSectionHandler}>
                  {t('common.labels.cancel')}
                </Button>
                <Button size='small' variant='contained' onClick={onAddSectionHandler} color='primary'>
                  {t('common.labels.add')}
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        )}
      </Stack>
    </KanbanSectionCard>
  )
}

export default AddKabanSection