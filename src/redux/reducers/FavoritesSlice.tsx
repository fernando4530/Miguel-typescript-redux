import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface FavoritesState {
  favorites: UserData[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<UserData>) => {
      const existingIndex = state.favorites.findIndex(
        (user) => user.id === action.payload.id
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
