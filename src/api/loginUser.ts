import axios from "axios";
import { UserLogin } from "../types/User";
import { LOGIN_USER } from "../constants/endpoints";

export const loginUser = async (dataUser: UserLogin) => {
  const formData = new FormData();
  formData.append("email", dataUser.email);
  formData.append("password", dataUser.password);

  try {
    const { data } = await axios.post(LOGIN_USER, formData);
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
