import { KanbanProjectType, KanbanProjectsResponseType } from "@/types";
import axios, { endpoints, fetcher } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export const useFetchProjects = () => {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.projects, fetcher, {}); 

  const memoizedValue = useMemo(
    () => ({
      projects: data?.data as KanbanProjectType[],
      projectsLoading: isLoading,
      projectsError: error,
      projectsValidating: isValidating,
      projectsEmpty: !isLoading && !data?.data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}