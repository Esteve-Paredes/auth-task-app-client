import axios from "axios";
import { DELETE_PROJECTS } from "../constants/endpoints";

export const deleteProject = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(DELETE_PROJECTS + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
