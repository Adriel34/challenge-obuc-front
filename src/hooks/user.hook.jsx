import { useMutation } from "react-query";
import { api } from "../services/api";
import { GET_USER_API } from "../constants/constants";

export function useCrudUser() {
  const getUser = useMutation(async () => {
    try {
      const response = await api.get(GET_USER_API);

      return response;
    } catch (error) {
      console.log(error);
    }
  });

  return {
    getUser,
  };
}
