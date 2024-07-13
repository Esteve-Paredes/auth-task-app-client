import axios from "axios";
import { CREATE_USER } from "../constants/endpoints";
import { UserRegister } from "../types/User";

export const createUser = async (dataUser: UserRegister) => {
  const formData = new FormData();
  formData.append("name", dataUser.name);
  formData.append("email", dataUser.email);
  formData.append("password", dataUser.password);

  try {
    return await axios.post(CREATE_USER, formData);
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
