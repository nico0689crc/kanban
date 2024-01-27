import { useEffect } from 'react';
import useSWR from 'swr';

import { endpoints, fetcher } from '@/utils/axios';
import { setProjects, setIsLoading, setError } from '@/store/project/projectSlice';
import { KanbanProjectsResponseCollectionType } from '@/types';

type swrResponseType = { 
  data: KanbanProjectsResponseCollectionType, 
  isLoading: boolean, 
  error: any 
}

export const fetchProjectsActionCreator = () => {
  return async (dispatch: any) => {
    const { data, isLoading, error } : swrResponseType = useSWR(endpoints.projects, fetcher); 

    useEffect(() => {
      dispatch(setIsLoading({ isLoading }));
    },[isLoading, dispatch]);

    useEffect(() => {
      data?.data && dispatch(setProjects({ 
        projects: data?.data.map(project => project.attributes),
        totalProjects: data?.api?.items_total 
      }));
    },[data, dispatch]);

    useEffect(() => {
      error && dispatch(setError({ error }));
    },[error, dispatch]);
  };
};