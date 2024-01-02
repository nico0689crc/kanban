import { ProjectEnums, LazyUsers } from "@/models";

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  status: ProjectEnums | keyof typeof ProjectEnums;
  projectsProjectUserId: string;
  ProjectUser: LazyUsers
}