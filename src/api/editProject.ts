import axios from "axios";
import { UPDATE_PROJECTS } from "../constants/endpoints";
import { ProjectsEntity } from "../types/projectsEntity";

export const editProject = async (dataProject: ProjectsEntity) => {
  const formData = {
    title: dataProject.title,
    description: dataProject.description,
  };

  try {
    return await axios.put(UPDATE_PROJECTS + `/${dataProject.id}`, formData);
  } catch (error) {
    //validando si es una instancia de AxiosError
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.response);
      return null;
    }

    console.error("Error :", error);
    return null;
  }
};
