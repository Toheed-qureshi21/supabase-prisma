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
  updateTodoByCompletionMark,
} from "./redux/slices/task.slice";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export const addTask = async ({ title, description }, dispatch,userId) => {
  try {
    if (!title || !description) {
      return null;
    }
    dispatch(setAddTodoLoading());
    const { data } = await api.post(`/tasks`, { title, description,userId});
   
    dispatch(addTodo(data.data));
    // console.log(data.data);
    
    toast.success(data.message);
    return data.data;
  } catch (error) {
    setError(error?.response?.data?.message);
    toast.error((error?.response?.data?.message))

    console.log(error?.response?.data?.message);
  }
};

export const getAllTodos = async (dispatch,userId) => {
  try {
    // dispatch(setLoading(true));
    const {data} = await api.get(`/tasks/${userId}`,{
  headers: {
    "x-user-id": userId
  }
}); 
  console.log(data.data,"in api calling ");
  
    dispatch(setTodo(data.data));
  } catch (error) {
     setError(error.response.data.message);
         toast.error((error?.response?.data?.message))
    console.log(error.response.data.message);
  }finally{
    dispatch(setLoading(false));
  }
}

export const toUpdateTodo = async(id,dispatch,{title,description}) => {
  try {
    dispatch(setUpdateLoading())
    const {data} = await api.put(`/${id}`,{title,description});
    dispatch(updateTodo({id,title,description}));

    toast.success(data.message);
    

  } catch (error) {
     setError(error.response.data.message);
         toast.error((error?.response?.data?.message))
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
      toast.success(data.message)
      return data.message;
    } catch (error) {
          toast.error(error?.response?.data?.message)
      setError(error.response.data.message);
      console.log(error?.response?.data?.message);
    }
}

export const markTodoAsCompleted = async(id,dispatch) => {
  try {
    const {data} = await api.patch(`/${id}`);
    
    return data;
  } catch (error) {
    setError(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    
  }
}

// 2025-06-24 09:39:13.961837+00