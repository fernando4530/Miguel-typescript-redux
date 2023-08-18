import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface SelectedAgendaUserState {
  selectedUserAgenda: UserData | null;
}

const initialState: SelectedAgendaUserState = {
  selectedUserAgenda: null,
};

export const selectedAgendaUserSlice = createSlice({
  name: "selectedAgendaUser",
  initialState,
  reducers: {
    setSelectedAgendaUser: (state, action: PayloadAction<UserData | null>) => {
      state.selectedUserAgenda = action.payload;
    },
    clearSelectedAgendaUser: (state) => {
      state.selectedUserAgenda = null;
    },
  },
});

export const { setSelectedAgendaUser, clearSelectedAgendaUser } =
  selectedAgendaUserSlice.actions;
export default selectedAgendaUserSlice.reducer;
