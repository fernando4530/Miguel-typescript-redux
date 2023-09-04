import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface FavoritesState {
  selectedUser: any;
  favorites: UserData[];
}

const initialState: FavoritesState = {
  favorites: [],
  selectedUser: undefined,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<UserData>) => {
      const existingIndex = state.favorites.findIndex(
        (user) => user.id.value === action.payload.id.value
      );
      if (existingIndex !== -1) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
