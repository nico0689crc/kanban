import React from 'react'
import KanbanProjectDetailsView from '@/sections/dashboard/kanban/kanban-project-details/kanban-project-details-view'

const KanbanProjectPage = ({ params }: { params: { uuid: string } }) => {
  return (
    <KanbanProjectDetailsView projectUUID={params.uuid}/>
  )
}

export default KanbanProjectPage