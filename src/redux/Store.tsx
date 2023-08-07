import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import favoritesReducer from "./reducers/FavoritesSlice"; // Importa el nuevo slice

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
