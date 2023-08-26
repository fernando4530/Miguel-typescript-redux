import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes"; // Importa la interfaz UserData

interface UserState {
  selectedAgendaUsers: UserData[];
  currentUser: UserData | null;
  publications: Record<string, string[]>; // Objeto para mantener las publicaciones de cada usuario
}

const initialState: UserState = {
  selectedAgendaUsers: [],
  currentUser: null,
  publications: {},
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
        state.selectedAgendaUsers.push(state.currentUser);
      }
    },
    addPublication: (state, action: PayloadAction<{ userId: string; publication: string }>) => {
      const { userId, publication } = action.payload;
      if (!state.publications[userId]) {
        state.publications[userId] = [];
      }
      state.publications[userId].push(publication);
    },
  },
});

export const { setCurrentUser, addUser, addPublication } = userSlice.actions;
export default userSlice.reducer;