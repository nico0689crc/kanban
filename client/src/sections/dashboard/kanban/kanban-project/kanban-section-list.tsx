import React, { useCallback, useContext } from 'react'
import { Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { KanbanContext } from './context/kanban-context';
import KanbanSection from './kanban-section';
import AddKabanSection from './add-kanban-section';

const KanbanSectionList = () => {
  const { sections, changeSectionPosition, changeTaskPosition } = useContext(KanbanContext);
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));

  const onDragEnd = useCallback(async ({ destination, source, draggableId, type }: DropResult) => {
    try {
      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
      
      const sourceColumn = sections.find((section => section.uuid === source.droppableId));
      const destinationColumn = sections.find((section => section.uuid === destination.droppableId));
      
      // Moving column
      if (type === 'COLUMN') {
        changeSectionPosition(sections[source.index].uuid ,destination.index);
        return;
      }
      // Moving task to same or different section
      changeTaskPosition(draggableId, sourceColumn?.uuid!, destinationColumn?.uuid!, destination?.index)
      return;

    } catch (error) {
     console.log(error);
    }
  }, [changeSectionPosition, changeTaskPosition, sections]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="kanban-board" type="COLUMN" direction={isUpToMd ? 'horizontal' : 'vertical'}>
       {(provided) => (
        <Box sx={{ overflow: 'auto', pb: 3 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
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