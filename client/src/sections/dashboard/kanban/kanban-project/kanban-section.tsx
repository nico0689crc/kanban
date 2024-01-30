import React, { useContext } from 'react'
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import KanbanSectionCard from './kanban-section-card';
import { SectionType } from './context/types'
import KanbanTaskList from './kanban-task-list'
import AddKabanTask from './add-kanban-task'
import Iconify from '@/components/iconify';
import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import { KanbanContext } from './context/kanban-context';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';

const KanbanSection = ({ section, index } : { section : SectionType, index: number }) => {
  const { t } = useLocales();
  const deleteSectionToggle = useBoolean(false);
  const editSectionToggle = useBoolean(false);
  const { removeSection, editSection } = useContext(KanbanContext);
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));

  const EditKanbanSectionSchema = Yup.object().shape({
    edit_section_title: Yup.string().required(t('kanban_project_view.validation.section_title_required')),
  });

  const defaultValues = {
    edit_section_title: '',
  };
  
  const methods = useForm({ resolver: yupResolver(EditKanbanSectionSchema), defaultValues });

  const { trigger, reset, getValues } = methods;

  const onEditSectionHandler = async () => {
    const valid = await trigger();

    if(valid){
      valid && editSection(section.uuid, getValues('edit_section_title'));
      editSectionToggle.onToggle();
      reset();
    }
  }

  const onCancelEditSectionHandler = () => {
    editSectionToggle.onToggle();
    reset();
  }

  const deleteSectionToggleHandler = () => {
    deleteSectionToggle.onToggle();
  }
  
  const deleteSectionHandler = () => {
    removeSection(section.uuid);
  }

  return (
    <Draggable draggableId={section.uuid} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            display:'flex',
            ...(isUpToMd ? ({ px: 2 }) : ({ py: 2 })),
            borderRadius: 2,
          }}
        >
          <KanbanSectionCard {...provided.dragHandleProps}>
            {!deleteSectionToggle.value && !editSectionToggle.value && (
              <Stack direction='column'>
                <Stack direction='row' alignItems='center' spacing={3}>
                  <Typography
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexGrow: 1 }} 
                    variant='subtitle1'
                  >
                    {section.title}
                  </Typography>
                  <Stack direction='row' spacing={1}>
                    <IconButton color='error' aria-label="delete" size='small' onClick={deleteSectionToggleHandler}>
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
                    </>
                  )}
                </Droppable>
                
                <AddKabanTask section={section}/>
              </Stack>
            )}

            {deleteSectionToggle.value && (
              <Stack direction='column' height='100%' alignItems='center' justifyContent='center' spacing={3}>
                <Typography variant='body2'>
                  {t('kanban_project_view.labels.remove_section_question')}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Button size='small' variant='outlined' color='error' onClick={deleteSectionToggle.onToggle}>
                    {t('common.labels.cancel')}
                  </Button>
                  <Button size='small' variant='contained' onClick={deleteSectionHandler} color='error'>
                    {t('common.labels.remove')}
                  </Button>
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
                    <Button size='small' variant='contained' onClick={onEditSectionHandler} color='warning'>
                      {t('common.labels.edit')}
                    </Button>
                  </Stack>
                </Stack>
              </FormProvider>
            )}
          </KanbanSectionCard>
        </Box>
      )}
    </Draggable>

  )
}

export default KanbanSection