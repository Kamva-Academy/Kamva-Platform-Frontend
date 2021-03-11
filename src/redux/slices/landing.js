import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../axios/axiosConfig';
import { landingUrl } from '../constants/urls';

const initialState = {
  teams: {},
  members: [],
  workshops: [],
  FAQs: [],
};

export const getLandingDataAction = createAsyncThunk(
  'landing/getData',
  async () => (await axios.get(landingUrl)).data
);

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {},
  extraReducers: {
    [getLandingDataAction.fulfilled.toString()]: (state, { payload }) => {
      state.teams = payload.response.teams;
      state.members = payload.response.members;
      state.workshops = payload.response.workshops;
      state.FAQs = payload.response.FAQs;
    },
  },
});

export const { reducer: accountReducer } = landingSlice;
