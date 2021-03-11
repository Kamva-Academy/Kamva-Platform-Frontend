import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../axios/axiosConfig';
import { loginUrl } from '../constants/urls';

const initialState = { token: null, user: {} };

export const loginAction = createAsyncThunk(
  'users/login',
  async ({ username, password }) =>
    (
      await axios.post(loginUrl, {
        username,
        password,
      })
    ).data
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: {
    [loginAction.fulfilled.toString()]: (state, { payload }) => {
      state.user = payload.user_info;
      state.token = payload.access;
      state.isFetching = false;
    },
    [loginAction.pending.toString()]: (state) => {
      state.isFetching = true;
    },
    [loginAction.rejected.toString()]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
