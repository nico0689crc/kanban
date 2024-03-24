import { KanbanListView } from '@/sections/dashboard/kanban/kanban-project-list';

export const metadata = {
  title: 'Projects',
};

const KanbanProjectsPage = () => {
  return (
    <KanbanListView />
  )
}

export default KanbanProjectsPage;