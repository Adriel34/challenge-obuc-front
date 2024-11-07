import { useMutation } from "react-query";
import { api } from "../services/api";
import { CATEGORY_API, CREATE_NEW_TASK_API, DELETE_TASK_API, GET_TASKS_BY_USER_API, UPDATE_TASK_API } from "../constants/constants";



export function useCrudTask() {
  
    const getTasksByUser = useMutation(async (id) => {
      try {GET_TASKS_BY_USER_API
        const response = await api.get(`${GET_TASKS_BY_USER_API}${id}`);
  
        return response;
      } catch (error) {
        console.log(error);
      }
    });

    const getCategories = useMutation(async (i) => {
        try {
          const response = await api.get(CATEGORY_API);
    
          return response;
        } catch (error) {
          console.log(error);
        }
      });
  
    const createNewTask = useMutation(async (data) => {
      try {
        const response = await api.post(CREATE_NEW_TASK_API, data);
  
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    });
  
    const updateTask = useMutation(async (data) => {
      try {
        const response = await api.patch(UPDATE_TASK_API, data);
  
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);

      }
    });
  
    const deleteTask = useMutation(async (id) => {
      try {
        const response = await api.delete(`${DELETE_TASK_API}${id}`);
  
      return response;
      } catch (error) {
        console.log(error);
      }
    });
  
    return {
      getTasksByUser,
      getCategories,
      createNewTask,
      updateTask,
      deleteTask,
    };
  }