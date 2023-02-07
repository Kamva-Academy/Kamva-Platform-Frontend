import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  checkUsernameUrl,
} from '../constants/urls';


export const checkUsernameAction = createAsyncThunkApi(
  'question/checkUsernameAction',
  Apis.POST,
  checkUsernameUrl,
);

const initialState = {
  inviteeUserFirstName: '',
  inviteeUserLastName: '',
};


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: {

    [checkUsernameAction.pending.toString()]: isFetching,
    [checkUsernameAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.inviteeUserFirstName = response.first_name;
      state.inviteeUserLastName = response.last_name;
      state.isFetching = false;
    },
    [checkUsernameAction.rejected.toString()]: (state) => {
      state.inviteeUserFirstName = '';
      state.inviteeUserLastName = '';
      state.isFetching = false;
    },
  },
});


export const { reducer: questionReducer } = questionSlice;
