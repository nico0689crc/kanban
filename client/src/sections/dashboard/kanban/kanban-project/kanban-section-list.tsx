import React, { useCallback, useContext } from 'react'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

import { Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { KanbanContext } from './context/kanban-context';
import KanbanSection from './kanban-section';
import AddKabanSection from './add-kanban-section';

import { useSnackbar } from '@/components/snackbar';

import { patchChangeSectionPosition, patchChangeTaskPosition } from '@/hooks/useKanban';
import { useLocales } from '@/locales';

const KanbanSectionList = () => {
  const { sections, isExistingProject, changeSectionPosition, changeTaskPosition } = useContext(KanbanContext);
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const onDragEnd = useCallback(async ({ destination: position, source: origin, draggableId: taskUUID, type }: DropResult) => {
    try {
      if (!position) {
        return;
      }

      if (position.droppableId === origin.droppableId && position.index === origin.index) {
        return;
      }
      
      // Moving column
      if (type === 'COLUMN') {
        changeSectionPosition(sections[origin.index].uuid ,position.index);
        isExistingProject && await patchChangeSectionPosition(sections[origin.index].uuid, position?.index);
        return;
      }

      const originSection = sections.find((section => section.uuid === origin.droppableId));

      const destinationSection = sections.find((section => section.uuid === position.droppableId));
      
      // Moving task to same or different section
      if(originSection?.uuid && destinationSection?.uuid) {
        changeTaskPosition(taskUUID, originSection?.uuid, destinationSection?.uuid, position?.index);
        isExistingProject && await patchChangeTaskPosition(taskUUID, originSection?.uuid, destinationSection?.uuid, position?.index);
      }

      return;
    } catch (error) {
      enqueueSnackbar(t('common.labels.something_went_wrong'), { variant: 'error' });
    }
  }, [changeSectionPosition, changeTaskPosition, enqueueSnackbar, isExistingProject, sections, t]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="kanban-board" type="COLUMN" direction={isUpToMd ? 'horizontal' : 'vertical'}>
       {(provided) => (
        <Box sx={{ overflow: 'auto', pb: 2 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sections?.map((section, index) => (
              <KanbanSection key={section.uuid} index={index} section={section} />
            ))}
            
            {provided.placeholder}

            <AddKabanSection />
          </Stack>
        </Box>
       )}
      </Droppable>
    </DragDropContext>
  )
}

export default KanbanSectionList