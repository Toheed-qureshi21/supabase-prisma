import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading:false,
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
        state.todos.unshift(action.payload);
         state.addLoading = false;
        state.error = null;
    },
    updateTodo(state,action){
        const {id,title,description} = action.payload;
        const todo = state.todos.find((t)=>t.id===id);
        if (todo) {
            todo.title = title;
            todo.description = description;
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
    }
  },
});
export const {addTodo,setAddTodoLoading,updateTodo,setUpdateLoading,deleteTodo,setDeleteLoading,toggleCompletionTodo,setError,setLoading,setTodo} = taskSlice.actions;

export default taskSlice.reducer;
