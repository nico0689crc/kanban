import React, { useCallback, useContext } from 'react'
import { Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import KanbanSectionCard from './kanban-section-card';
import { SectionType } from './context/types'
import KanbanTaskList from './kanban-task-list'
import AddKabanTask from './add-kanban-task'
import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import { KanbanContext } from './context/kanban-context';

import Iconify from '@/components/iconify';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import LoadingButton from '@/components/loading-button/loading-button';
import { useSnackbar } from '@/components/snackbar';

import { deleteSectionByUUID, patchSectionByUUID } from '@/hooks/useKanban';

const KanbanSection = ({ section, index } : { section : SectionType, index: number }) => {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const deleteSectionToggle = useBoolean(false);
  const editSectionToggle = useBoolean(false);
  const deleteSectionRequest = useBoolean(false);
  const editSectionRequest = useBoolean(false);
  const { editSection, removeSection, isExistingProject } = useContext(KanbanContext);
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));

  const EditKanbanSectionSchema = Yup.object().shape({
    edit_section_title: Yup.string().required(t('kanban_project_view.validation.section_title_required')),
  });
  
  const methods = useForm({ resolver: yupResolver(EditKanbanSectionSchema), defaultValues: { edit_section_title: '' } });

  const { trigger, reset, getValues } = methods;

  const onEditSectionHandler = useCallback(async () => {
    try {
      const result = await trigger();

      if(result) {
        editSectionRequest.onTrue();
    
        editSection(section.uuid, getValues('edit_section_title'));
    
        isExistingProject && await patchSectionByUUID(section.uuid, getValues('edit_section_title'));
        
        enqueueSnackbar(t('kanban_project_view.labels.update_section_message'), { variant: 'success' });

        editSectionToggle.onToggle();

        reset();

        editSectionRequest.onFalse();
      }
    } catch (error:any) {
      if(error?.errors?.detail){
        enqueueSnackbar(error?.errors?.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(t('common.labels.something_went_wrong'), { variant: 'error' });
      }
      
      editSectionRequest.onFalse();
    }
  },[editSection, editSectionRequest, editSectionToggle, enqueueSnackbar, getValues, isExistingProject, reset, section.uuid, t, trigger]);

  const onRemoveSectionHandler = useCallback(async () => {
    try {
      deleteSectionRequest.onTrue();
  
      removeSection(section.uuid);
      
      isExistingProject && await deleteSectionByUUID(section.uuid);
      
      enqueueSnackbar(t('kanban_project_view.labels.delete_section_message'), { variant: 'success' });

      deleteSectionRequest.onFalse();
    } catch (error:any) {
      if(error?.errors?.detail){
        enqueueSnackbar(error?.errors?.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(t('common.labels.something_went_wrong'), { variant: 'error' });
      }
      
      deleteSectionRequest.onFalse();
    }
  },[deleteSectionRequest, enqueueSnackbar, isExistingProject, removeSection, section.uuid, t]);

  const onCancelEditSectionHandler = useCallback(() => {
    editSectionToggle.onToggle();
    reset();
  },[editSectionToggle, reset])
  
  return (
    <Draggable draggableId={section.uuid} index={index}>
      {(provided) => (
        <Stack
          direction={{xs: 'column', md: 'row'}}
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            ...(isUpToMd ? ({ px: 2 }) : ({ py: 2 })),
            borderRadius: 2
          }}
        >
          <KanbanSectionCard {...provided.dragHandleProps}>
            {!deleteSectionToggle.value && !editSectionToggle.value && (
              <Stack direction='column' height='100%'>
                <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={3}>
                  <Typography
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
                    variant='subtitle1'
                  >
                    {section.title}
                  </Typography>
                  <Stack direction='row' spacing={1}>
                    <IconButton color='error' aria-label="delete" size='small' onClick={deleteSectionToggle.onToggle}>
                      <Iconify icon='uiw:delete' width={15}/>
                    </IconButton>
                    <IconButton color='warning' aria-label="delete" onClick={editSectionToggle.onToggle} size='small'>
                      <Iconify icon='uiw:edit' width={15}/>
                    </IconButton>
                  </Stack>
                </Stack>
                <Droppable droppableId={section.uuid} type="TASK">
                  {(dropProvided) => (
                    <>
                      <KanbanTaskList 
                        tasks={section.tasks}
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                        />
                      {dropProvided.placeholder}
                      <AddKabanTask section={section}/>
                    </>
                  )}
                </Droppable>
              </Stack>
            )}

            {deleteSectionToggle.value && (
              <Stack direction='column' height='100%' alignItems='center' justifyContent='center' spacing={3}>
                <Typography variant='body2'>
                  {t('kanban_project_view.labels.remove_section_question')}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Button disabled={deleteSectionRequest.value}  size='small' variant='outlined' color='error' onClick={deleteSectionToggle.onToggle}>
                    {t('common.labels.cancel')}
                  </Button>
                  <LoadingButton 
                    disabled={deleteSectionRequest.value} 
                    size='small'
                    variant='contained'
                    onClick={onRemoveSectionHandler} 
                    color='error'
                    label={t('common.labels.remove')}
                    loadingLabel={t('common.labels.removing')} 
                  />
                </Stack>
              </Stack>
            )}

            {editSectionToggle.value && (
              <FormProvider methods={methods}>
                <Stack rowGap={1}>
                  <RHFTextField color='warning' fullWidth name='edit_section_title' label={t('kanban_project_view.labels.add_section_title')}/>
                  <Stack direction="row" justifyContent="center" spacing={2}>
                    <Button size='small' variant='outlined' color='warning' onClick={onCancelEditSectionHandler}>
                      {t('common.labels.cancel')}
                    </Button>
                    <LoadingButton 
                      disabled={editSectionRequest.value} 
                      size='small'
                      variant='contained'
                      onClick={onEditSectionHandler} 
                      color='warning'
                      label={t('common.labels.edit')}
                      loadingLabel={t('common.labels.editing')} 
                    />
                  </Stack>
                </Stack>
              </FormProvider>
            )}
          </KanbanSectionCard>
        </Stack>
      )}
    </Draggable>
  )
}

export default KanbanSection