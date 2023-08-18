import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import favoritesReducer from "./reducers/FavoritesSlice"; 
import selectedUserReducer from "./reducers/UserLoggedInSlice"; // Cambiar el nombre del reducer
import postReducer from "./reducers/PostSlice";
import AgendaAndPostsReducer from "./reducers/AgendaAndPostsSlice"; // Importa el nuevo slice que creamos

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    selectedUser: selectedUserReducer,
    post: postReducer,
    agendaAndPosts: AgendaAndPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
