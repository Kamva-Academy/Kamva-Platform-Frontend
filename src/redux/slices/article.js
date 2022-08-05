import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  articlesUrl,
} from '../constants/urls';
import {
  createWidgetAction,
} from './widget';

const initialState = {
  widgets: [],
  articles: [],
  teams: {},
  notifications: [],
  problems: [],
  submissions: [],
};

export { initialState as mentorInitialState };

export const getAllArticlesAction = createAsyncThunkApi(
  'articles/getAllArticlesAction',
  Apis.GET,
  articlesUrl
);

export const getArticleAction = createAsyncThunkApi(
  'articles/getOne',
  Apis.GET,
  articlesUrl,
);

export const createArticleAction = createAsyncThunkApi(
  'articles/create',
  Apis.POST,
  articlesUrl
);











const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {},
  extraReducers: {

    [getAllArticlesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.articles = response.results;
      state.articlesCount = response.count;
    },

    [getArticleAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.article = response;
      state.widgets = response.widgets;
    },

    [createWidgetAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.widgets = [...state.widgets, response];
      state.isFetching = false;
    },

  },
});

export const { reducer: articleReducer } = mentorSlice;
