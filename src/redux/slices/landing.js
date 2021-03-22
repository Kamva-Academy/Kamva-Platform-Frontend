import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getApi } from '../apis';
import { getLandingDataUrl } from '../constants/urls';

const initialState = {
  teams: {},
  members: [],
  workshops: [],
  FAQs: [],
};

export const getLandingDataAction = createAsyncThunk(
  'landing/getData',
  async () => ({ response: await getApi(getLandingDataUrl) })
);

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {},
  extraReducers: {
    [getLandingDataAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.teams = response.teams;
      state.members = response.members;
      state.workshops = response.workshops;
      state.FAQs = response.FAQs;
    },
  },
});

export const { reducer: landingReducer } = landingSlice;
