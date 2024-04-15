import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface UserLoggInState {
  UserLoggIn: UserData | null;
}

const initialState: UserLoggInState = {
  UserLoggIn: null,
};

export const UserLoggedIn = createSlice({
  name: "UserLoggedIn",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<UserData | null>) => {
      state.UserLoggIn = action.payload;
    },
    clearSelectedUser: (state) => {
      state.UserLoggIn = null;
    },
    loginUser: (state, action: PayloadAction<UserData>) => {
      state.UserLoggIn = action.payload;
    },
  },
});

export const { setSelectedUser, clearSelectedUser, loginUser } =
  UserLoggedIn.actions;
export default UserLoggedIn.reducer;
