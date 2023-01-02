import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  articlesUrl,
} from '../constants/urls';

import { ArticlesInitialStateType } from '../../types/redux/article'

const initialState: ArticlesInitialStateType = {
  isFetching: false,
  widgets: [],
  articles: [],
  teams: {},
  notifications: [],
  problems: [],
  submissions: [],
  articlesCount: 0,
  article: null,
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
  },
});

export const { reducer: articleReducer } = mentorSlice;
