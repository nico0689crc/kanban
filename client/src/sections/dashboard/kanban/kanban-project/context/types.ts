/* eslint-disable no-unused-vars */
export type TaskType = {
  title: string,
  uuid?: string,
  description?: string,
  status?: 'active' | 'inactive',
  priority?: string,
  labels?: string[],
  order?: number,
  createdAt?: string,
  updatedAt?: string
}

export type SectionType = {
  title: string,
  uuid: string,
  status?: 'active' | 'inactive',
  order: number,
  tasks: TaskType[],
  createdAt: string
}

export type ProjectStateType = {
  title: string | null,
  uuid?: string,
  status?: 'active' | 'inactive',
  sections: SectionType[],
}

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key; } : { type: Key; payload: M[Key]; };
};

export type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

export enum Types {
  ADD_SECTION = 'ADD_SECTION',
  REMOVE_SECTION = 'REMOVE_SECTION',
  EDIT_SECTION = 'EDIT_SECTION',
  ADD_TASK_TO_SECTION = 'ADD_TASK_TO_SECTION',
  REMOVE_TASK_FROM_SECTION = 'REMOVE_TASK_FROM_SECTION',
  EDIT_TASK_FROM_SECTION = 'EDIT_TASK_FROM_SECTION',
  CHANGE_SECTION_POSITION = 'CHANGE_SECTION_POSITION',
  CHANGE_TASK_POSITION = 'CHANGE_TASK_POSITION'
}


export type Payload = {
  [Types.ADD_SECTION]: {
    title: string;
  };
  [Types.REMOVE_SECTION]: {
    sectionUUID: string;
  };
  [Types.EDIT_SECTION]: {
    title: string;
    sectionUUID: string;
  };
  [Types.ADD_TASK_TO_SECTION]: {
    title: string;
    sectionUUID: string;
  };
  [Types.REMOVE_TASK_FROM_SECTION]: {
    taskUUID: string;
  };
  [Types.EDIT_TASK_FROM_SECTION]: {
    task: TaskType;
  };
  [Types.CHANGE_SECTION_POSITION]: {
    sectionUUID: string;
    position: number;
  };
  [Types.CHANGE_TASK_POSITION]: {
    taskUUID: string;
    sectionFromUUID: string;
    sectionToUUID: string;
    position: number;
  };
};

export type ProjectContextType = ProjectStateType & {
  isDialogTaskOpen: boolean,
  taskSelected: TaskType | null,
  dialogTaskOnToggle: () => void,
  setTaskSelected: (task: TaskType) => void,
  addSection: (title: string) => void;
  removeSection: (sectionUUID: string) => void;
  editSection: (sectionUUID: string, title: string) => void;
  addTaskToSection: (sectionUUID: string, title: string) => void;
  removeTaskFromSection: (taskUUID: string) => void;
  editTaskFromSection: (task: TaskType) => void;
  changeSectionPosition: (sectionUUID: string, position: number) => void;
  changeTaskPosition: (taskUUID: string, sectionFromUUID: string, sectionToUUID: string, position: number) => void;
}