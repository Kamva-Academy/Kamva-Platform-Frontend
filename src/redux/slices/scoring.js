import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  answerCRUDUrl,
  createCommentUrl,
  getAnswerScoresAndCommentsUrl,
  setAnswerScoreUrl,
  transactionUrl,
  scoreTypeUrl,
} from '../constants/urls';


export const getAnswerAction = createAsyncThunkApi(
  'scoring/getAnswerAction',
  Apis.GET,
  answerCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت پاسخ وجود داشت.',
    },
  }
);

export const getScoresAndCommentsAction = createAsyncThunkApi(
  'scoring/getScoresAndCommentsAction',
  Apis.POST,
  getAnswerScoresAndCommentsUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت نمرات وجود داشت.',
    },
  }
);


export const setScoreAction = createAsyncThunkApi(
  'scoring/setScoreAction',
  Apis.POST,
  setAnswerScoreUrl,
  {
    defaultNotification: {
      success: 'نمره با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت نمره وجود داشت.',
    },
  }
);


export const createCommentAction = createAsyncThunkApi(
  'scoring/createCommentAction',
  Apis.POST,
  createCommentUrl,
  {
    defaultNotification: {
      success: 'نظر شما با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت نظر وجود داشت.',
    },
  }
);

export const getUserCurrentScoresAction = createAsyncThunkApi(
  'scoring/getUserCurrentScoresAction',
  Apis.POST,
  transactionUrl({ actionUrl: 'get_user_current_scores' }),
  {
    defaultNotification: {
      error: 'مشکلی در دریافت امتیازات وجود داشت',
    },
  }
);

export const getScoreTypesAction = createAsyncThunkApi(
  'scoring/getScoreTypesAction',
  Apis.GET,
  scoreTypeUrl({ actionUrl: null }),
  {
    defaultNotification: {
      error: 'مشکلی در دریافت انواع امتیازات وجود داشت',
    },
  }
);

const initialState = {
  token: null,
  refresh: null,
  user: {},
  discountCodes: [],
  scores: [],
};


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const scoringSlice = createSlice({
  name: 'scoring',
  initialState,
  reducers: {},
  extraReducers: {

    [getAnswerAction.pending.toString()]: isFetching,
    [getAnswerAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.answer = response;
      state.isFetching = false;
    },
    [getAnswerAction.rejected.toString()]: isNotFetching,


    [getScoresAndCommentsAction.pending.toString()]: isFetching,
    [getScoresAndCommentsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.scores = response.scores;
      state.comments = response.comments;
      state.isFetching = false;
    },
    [getScoresAndCommentsAction.rejected.toString()]: isNotFetching,


    [createCommentAction.pending.toString()]: isFetching,
    [createCommentAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.comments = response;
      state.isFetching = false;
    },
    [createCommentAction.rejected.toString()]: isNotFetching,


    [getUserCurrentScoresAction.pending.toString()]: isFetching,
    [getUserCurrentScoresAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.scores = response;
      state.isFetching = false;
    },
    [getUserCurrentScoresAction.rejected.toString()]: isNotFetching,
  },
});


export const { reducer: scoringReducer } = scoringSlice;
