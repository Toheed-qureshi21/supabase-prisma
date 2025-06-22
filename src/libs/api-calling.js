import axios from "axios";
import {
  addTodo,
  setAddTodoLoading,
  setError,
  setLoading,
  setTodo,
  setUpdateLoading,
  updateTodo,
} from "./redux/slices/task.slice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export const addTask = async ({ title, description }, dispatch) => {
  try {
    if (!title || !description) {
      return null;
    }
    dispatch(setAddTodoLoading());
    const { data } = await api.post(`/tasks`, { title, description });
   
    dispatch(addTodo(data.data));
    return data.data;
  } catch (error) {
    setError(error?.response?.data?.message);
    console.log(error?.response?.data?.message);
  }
};

export const getAllTodos = async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(`/tasks`);
    dispatch(setTodo(data));
    console.log(data);
  } catch (error) {
     setError(error.response.data.message);
    console.log(error.response.data.message);
  }finally{
    setLoading(false);
  }
}

export const toUpdateTodo = async(id,dispatch,{title,description}) => {
  dispatch(setUpdateLoading())
  try {
    console.log("id form frontend ",id,typeof(id))
    const {data} = await api.put(`/${id}`,{title,description});
    dispatch(updateTodo({id,title,description}));

  } catch (error) {
     setError(error.response.data.message);
    console.log(error?.response?.data?.message);
  }
}
