import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface UserState {
  selectedAgendaUsers: UserData[];
  currentUser: UserData | null;
}

const initialState: UserState = {
  selectedAgendaUsers: [],
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserData | null>) => {
      if (action.payload !== null) {
        state.currentUser = action.payload;
      }
    },
    addUser: (state, _action: PayloadAction<UserData>) => {
      if (state.currentUser) {
        state.selectedAgendaUsers.push(state.currentUser);
      }
    },
  },
});

export const { setCurrentUser, addUser } = userSlice.actions;
export default userSlice.reducer;
