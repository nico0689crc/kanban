type KanbanObjectType  = {
  type: string;
  uuid: string;
  links: {
    self: Record<string, string>
  }
}

type KanbanTaskType = {
  order: number;
  description: string;
  labels: null | string;
  priority: 'low' | 'medium' | 'height';
  status: 'active' | 'inactive';
  title: string;
  uuid: string;
} 

type KanbanSectionType = {
  order: number;
  status: string;
  tasks: KanbanTaskType[];
  title: string;
  uuid: string;
} 

export type KanbanProjectType = {
  attributes: {
    uuid: string;
    title: string;
    status: 'active' | 'inactive';
    createdAt: string;
    sections: KanbanSectionType[]
  }
} 

export type KanbanProjectsResponseType = KanbanObjectType & KanbanProjectType;