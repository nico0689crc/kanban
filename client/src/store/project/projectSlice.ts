import { KanbanProjectType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type KanbanProjectStateType = {
  projects: KanbanProjectType[] | null,
  currentPage: number;
  totalProjects: number;
  sizePage: number;
  isLoading: boolean;
  isEmpty: boolean | null;
  totalPages: number | null;
  error: string | null;
}

const initialState: KanbanProjectStateType = {
  projects: null,
  totalProjects: 0,
  currentPage: 1,
  sizePage: 6,
  isLoading: true,
  totalPages: null,
  isEmpty: null,
  error: null,
}

export const projectSlice = createSlice({
  name: 'kanban_project_store',
  initialState: initialState,
  reducers: {
    setProjects(state, action: PayloadAction<{ projects: KanbanProjectType[], totalProjects: number }> ) {
      state.projects = action.payload.projects;
      state.isEmpty = action.payload.projects.length === 0;
      state.totalProjects = action.payload.totalProjects;
      state.totalPages = Math.ceil(state.totalProjects / state.sizePage)
    },
    addProject(state, action: PayloadAction<{ project: KanbanProjectType }>) {
      state.projects?.unshift({...action.payload.project, sections: [], status: 'active'});
      state.projects?.pop();
      state.totalProjects++;

      state.totalPages = Math.ceil(state.totalProjects / state.sizePage)
    },
    removeProject(state, action: PayloadAction<{ project: KanbanProjectType }>) {
      state.projects?.splice((() => state.projects.findIndex(project => project.uuid === action.payload.project.uuid))(), 1);
    },
    setProjectsTotalPage(state, action: PayloadAction<{ totalPages: number }>) {
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
      state.currentPage = action.payload.currentPage;
    },
    setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading;
    },
    setIsEmpty(state, action: PayloadAction<{ isEmpty: boolean }>) {
      state.isEmpty = action.payload.isEmpty;
    },
    setError(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
    },
  },
});

export const { 
  setProjects, 
  addProject, 
  removeProject, 
  setProjectsTotalPage, 
  setCurrentPage, 
  setIsLoading, 
  setError,
  setIsEmpty 
} = projectSlice.actions;

export default projectSlice.reducer;