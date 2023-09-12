import { createSlice } from '@reduxjs/toolkit';
import { enterWorkshopAction } from './currentState';

const initialState = { redirectTo: null, force: false };

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    resetRedirect: () => initialState,
  },
  extraReducers: {
    [enterWorkshopAction.fulfilled.toString()]: (state, { meta }) => {
      return ({
        redirectTo: `/program/${meta.arg.programId}/fsm/${meta.arg.fsmId}`,
      })
    },
  },
});

export const { resetRedirect: resetRedirectAction } = redirectSlice.actions;

export const { reducer: redirectReducer } = redirectSlice;
