import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import favoritesReducer from "./reducers/FavoritesSlice"; 
import selectedUserReducer from "./reducers/UserLoggedInSlice"; // Cambiar el nombre del reducer
import postReducer from "./reducers/PostSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    selectedUser: selectedUserReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
