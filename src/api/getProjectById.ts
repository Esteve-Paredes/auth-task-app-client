import axios from "axios";
import { GET_PROJECTS } from "../constants/endpoints";

export const getProjectsById = async (id: number) => {
  try {
    const { data } = await axios.get(GET_PROJECTS + `/${id}`);
    return data;
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
