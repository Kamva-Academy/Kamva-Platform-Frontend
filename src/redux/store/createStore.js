import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../slices/allReducers';
import { api } from 'redux/features/apiSlice'
import { ManageContentServiceApi } from 'redux/features/ManageContentServiceApi'


const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      ...allReducers,
      [api.reducerPath]: api.reducer,
      [ManageContentServiceApi.reducerPath]: ManageContentServiceApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(ManageContentServiceApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
