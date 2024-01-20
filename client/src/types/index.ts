type KanbanObjectType  = {
  type: string;
  uuid: string;
  links: {
    self: Record<string, string>
  }
}

export type KanbanProjectType = KanbanObjectType & {
  attributes: {
    uuid: string;
    title: string;
    status: 'active' | 'inactive';
  }
}

export type KanbanProjectsResponseType = {
  link: {
    self: string;
  },
  api: {
    items_total: number
  },
  data: KanbanProjectType[] ;
};