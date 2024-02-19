import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../slices/allReducers';
import { combineReducers } from 'redux';
import { api } from 'redux/features/apiSlice'


const createStore = (preloadedState) => {
  return configureStore({
    reducer: combineReducers({
      ...allReducers,
      // Add the generated RTK Query "API slice" caching reducer
      [api.reducerPath]: api.reducer,
      // Add any other reducers
      // sample: sampleReducer,
    }),
    // Add the RTK Query API middleware
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
