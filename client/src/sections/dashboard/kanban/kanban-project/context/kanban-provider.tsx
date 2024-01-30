'use client';

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { KanbanContext } from './kanban-context';
import { Action, ProjectStateType, SectionType, TaskType, Types } from './types';
import { faker } from '@faker-js/faker';
import { useBoolean } from '@/hooks/useBoolean';

const initialState: ProjectStateType = {
  title: 'Nostrud ea Lorem consequat officia amet eiusmod.',
  sections: [{
    uuid: '1',
    title: 'Ex enim excepteur anim eiusmod dolore cupidatat.',
    order: 1,
    createdAt: '2024-01-22T11:51:53.000Z',
    tasks: [
      {
        uuid: '85uq82n3iprbx5q43qb9bcie5hv0tiwz61u9qtqwjn8tqgybdi',
        title: 'Cillum voluptate aliqua id reprehenderit.',
        description: 'Eiusmod id id cillum Lorem consectetur ipsum mollit enim deserunt aute enim. Aliqua consequat anim non incididunt nostrud occaecat culpa consequat velit. Velit sunt Lorem cupidatat ex laboris Lorem elit id velit ad nulla sit nostrud. Do excepteur anim nisi ad Lorem in. Ad deserunt duis ea sint laboris occaecat amet anim eu culpa cillum excepteur. Do laboris aliqua reprehenderit dolor nulla culpa consectetur eiusmod eu. Consectetur eiusmod proident aute nostrud exercitation reprehenderit id enim enim elit anim veniam.2 Eiusmod id id cillum Lorem consectetur ipsum mollit enim deserunt aute enim. Aliqua consequat anim non incididunt nostrud occaecat culpa consequat velit. Velit sunt Lorem cupidatat ex laboris Lorem elit id velit ad nulla sit nostrud. Do excepteur anim nisi ad Lorem in. Ad deserunt duis ea sint laboris occaecat amet anim eu culpa cillum excepteur. Do laboris aliqua reprehenderit dolor nulla culpa consectetur eiusmod eu. Consectetur eiusmod proident aute nostrud exercitation reprehenderit id enim enim elit anim veniam.2 Eiusmod id id cillum Lorem consectetur ipsum mollit enim deserunt aute enim. Aliqua consequat anim non incididunt nostrud occaecat culpa consequat velit. Velit sunt Lorem cupidatat ex laboris Lorem elit id velit ad nulla sit nostrud. Do excepteur anim nisi ad Lorem in. Ad deserunt duis ea sint laboris occaecat amet anim eu culpa cillum excepteur. Do laboris aliqua reprehenderit dolor nulla culpa consectetur eiusmod eu. Consectetur eiusmod proident aute nostrud exercitation reprehenderit id enim enim elit anim veniam.2',
        order: 1,
        priority: 'hight',
        createdAt: '2024-01-22T11:51:53.000Z',
        labels: ['casa', 'automovil', 'ReactJs', 'Javascript']
      },
      {
        uuid: 'aajiqkpaquruv8ybht2e6tyj84adgr47lqrlezcu9tphldbpsq',
        title: 'Ex anim eiusmod proident labore proident quis aliqua elit enim.',
        description: 'Cillum eu voluptate Lorem tempor sunt aute exercitation excepteur sint culpa laboris. Exercitation laboris incididunt nostrud qui officia irure veniam labore aliquip fugiat laboris cillum. Minim commodo aliqua deserunt dolor.',
        order: 2,
        priority: 'low',
        createdAt: '2024-01-22T11:51:53.000Z',
        labels: ['casa', 'automovil', 'ReactJs', 'Javascript']
      },
      {
        uuid: 'wtk99sc33j5l9bhzao58wgur94c0qccn5cs3wmvqmj0te53svr',
        title: 'Ad cupidatat aute nulla nisi labore qui laborum ipsum quis.',
        description: 'Ut excepteur voluptate ad laboris nulla ad dolor anim. Dolor aliqua qui nostrud labore irure laborum. Dolor tempor do ad aute consectetur minim mollit sunt sunt aliquip dolor. Do nisi cupidatat consequat labore cupidatat velit consequat consectetur. Irure cillum Lorem id minim in adipisicing ea proident aliqua cillum culpa qui ex.',
        order: 3,
        priority: 'medium',
        createdAt: '2024-01-22T11:51:53.000Z',
        labels: ['casa', 'automovil', 'ReactJs', 'Javascript']
      },
    ]
  },{
    uuid: '2',
    title: 'Consectetur elit Lorem ea pariatur culpa.',
    order: 2,
    createdAt: '2024-01-22T11:51:53.000Z',
    tasks: [
      {
        uuid: 'u5s1j94w9nx80ncgm587glaakxytemmdnz9sg9homnfuzbnu6n',
        title: 'Tempor elit id do aute in.',
        description: 'Quis consequat aliquip quis id sint est. Nisi adipisicing ipsum aliquip sint irure mollit occaecat laboris. Mollit laborum excepteur Lorem consectetur est eiusmod in. Quis consequat aliquip quis id sint est. Nisi adipisicing ipsum aliquip sint irure mollit occaecat laboris. Mollit laborum excepteur Lorem consectetur est eiusmod in. Quis consequat aliquip quis id sint est. Nisi adipisicing ipsum aliquip sint irure mollit occaecat laboris. Mollit laborum excepteur Lorem consectetur est eiusmod in.',
        order: 1,
        priority: 'hight',
        createdAt: '2024-01-22T11:51:53.000Z',
        labels: ['casa', 'automovil', 'ReactJs', 'Javascript']
      },
      {
        uuid: 'l91u5qvy9a4ytj0uuwsdifn8s6a2o1bax0lsxx365jbhvyunl7',
        title: 'Nostrud cupidatat in anim deserunt qui exercitation aute esse sit qui esse.',
        description: 'Duis cillum tempor mollit occaecat proident qui nisi voluptate proident non pariatur. Nulla qui dolore nisi adipisicing eiusmod incididunt veniam cillum. Aute in amet excepteur tempor. Fugiat deserunt adipisicing velit eu non cillum consectetur fugiat adipisicing sunt reprehenderit incididunt. Culpa culpa voluptate nulla enim incididunt amet. Dolor aliqua laboris laboris exercitation magna velit. Cupidatat labore non adipisicing velit cupidatat ullamco dolor dolore quis velit id labore.',
        order: 2,
        priority: 'hight',
        createdAt: '2024-01-22T11:51:53.000Z',
        labels: ['casa', 'automovil', 'ReactJs', 'Javascript']
      },
      {
        uuid: 'qz6ev9xu6m1su16xo8rx201ziw45zuvsnawv9al5dr28qvwx44',
        title: 'Reprehenderit qui culpa aliqua tempor qui quis veniam pariatur adipisicing sunt eiusmod reprehenderit sint.',
        order: 3,
        priority: 'medium',
        createdAt: '2024-01-22T11:51:53.000Z',
        labels: ['casa', 'automovil', 'ReactJs', 'Javascript']
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
          order: ++state.sections.length, 
          tasks: [],
          createdAt: '2024-01-22T11:51:53.000Z'
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
              { uuid: faker.string.uuid(), title: action.payload.title, order: ++section.tasks.length, priority: 'low' } 
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
                  .map((task, index) => ({ ...task, order: ++index })) 
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
          tasks: section.tasks.map(task => task.uuid === action.payload.task.uuid ? { ...action.payload.task } : {... task })
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
          tasks: section.tasks.map(task => ({ ...task }))
        }))
      }
    }

    return state;
  }

  return state;
}

export const KanbanProvider =({ children } : { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [taskSelected, _setTaskSelected] = useState(null);
  const toggleDialogTask = useBoolean(false);

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
    [state.title, state.uuid, state.status, state.sections, toggleDialogTask.value, toggleDialogTask.onToggle, taskSelected, setTaskSelected, addSection, addTaskToSection, removeSection, editSection, removeTaskFromSection, editTaskFromSection, changeSectionPosition, changeTaskPosition]
  );

  return <KanbanContext.Provider value={memoizedValue}>{children}</KanbanContext.Provider>
};