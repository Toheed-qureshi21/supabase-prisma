import axios from "axios";
import {
  addTodo,
  deleteTodo,
  setAddTodoLoading,
  setDeleteLoading,
  setError,
  setLoading,
  setTodo,
  setUpdateLoading,
  toggleCompletionTodo,
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
  try {
    dispatch(setUpdateLoading())
    const {data} = await api.put(`/${id}`,{title,description});
    dispatch(updateTodo({id,title,description}));

  } catch (error) {
     setError(error.response.data.message);
    console.log(error?.response?.data?.message);
  }
}
// function to call api to delete todo with a delete requesst 
// api route will be ---> `/$id` with delete request
export const toDeleteTodo = async(id,dispatch) => {
    try {
      dispatch(setDeleteLoading());
      const {data} = await api.delete(`/${id}`);
      dispatch(deleteTodo(id));
      console.log(data);
      return data.message;
    } catch (error) {
      setError(error.response.data.message);
      console.log(error?.response?.data?.message);
    }
}

export const markTodoAsCompleted = async(id,dispatch) => {
  try {
    const {data} = api.patch(`/${id}`);
    dispatch(toggleCompletionTodo(id));
    console.log(data);
    return data;
  } catch (error) {
    setError(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    
  }
}

export const signup = async(formData) => {
  try {
    if (!formData.email || !formData.password || !formData.user_name ) {
      return;  
    }
    const {data} = await api.post(`/signup`,formData);
    console.log("Signup frontend calling api ",data);
    return data.message;
  } catch (error) {
    console.log(error.response.data.message);
    
  }
}
