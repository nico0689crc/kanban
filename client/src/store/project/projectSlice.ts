import { KanbanProjectType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type KanbanProjectStateType = {
  projects: KanbanProjectType[] | null,
  isLoading: boolean;
  isEmpty: boolean | null;
  error: string | null;
}

const initialState: KanbanProjectStateType = {
  projects: null,
  isLoading: true,
  isEmpty: null,
  error: null,
}

export const projectSlice = createSlice({
  name: 'kanban_project_store',
  initialState: initialState,
  reducers: {
    resetState(state) {
      state.projects = initialState.projects;
      state.isLoading = initialState.isLoading;
      state.isEmpty = initialState.isEmpty;
      state.error = initialState.error;
    },
    setProjects(state, action: PayloadAction<{ projects: KanbanProjectType[], totalProjects: number }> ) {
      state.projects = action.payload.projects;
      state.isEmpty = action.payload.projects.length === 0;
    },
    addProject(state, action: PayloadAction<{ project: KanbanProjectType }>) {
      state.projects?.unshift({...action.payload.project, sections: [], status: 'active'});
      state.projects?.pop();
    },
    removeProject(state, action: PayloadAction<{ project: KanbanProjectType }>) {
      state.projects?.splice((() => state.projects.findIndex(project => project.uuid === action.payload.project.uuid))(), 1);
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
  setIsLoading, 
  setError,
  setIsEmpty,
  resetState 
} = projectSlice.actions;

export default projectSlice.reducer;