import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes"; // Importa la interfaz UserData

interface UserState {
  selectedUsers: UserData[];
  currentUser: UserData | null;
}

const initialState: UserState = {
  selectedUsers: [],
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserData | null>) => {
      // No actualizamos el estado si el payload es null
      if (action.payload !== null) {
        state.currentUser = action.payload;
      }
    },
    addUser: (state, _action: PayloadAction<UserData>) => {
      if (state.currentUser) {
        state.selectedUsers.push(state.currentUser);
      }
    },
  },
});

export const { setCurrentUser, addUser } = userSlice.actions;
export default userSlice.reducer;
