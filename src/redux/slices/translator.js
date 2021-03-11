import { createSlice } from '@reduxjs/toolkit';

const translatorSlice = createSlice({
  name: 'translator',
  initialState: 'fa',
  reducers: {
    setLocal: (state, { payload }) => payload,
  },
});

export const { setLocal: setLocalAction } = translatorSlice.actions;

export const { reducer: translatorReducer } = translatorSlice;
