import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/RandomUserSlice";
import favoritesReducer from "./reducers/FavoritesSlice"; 
import selectedUserReducer from "./reducers/UserLoggedInSlice"; // Cambiar el nombre del reducer
import postReducer from "./reducers/PostSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    UserLoggin: selectedUserReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;