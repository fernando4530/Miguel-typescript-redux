import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // Otros reducers aquí si los tienes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
