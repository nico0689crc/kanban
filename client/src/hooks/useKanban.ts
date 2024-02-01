import { useMemo } from 'react';
import useSWR from 'swr';
import axiosInstance, { fetcher, endpoints } from '@/utils/axios';
import { KanbanProjectType, KanbanProjectsResponseCollectionType } from '@/types';
import { ProjectStateType, SectionType, TaskType } from '@/sections/dashboard/kanban/kanban-project/context/types';

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

export async function patchTaskByUUID(taskUUID: string, data: TaskType) {
  return await axiosInstance.patch(`${endpoints.tasks.root}/${taskUUID}`, data);
}

export async function deleteTaskByUUID(taskUUID: string) {
  return await axiosInstance.delete(`${endpoints.tasks.root}/${taskUUID}`);
}

export async function postTask(sectionUUID: string, title: string) {
  return await axiosInstance.post(endpoints.tasks.root, { title, section_uuid: sectionUUID });
}

export async function deleteProjectByUUID(projectUUID: string) {
  return await axiosInstance.delete(`${endpoints.projects}/${projectUUID}`);
}

export async function postProject(data : {title: string, sections: SectionType[]}) {
  return await axiosInstance.post(endpoints.projects, data);
}

export function useGetKanbanProjectByUUID(projectUUID: string) {
  const { data, isLoading, error, isValidating }  = useSWR(`${endpoints.projects}/${projectUUID}`, fetcher, options);
  const project: ProjectStateType = data?.data?.attributes;

  const memoizedValue = useMemo(
    () => ({
      project: {
        ...project,
        sections: project?.sections?.map((section:any) => ({
          ...section,
          tasks: section.tasks.map((task: any) => ({ 
            ...task,
            labels: task.labels ? Object.values(JSON.parse(task.labels)) : []
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