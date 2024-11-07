import { useMutation } from "react-query";
import { api } from "../services/api";
import {
  CATEGORY_API,
  CATEGORY_DELETE_API,
  CATEGORY_UPDATE_API,
} from "../constants/constants";

export function useCrudCategory() {
  const getCategories = useMutation(async () => {
    try {
      const response = await api.get(CATEGORY_API);

      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const createNewCategory = useMutation(async (data) => {
    try {
      const response = await api.post(CATEGORY_API, data);

      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const updateCategory = useMutation(async (data) => {
    try {
      const response = await api.patch(CATEGORY_UPDATE_API, data);

      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const deleteCategory = useMutation(async (id) => {
    try {
      const response = await api.delete(`${CATEGORY_DELETE_API}${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  });

  return {
    getCategories,
    createNewCategory,
    updateCategory,
    deleteCategory,
  };
}
