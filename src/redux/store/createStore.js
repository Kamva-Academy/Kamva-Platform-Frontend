import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../slices/allReducers';
import { ManageContentServiceApi } from 'redux/features/ManageContentServiceApiSlice'

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      ...allReducers,
      [ManageContentServiceApi.reducerPath]: ManageContentServiceApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(ManageContentServiceApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
