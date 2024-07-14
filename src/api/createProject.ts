import axios from "axios";
import { ProjectDTO } from "../types/dto/projects-dto";
import { CREATE_PROJECTS } from "../constants/endpoints";

export const createProject = async (dataProject: ProjectDTO) => {
  const formData = new FormData();
  formData.append("title", dataProject.title);
  formData.append("description", dataProject.description);

  try {
    return await axios.post(CREATE_PROJECTS, formData);
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
