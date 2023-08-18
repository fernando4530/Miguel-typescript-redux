// userLoggedInSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface SelectedUserState {
  selectedUserLogged: UserData | null;
  selectedUserPhoto: string | null;
}

const initialState: SelectedUserState = {
  selectedUserLogged: null,
  selectedUserPhoto: null,
};

export const userLoggedInSlice = createSlice({
  name: "userLoggedIn",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<UserData | null>) => {
      state.selectedUserLogged = action.payload;
      state.selectedUserPhoto = action.payload?.picture.large || null;
    },
  },
});

export const { setSelectedUser } = userLoggedInSlice.actions;
export default userLoggedInSlice.reducer;
