import { useMemo } from 'react';
import useSWR from 'swr';
import axiosInstance, { fetcher, endpoints } from '@/utils/axios';
import { KanbanProjectType, KanbanProjectsResponseCollectionType } from '@/types';
import { ProjectStateType } from '@/sections/dashboard/kanban/kanban-project/context/types';

type swrResponseType = { 
  data: KanbanProjectsResponseCollectionType, 
  isLoading: boolean, 
  error: any,
  isValidating: boolean 
}

export function useGetKanbanProjects() {
  const { data, isLoading, error, isValidating } : swrResponseType = useSWR(endpoints.projects, fetcher); 

  const memoizedValue = useMemo(
    () => ({
      projects: data?.data.map(project => project.attributes) as KanbanProjectType[],
      isLoadingProjects: isLoading,
      error: error,
      boardValidating: isValidating,
      isEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function deleteProjectByUUID(projectUUID: string) {
  await axiosInstance.delete(`${endpoints.projects}/${projectUUID}`);
}

export async function postProject(data : ProjectStateType) {
  return await axiosInstance.post(endpoints.projects, data);
}