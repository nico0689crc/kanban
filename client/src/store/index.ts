import { configureStore } from '@reduxjs/toolkit';
import { projectSlice } from '@/store/project/projectSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    projectStore: projectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch