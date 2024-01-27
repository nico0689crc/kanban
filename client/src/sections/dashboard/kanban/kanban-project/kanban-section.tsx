import React, { useContext } from 'react'
import { Button, IconButton, Stack, Typography } from '@mui/material';

import KanbanSectionCard from './kanban-section-card';
import { SectionType } from './context/types'
import KanbanTaskList from './kanban-task-list'
import AddKabanTask from './add-kanban-task'
import Iconify from '@/components/iconify';
import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import { KanbanContext } from './context/kanban-context';

const KanbanSection = ({ section } : { section : SectionType }) => {
  const { t } = useLocales();
  const deleteSectionToggle = useBoolean(false);
  const { removeSection } = useContext(KanbanContext);

  const deleteSectionToggleHandler = () => {
    deleteSectionToggle.onToggle();
  }
  
  const deleteSectionHandler = () => {
    removeSection(section.uuid);
  }

  return (
    <KanbanSectionCard>
      {!deleteSectionToggle.value && (
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
              <IconButton color='warning' aria-label="delete" size='small'>
                <Iconify icon='uiw:edit' width={15}/>
              </IconButton>
            </Stack>
          </Stack>
          <KanbanTaskList tasks={section.tasks}/>
          <AddKabanTask section={section}/>
        </Stack>
      )}
      {deleteSectionToggle.value && (
        <Stack direction='column' height='100%' alignItems='center' justifyContent='center' spacing={3}>
          <Typography variant='body2'>
            {t('kanban_project_view.labels.remove_section_question')}
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button size='small' variant='outlined' color='primary' onClick={deleteSectionToggle.onToggle}>
              {t('common.labels.cancel')}
            </Button>
            <Button size='small' variant='contained' onClick={deleteSectionHandler} color='error'>
              {t('common.labels.remove')}
            </Button>
          </Stack>
        </Stack>
      )}
    </KanbanSectionCard>
  )
}

export default KanbanSection