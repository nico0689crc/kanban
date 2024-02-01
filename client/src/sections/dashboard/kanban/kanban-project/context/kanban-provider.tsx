'use client';

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { KanbanContext } from './kanban-context';
import { Action, ProjectStateType, SectionType, TaskType, Types } from './types';
import { faker } from '@faker-js/faker';
import { useBoolean } from '@/hooks/useBoolean';

const initialState: ProjectStateType = {
  title: '',
  isExistingProject: false,
  sections: []
};

const reducer = (state: ProjectStateType, action: Action) => {
  if (action.type === Types.ADD_SECTION) {
    return {
      ...state,
      sections: [
        ...state.sections?.map(section => ({ ...section, tasks: [ ...section.tasks ] })),
        { 
          uuid: faker.string.uuid(),
          title: action.payload.title, 
          order: ++state.sections.length, 
          tasks: []
        }
      ]
    }
  }

  if (action.type === Types.REMOVE_SECTION) {
    return {
      ...state,
      sections: [
        ...state.sections
          .filter(section => section.uuid !== action.payload.sectionUUID)
          .map((section, index) => ({ ...section, order: ++index})),
      ]
    }
  }

  if (action.type === Types.EDIT_SECTION) {
    return {
      ...state,
      sections: [
        ...state.sections?.map(section => ({ 
          ...section,
          title: action.payload.sectionUUID === section.uuid ? action.payload.title : section.title, 
          tasks: section.tasks.map(task => ({ ...task }))
        })),
      ]
    }
  }

  if (action.type === Types.ADD_TASK_TO_SECTION) {
    return {
      ...state,
      sections: [
        ...state.sections.map(
          section => section.uuid === action.payload.sectionUUID ? ({
            ...section,
            tasks: [ 
              ...section.tasks.map(task => ({ ...task })), 
              { 
                uuid: action.payload.taskUUID, 
                title: action.payload.title,
                description: '', 
                order: ++section.tasks.length, 
                priority: 'low',
                labels: [] 
              } 
            ]
        }) : ({ ...section }))
      ]
    }
  }

  if (action.type === Types.REMOVE_TASK_FROM_SECTION) {
    return {
      ...state,
      sections: [
        ...state.sections.map(section => ({ 
          ...section,
          tasks: section.tasks
                  .filter(task => task.uuid !== action.payload.taskUUID)
                  .map((task, index) => ({ 
                    ...task, 
                    order: ++index 
                  })) 
        })) 
      ]
    }
  }

  if (action.type === Types.EDIT_TASK_FROM_SECTION) {
    return {
      ...state,
      sections: [
        ...state.sections.map(section => ({ 
          ...section,
          tasks: section.tasks.map(task => task.uuid === action.payload.task.uuid ? { ...action.payload.task } : { ...task })
        })) 
      ]
    }
  }

  if (action.type === Types.CHANGE_SECTION_POSITION) {
    const sections: SectionType[] = [
      ...state.sections.map(section => ({
        ...section,
        tasks: section.tasks.map(task => ({ ...task }))
      }))
    ];

    const sectionIndexToMove = sections.findIndex(section => section.uuid === action.payload.sectionUUID);

    const section: SectionType = {
      ...sections[sectionIndexToMove],
      tasks: [
        ...sections[sectionIndexToMove].tasks.map(task => ({ ...task })) 
      ]
    }

    sections.splice(sectionIndexToMove, 1);
    sections.splice(action.payload.position, 0, section);

    return {
      ...state,
      sections: sections.map((section, index) => ({
        ...section,
        order: ++index,
        tasks: section.tasks.map(task => ({ ...task }))
      }))
    };
  }

  if (action.type === Types.CHANGE_TASK_POSITION) {
    const sections: SectionType[] = [
      ...state.sections.map(section => ({
        ...section,
        tasks: section.tasks.map(task => ({ ...task }))
      }))
    ];

    const sectionFromIndex = sections.findIndex(section => section.uuid === action.payload.sectionFromUUID);
    const sectionToIndex = sections.findIndex(section => section.uuid === action.payload.sectionToUUID);
    const taskToMove = sections[sectionFromIndex].tasks.find(task => task.uuid === action.payload.taskUUID);

    if(sectionFromIndex >= 0  && sectionToIndex >= 0 && taskToMove){
      const sectionFrom: SectionType = {
        ...sections[sectionFromIndex],
        tasks: [
          ...sections[sectionFromIndex].tasks.map(task => ({...task}))
        ]
      }

      const sectionTo: SectionType = {
        ...sections[sectionToIndex],
        tasks: [
          ...sections[sectionToIndex].tasks.filter(task => task.uuid !== taskToMove.uuid).map(task => ({...task}))
        ]
      }

      sections.splice(sectionFromIndex, 1);
      sections.splice(sectionFromIndex, 0, {
        ...sectionFrom,
        tasks: [...sectionFrom.tasks.filter(task => task.uuid !== taskToMove.uuid)]
      });

      sections.splice(sectionToIndex, 1);
      sectionTo.tasks.splice(action.payload.position, 0, taskToMove);
      sections.splice(sectionToIndex, 0, {
        ...sectionTo,
        tasks: [...sectionTo.tasks]
      });

      return {
        ...state,
        sections: sections.map((section, index) => ({
          ...section,
          order: ++index,
          tasks: section.tasks.map((task, index) => ({ 
            ...task,
            order: ++index 
          }))
        }))
      }
    }

    return state;
  }

  if (action.type === Types.INITIALIZE_PROJECT) {
    return {
      ...action?.payload?.project,
      isExistingProject: true,
      sections: [
        ...action?.payload?.project?.sections?.map(
          section => ({ 
            ...section, 
            tasks: [ 
              ...section.tasks 
            ] 
          })
        ),
      ]
    }
  }

  return state;
}

export const KanbanProvider =({ children, project } : { children: React.ReactNode, project?: ProjectStateType }) => {
  const toggleDialogTask = useBoolean(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [taskSelected, _setTaskSelected] = useState(null);

  const initialize = useCallback(async () => {
    if(project) {
      dispatch({ type: Types.INITIALIZE_PROJECT, payload: { project } });
    }
  }, [project]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const addSection = useCallback((title: string) => {
    dispatch({ type: Types.ADD_SECTION, payload: { title } });
  },[]);

  const removeSection = useCallback((sectionUUID: string) => {
    dispatch({ type: Types.REMOVE_SECTION, payload: { sectionUUID } });
  },[]);

  const editSection = useCallback((sectionUUID: string, title: string) => {
    dispatch({ type: Types.EDIT_SECTION, payload: { sectionUUID, title } });
  },[]);

  const addTaskToSection = useCallback((taskUUID: string, sectionUUID:string, title: string) => {
    dispatch({ type: Types.ADD_TASK_TO_SECTION, payload: {taskUUID, title, sectionUUID } });
  },[]);

  const removeTaskFromSection = useCallback((taskUUID: string) => {
    dispatch({ type: Types.REMOVE_TASK_FROM_SECTION, payload: { taskUUID } });
  },[]);

  const editTaskFromSection = useCallback((task: TaskType) => {
    dispatch({ type: Types.EDIT_TASK_FROM_SECTION, payload: { task } });
  },[]);

  const setTaskSelected = useCallback((task: any) => {
    _setTaskSelected(task);
  },[]);

  const changeSectionPosition = useCallback((sectionUUID: string, position: number) => {
    dispatch({ type: Types.CHANGE_SECTION_POSITION, payload: { sectionUUID, position } });
  },[]);

  const changeTaskPosition = useCallback((taskUUID: string, sectionFromUUID: string, sectionToUUID: string, position: number) => {
    dispatch({ type: Types.CHANGE_TASK_POSITION, payload: { taskUUID, sectionFromUUID, sectionToUUID, position } });
  },[]);

  const memoizedValue = useMemo(
    () => ({ 
      title: state.title,
      uuid: state.uuid,
      status: state.status,
      sections: state.sections,
      isExistingProject: state.isExistingProject,
      isDialogTaskOpen: toggleDialogTask.value,
      taskSelected: taskSelected,
      dialogTaskOnToggle: toggleDialogTask.onToggle,
      setTaskSelected,
      addSection,
      addTaskToSection,
      removeSection,
      editSection,
      removeTaskFromSection,
      editTaskFromSection,
      changeSectionPosition,
      changeTaskPosition
    }),
    [state.title, state.uuid, state.status, state.sections, state.isExistingProject, toggleDialogTask.value, toggleDialogTask.onToggle, taskSelected, setTaskSelected, addSection, addTaskToSection, removeSection, editSection, removeTaskFromSection, editTaskFromSection, changeSectionPosition, changeTaskPosition]
  );

  return <KanbanContext.Provider value={memoizedValue}>{children}</KanbanContext.Provider>
};