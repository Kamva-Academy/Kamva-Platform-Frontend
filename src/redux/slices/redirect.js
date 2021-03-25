import { createSlice } from '@reduxjs/toolkit';

import { createArticleAction, createWorkshopAction } from './mentor';

const initialState = { redirectTo: null, force: false };

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    initRedirect: () => initialState,
  },
  extraReducers: {
    [createWorkshopAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => ({
      redirectTo: `/edit_workshop/${response.id}`,
    }),
    [createArticleAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => ({
      redirectTo: `/edit_article/${response.id}`,
    }),
  },
});

export const { initRedirect: initRedirectAction } = redirectSlice.actions;

export const { reducer: redirectReducer } = redirectSlice;
