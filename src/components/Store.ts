// store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features_reducerrs/CounterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Agrega aquí otros reducers si los necesitas para funcionalidades adicionales.
  },
});

export default store;
