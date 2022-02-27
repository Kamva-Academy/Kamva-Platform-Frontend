import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  getOneWorkshopUrl,
  getRegistrableWorkshopsUrl,
  reviewAnswersUrl,
} from '../constants/urls';

export const getOneWorkshopAction = createAsyncThunkApi(
  'workshop/getOneWorkshopAction',
  Apis.GET,
  getOneWorkshopUrl
);

export const getRegistrableWorkshopsAction = createAsyncThunkApi(
  'workshop/getRegistrableWorkshopsAction',
  Apis.GET,
  getRegistrableWorkshopsUrl
);

export const getAnswersForReviewAction = createAsyncThunkApi(
  'workshop/reviewAnswerAction',
  Apis.GET,
  reviewAnswersUrl
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

    [getOneWorkshopAction.pending.toString()]: isFetching,
    [getOneWorkshopAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.workshop = response;
      state.isFetching = false;
    },
    [getOneWorkshopAction.rejected.toString()]: isNotFetching,

    [getAnswersForReviewAction.pending.toString()]: isFetching,
    [getAnswersForReviewAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.answers = response;
      state.isFetching = false;
    },
    [getAnswersForReviewAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: workshopReducer } = IndexSlice;
