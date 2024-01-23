import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

import { endpoints, fetcher } from '@/utils/axios';
import { RootState } from '@/store';
import { setProjects, setIsLoading, setError } from '@/store/project/projectSlice';
import { KanbanProjectsResponseCollectionType } from '@/types';

type swrResponseType = { 
  data: KanbanProjectsResponseCollectionType, 
  isLoading: boolean, 
  error: any 
}

export const fetchProjectsActionCreator = () => {
  return async (dispatch: any) => {
    const { currentPage, sizePage } = useSelector((state: RootState) => state.projectStore);

    const queryString = new URLSearchParams({ 'page[size]': sizePage.toString(), 'page[number]': currentPage.toString() }).toString();
    
    const { data, isLoading, error } : swrResponseType = useSWR(`${endpoints.projects}?${queryString}`, fetcher); 

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