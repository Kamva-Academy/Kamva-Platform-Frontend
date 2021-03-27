import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import { getLandingDataUrl } from '../constants/urls';

const initialState = {
  teams: {},
  members: [],
  workshops: [],
  FAQs: [],
};

export const getLandingDataAction = createAsyncThunkApi(
  'landing/getData',
  Apis.GET,
  getLandingDataUrl
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
