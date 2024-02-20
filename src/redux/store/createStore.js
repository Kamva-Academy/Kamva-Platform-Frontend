import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../slices/allReducers';
import { api } from 'redux/features/apiSlice'
import { mainBackendApi } from 'redux/features/mainBackendApiSlice'


const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      ...allReducers,
      [api.reducerPath]: api.reducer,
      [mainBackendApi.reducerPath]: mainBackendApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(mainBackendApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
