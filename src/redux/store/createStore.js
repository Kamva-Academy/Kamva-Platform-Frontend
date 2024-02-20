import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../slices/allReducers';
import { api } from 'redux/features/apiSlice'
import { mainBackendBaseApi } from 'redux/features/mainBackendApiSlice'


const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      ...allReducers,
      [api.reducerPath]: api.reducer,
      [mainBackendBaseApi.reducerPath]: mainBackendBaseApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(mainBackendBaseApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
