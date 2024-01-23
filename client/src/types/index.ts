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
  uuid: string;
  title: string;
  createdAt: string;
  status: 'active' | 'inactive';
  sections: KanbanSectionType[]
}

export type KanbanProjectsResponseIndividualType = {
  links: {
    self: string
  },
  data: {
    type: string,
    uuid: string,
    attributes: KanbanProjectType
  }
}

export type KanbanProjectsResponseCollectionType = {
  links: {
    first?: string,
    previous?: string,
    self: string,
    next?: string,
    last?: string,
  },
  api: {
    items_total: number,
    total_pages: number
  },
  data: {
    type: string,
    uuid: string,
    attributes: KanbanProjectType,
    links: {
      self: string
    }
  }[]
}