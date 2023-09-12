import { createSlice } from '@reduxjs/toolkit';
import { enterWorkshopAction } from './currentState';

const initialState = { redirectTo: null, force: false };

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    initRedirect: () => initialState,
  },
  extraReducers: {
    [enterWorkshopAction.fulfilled.toString()]: (state, { meta }) => {
      return ({
        redirectTo: `/program/${meta.arg.programId}/fsm/${meta.arg.fsmId}`,
      })
    },
  },
});

export const { initRedirect: initRedirectAction } = redirectSlice.actions;

export const { reducer: redirectReducer } = redirectSlice;
