import {  Grid } from '@mui/material';
import { KanbanProjectType } from '@/types';
import KanbanListItem from './kanban-project-list-item';

type Props = {
  projects: KanbanProjectType[]
}

const KanbanList = ({ projects } : Props) => {
  return (
    <Grid container spacing={3}>
      {projects?.map(project => <KanbanListItem key={project.uuid} project={project} /> )}
    </Grid>
  )
}

export default KanbanList