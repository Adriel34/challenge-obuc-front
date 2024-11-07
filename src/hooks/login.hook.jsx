import { useMutation } from "react-query";
import { CREATE_USER_API, LOGIN_AUTH_API } from "../constants/constants";
import { api } from "../services/api";



export function useLogin() {
  const signIn = useMutation(async ({ email, password }) => {
    try {
      const response = await api.post(LOGIN_AUTH_API, {
        email,
        password,
      });

      if (response?.status === 200) {
        const token = response?.data?.access_token;

        localStorage.setItem("ACCESS_TOKEN", token);
        window.location.href = "/";
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.log(error);
    }
  });

  const createUser = useMutation(async (data) => {
    try {
      const response = await api.post(CREATE_USER_API, data);

      return response;
    } catch (error) {
      console.log(error);
    }
  });

  return {
    signIn,
    createUser,
  };
}