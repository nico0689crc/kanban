import { DataStore } from '@aws-amplify/datastore';
import { Projects } from '@/models';
import { ProjectType } from "@/types";

export const create = async (projectData: ProjectType) => {
  return await DataStore.save(
    new Projects(projectData)
  );
};