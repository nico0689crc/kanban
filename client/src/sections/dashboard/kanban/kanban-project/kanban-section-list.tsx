import React, { useContext } from 'react'
import { Stack } from '@mui/material'
import { KanbanContext } from './context/kanban-context'
import KanbanSection from './kanban-section';
import AddKabanSection from './add-kanban-section';

const KanbanSectionList = () => {
  const { sections } = useContext(KanbanContext);

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
      {sections?.map((section) => (
        <KanbanSection key={section.uuid} section={section} />
      ))}
      <AddKabanSection />
    </Stack>
  )
}

export default KanbanSectionList