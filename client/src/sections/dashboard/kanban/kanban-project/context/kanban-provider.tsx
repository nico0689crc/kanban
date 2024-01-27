'use client';

import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { KanbanContext } from './kanban-context';
import { Action, ProjectStateType, Types } from './types';
import { faker } from '@faker-js/faker';

const initialState: ProjectStateType = {
  title: 'Nostrud ea Lorem consequat officia amet eiusmod.',
  sections: [{
    uuid: '1',
    title: 'Ex enim excepteur anim eiusmod dolore cupidatat.',
    order: 1,
    tasks: [
      {
        title: 'Ullamco minim qui veniam culpa et labore cupidatat reprehenderit laboris mollit.',
        order: 1
      },
      {
        title: 'Cupidatat in eiusmod amet adipisicing nisi enim.',
        order: 2
      },
      {
        title: 'Nostrud exercitation nisi id sunt.',
        order: 3
      },
    ]
  },{
    uuid: '2',
    title: 'Consectetur elit Lorem ea pariatur culpa.',
    order: 2,
    tasks: [
      {
        title: 'Ullamco minim qui veniam culpa et labore cupidatat reprehenderit laboris mollit.',
        order: 1
      },
      {
        title: 'Cupidatat in eiusmod amet adipisicing nisi enim.',
        order: 2
      },
      {
        title: 'Nostrud exercitation nisi id sunt.',
        order: 3
      },
    ]
  }]
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
          order: state.sections.length++, 
          tasks: [] 
        }
      ]
    }
  }

  if (action.type === Types.REMOVE_SECTION) {
    console.log('action.payload.sectionUUID', action.payload.sectionUUID);
    
    return {
      ...state,
      sections: [
        ...state.sections?.filter(section => {
          console.log(section.uuid);
          console.log(action.payload.sectionUUID);
          
          return section.uuid !== action.payload.sectionUUID;
        }),
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
              ...section.tasks, 
              { uuid: faker.string.uuid(), title: action.payload.title, order: section.tasks.length++ } 
            ]
        }) : ({ ...section }))
      ]
    }
  }

  return state;
}

export const KanbanProvider =({ children } : { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {}, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const addSection = useCallback((title: string) => {
    dispatch({ type: Types.ADD_SECTION, payload: { title } });
  },[]);

  const removeSection = useCallback((sectionUUID: string) => {
    dispatch({ type: Types.REMOVE_SECTION, payload: { sectionUUID } });
  },[]);

  const addTaskToSection = useCallback((sectionUUID: string, title: string) => {
    dispatch({ type: Types.ADD_TASK_TO_SECTION, payload: { title, sectionUUID } });
  },[]);


  const memoizedValue = useMemo(
    () => ({ 
      title: state.title,
      uuid: state.uuid,
      status: state.status,
      sections: state.sections,
      addSection,
      addTaskToSection,
      removeSection
    }),
    [addSection, addTaskToSection, removeSection, state.sections, state.status, state.title, state.uuid]
  );

  return <KanbanContext.Provider value={memoizedValue}>{children}</KanbanContext.Provider>
};