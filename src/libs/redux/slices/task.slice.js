import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading:true,
  addLoading: false,
  updateLoading:false,
  deleteLoading:false,
  error: null,
};
const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setAddTodoLoading(state) {
      state.addLoading = true;
    },
    setLoading(state,action){
      state.loading = action.payload
    },
    setUpdateLoading(state){
        state.updateLoading = true;
    },
    setDeleteLoading(state){
        state.deleteLoading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.addLoading = false;
      state.deleteLoading = false;
      state.updateLoading = false;
      
    },
    setTodo(state,action){
      state.todos = action.payload;
    },
    addTodo(state,action){
      const data = action.payload
        state.todos.unshift({...data,isUpdated:false,updated_at:null});
         state.addLoading = false;
        state.error = null;
    },
    updateTodo(state,action){
        const {id,title,description,updated_at} = action.payload;
        const todo = state.todos.find((t)=>t.id===id);
        if (todo) {
            todo.title = title;
            todo.description = description;
            todo.isUpdated = true;
            todo.updated_at = updated_at
        }
        state.updateLoading = false;
    },
    deleteTodo(state,action){
        state.todos = state.todos.filter((todo)=>todo.id !== action.payload);
        state.deleteLoading = false;
        },
    toggleCompletionTodo(state,action){
        const todo = state.todos.find((todo)=>todo.id === action.payload);
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    },
    updateTodoByCompletionMark(state, action) {
  const updatedTodo = action.payload;
  const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
  if (index !== -1) {
    state.todos[index] = updatedTodo;
  }
}

  },
});
export const {addTodo,updateTodoByCompletionMark,setAddTodoLoading,updateTodo,setUpdateLoading,deleteTodo,setDeleteLoading,toggleCompletionTodo,setError,setLoading,setTodo} = taskSlice.actions;

export default taskSlice.reducer;
