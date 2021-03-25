import { configureStore } from '@reduxjs/toolkit';

import allReducers from '../slices/allReducers';

const createStore = (preloadedState) => {
  return configureStore({
    reducer: allReducers,
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
