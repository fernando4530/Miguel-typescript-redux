import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/RandomUserSlice";
import favoritesReducer from "./reducers/FavoritesSlice";
import selectedUserReducer from "./reducers/UserLoggedInSlice";
import postReducer from "./reducers/PostSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    loggInUser: selectedUserReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
