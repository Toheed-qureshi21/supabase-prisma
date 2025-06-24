import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  loading:false,
  erorr:null  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state){
        state.loading = true
    },
    setError(state,action){
        state.loading = false
        state.loading = false
    },
    setUser(state, action) {
      state.user = action.payload;
       state.loading = false
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser,setError,setLoading } = userSlice.actions;
export default userSlice.reducer;
