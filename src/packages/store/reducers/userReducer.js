import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    email: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;