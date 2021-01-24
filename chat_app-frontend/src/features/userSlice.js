import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    openDialogUpload: false,
  },
  reducers: {
    LOGIN_USER: (state, action) => {
      state.user = action.payload;
    },
    LOGOUT_USER: (state) => {
      state.user = null;
    },
    SET_UPLOAD_TRUE: (state) => {
      state.openDialogUpload = true;
    },
    SET_UPLOAD_FALSE: (state) => {
      state.openDialogUpload = false;
    },
  },
});

export const {
  LOGIN_USER,
  LOGOUT_USER,
  SET_UPLOAD_TRUE,
  SET_UPLOAD_FALSE,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectDialog = (state) => state.user.openDialogUpload;

export default userSlice.reducer;
