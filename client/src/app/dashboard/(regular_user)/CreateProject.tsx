'use client'

import { Button } from "@mui/material";
import { createProject } from "@/data";
import { ProjectEnums, Users } from "@/models";
import { Auth } from "aws-amplify";

const CreateProject = () => {
  

  const onCreatProjectHandler = async () => { 
    // await createProject({
    //   title: "Project",
    //   description: "Ea consectetur aliquip in ex nisi qui.",
    //   status: ProjectEnums.ACTIVE,
    //   id: "asdsaasd",
    //   projectsProjectUserId: '',
    //   ProjectUser:
    // });
  }

  return (
    <Button onClick={onCreatProjectHandler}>Crear Proyecto</Button>
  )
}

export default CreateProject