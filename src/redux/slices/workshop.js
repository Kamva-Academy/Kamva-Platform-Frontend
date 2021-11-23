import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  getRegistrableWorkshopsUrl,
} from '../constants/urls';

export const getRegistrableWorkshopsAction = createAsyncThunkApi(
  'workshop/getRegistrableWorkshopsAction',
  Apis.GET,
  getRegistrableWorkshopsUrl
);

const initialState = {
  isFetching: false,
  getWorkshopsLoading: false,
  registrableWorkshops: [],
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const IndexSlice = createSlice({
  name: 'workshop',
  initialState,
  extraReducers: {

    [getRegistrableWorkshopsAction.pending.toString()]: isFetching,
    [getRegistrableWorkshopsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrableWorkshops = response.results;
      state.isFetching = false;
    },
    [getRegistrableWorkshopsAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: workshopReducer } = IndexSlice;
