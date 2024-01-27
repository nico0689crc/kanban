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
        description: 'Eiusmod id id cillum Lorem consectetur ipsum mollit enim deserunt aute enim. Aliqua consequat anim non incididunt nostrud occaecat culpa consequat velit. Velit sunt Lorem cupidatat ex laboris Lorem elit id velit ad nulla sit nostrud. Do excepteur anim nisi ad Lorem in. Ad deserunt duis ea sint laboris occaecat amet anim eu culpa cillum excepteur. Do laboris aliqua reprehenderit dolor nulla culpa consectetur eiusmod eu. Consectetur eiusmod proident aute nostrud exercitation reprehenderit id enim enim elit anim veniam.',
        order: 1
      },
      {
        title: 'Cupidatat in eiusmod amet adipisicing nisi enim.',
        description: 'Cillum eu voluptate Lorem tempor sunt aute exercitation excepteur sint culpa laboris. Exercitation laboris incididunt nostrud qui officia irure veniam labore aliquip fugiat laboris cillum. Minim commodo aliqua deserunt dolor.',
        order: 2
      },
      {
        title: 'Nostrud exercitation nisi id sunt.',
        description: 'Ut excepteur voluptate ad laboris nulla ad dolor anim. Dolor aliqua qui nostrud labore irure laborum. Dolor tempor do ad aute consectetur minim mollit sunt sunt aliquip dolor. Do nisi cupidatat consequat labore cupidatat velit consequat consectetur. Irure cillum Lorem id minim in adipisicing ea proident aliqua cillum culpa qui ex.',
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
        description: 'Quis consequat aliquip quis id sint est. Nisi adipisicing ipsum aliquip sint irure mollit occaecat laboris. Mollit laborum excepteur Lorem consectetur est eiusmod in.',
        order: 1
      },
      {
        title: 'Cupidatat in eiusmod amet adipisicing nisi enim.',
        description: 'Duis cillum tempor mollit occaecat proident qui nisi voluptate proident non pariatur. Nulla qui dolore nisi adipisicing eiusmod incididunt veniam cillum. Aute in amet excepteur tempor. Fugiat deserunt adipisicing velit eu non cillum consectetur fugiat adipisicing sunt reprehenderit incididunt. Culpa culpa voluptate nulla enim incididunt amet. Dolor aliqua laboris laboris exercitation magna velit. Cupidatat labore non adipisicing velit cupidatat ullamco dolor dolore quis velit id labore.',
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
    return {
      ...state,
      sections: [
        ...state.sections?.filter(section => section.uuid !== action.payload.sectionUUID),
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
          tasks: [...section.tasks] 
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

  const editSection = useCallback((sectionUUID: string, title: string) => {
    dispatch({ type: Types.EDIT_SECTION, payload: { sectionUUID, title } });
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
      removeSection,
      editSection
    }),
    [addSection, addTaskToSection, removeSection, editSection, state.sections, state.status, state.title, state.uuid]
  );

  return <KanbanContext.Provider value={memoizedValue}>{children}</KanbanContext.Provider>
};