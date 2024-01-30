import React, { useCallback, useContext } from 'react'
import { Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { KanbanContext } from './context/kanban-context';
import KanbanSection from './kanban-section';
import AddKabanSection from './add-kanban-section';

const KanbanSectionList = () => {
  const { sections } = useContext(KanbanContext);
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));

  const onDragEnd = useCallback(()=> {}, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction={isUpToMd ? 'horizontal' : 'vertical'}>
       {(provided) => (
        <Box sx={{ overflowX: 'auto', pb: 3 }}>
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