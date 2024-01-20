'use client';

import { useCallback } from "react";
import { useFetchProjects } from "@/hooks/useKanban";
import { Card, Container, Stack, Typography } from "@mui/material";
import { KanbanColumnSkeleton } from "./kanban-skeleton";
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

const KanbanView = () => {
  const { projects, projectsEmpty, projectsLoading } = useFetchProjects();

  const renderSkeleton = (
    <Stack direction="row" alignItems="flex-start" spacing={3}>
      {[...Array(4)].map((_, index) => (
        <KanbanColumnSkeleton key={index} index={index} />
      ))}
    </Stack>
  );
  
  return (
    <Stack direction="column" gap={6} sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h4">
        Kanban Projects
      </Typography>
      {projectsLoading && renderSkeleton}
      {projectsEmpty && <Typography variant="h3">No data</Typography>}
      {!!projects?.length && (
        <Stack direction="column" gap={3}>
          {projects?.map((project, index) => (
            <Card key={index} sx={{ padding: 2,  }}>
              <Typography>{project.attributes.title}</Typography>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  )
};

export default KanbanView;