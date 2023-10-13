import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  bannersCRUDUrl,
} from 'redux/constants/urls';

import { WebsiteAppearanceInitialStateType } from 'types/redux/WebSiteAppearance'

const initialState: WebsiteAppearanceInitialStateType = {
  banners: [],
};

export const getBannersAction = createAsyncThunkApi(
  'WebSiteAppearance/getBannersAction',
  Apis.GET,
  bannersCRUDUrl,
);


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const WebSiteAppearanceSlice = createSlice({
  name: 'WebSiteAppearance',
  initialState,
  reducers: {},
  extraReducers: {
    [getBannersAction.pending.toString()]: isFetching,
    [getBannersAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.banners = response;
    },
    [getBannersAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: WebSiteAppearanceReducer } = WebSiteAppearanceSlice;
