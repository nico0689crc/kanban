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

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

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

export function useGetKanbanProjectByUUID(projectUUID: string) {
  const { data, isLoading, error, isValidating } = useSWR(`${endpoints.projects}/${projectUUID}`, fetcher, options);
  const project: ProjectStateType = data?.data?.attributes;

  const memoizedValue = useMemo(
    () => ({
      project: {
        ...project,
        sections: project?.sections?.map(section => ({
          ...section,
          tasks: section.tasks.map(task => ({ 
            ...task 
          }))
        }))
      },
      isLoadingProject: isLoading,
      error: error,
      projectValidating: isValidating
    }),
    [error, isLoading, isValidating, project]
  );

  return memoizedValue;
}