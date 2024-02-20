import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../slices/allReducers';
import { api } from 'redux/features/apiSlice'


const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      ...allReducers,
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(api.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
