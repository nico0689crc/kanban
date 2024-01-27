export type TaskType = {
  title: string,
  uuid?: string,
  description?: string,
  status?: 'active' | 'inactive',
  priority?: 'low' | 'medium' | 'hight',
  labels?: string,
  order: number,
  created_at?: string,
  updated_at?: string
}

export type SectionType = {
  title: string,
  uuid: string,
  status?: 'active' | 'inactive',
  order: number,
  tasks: TaskType[]
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
  ADD_TASK_TO_SECTION = 'ADD_TASK_TO_SECTION',
  REMOVE_SECTION = 'REMOVE_SECTION',
}


export type Payload = {
  [Types.ADD_SECTION]: {
    title: string;
  };
  [Types.REMOVE_SECTION]: {
    sectionUUID: string;
  };
  [Types.ADD_TASK_TO_SECTION]: {
    title: string;
    sectionUUID: string;
  };
};

export type ProjectContextType = ProjectStateType & {
  addSection: (title: string) => void;
  addTaskToSection: (sectionUUID: string, title: string) => void;
  removeSection: (sectionUUID: string) => void;
}