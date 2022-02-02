import { createSlice } from '@reduxjs/toolkit';

import { createAccountAction, loginAction } from './account';
import { enterWorkshopAction } from './currentState';
import { submitRegistrationFormAction } from './events';

const initialState = { redirectTo: null, force: false };

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    initRedirect: () => initialState,
  },
  extraReducers: {
    [submitRegistrationFormAction.fulfilled.toString()]: (state, action) => {
      return {
        redirectTo: `/event/${action?.meta?.arg.eventId}/status/`,
      };
    },
    // [createAccountAction.fulfilled.toString()]: (state, action) => {
    //   return {
    //     redirectTo: '/events/',
    //   };
    // },
    // [loginAction.fulfilled.toString()]: (state, action) => {
    //   return {
    //     redirectTo: '/events/',
    //   };
    // },
    [enterWorkshopAction.fulfilled.toString()]: (state, { meta }) => {
      return ({
        redirectTo: `/event/${meta.arg.eventId}/workshop/${meta.arg.fsmId}`,
      })
    },
  },
});

export const { initRedirect: initRedirectAction } = redirectSlice.actions;

export const { reducer: redirectReducer } = redirectSlice;
