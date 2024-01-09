import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  makeAnswerEmptyUrl,
  sendWidgetAnswerUrl,
  uploadFileUrl,
} from '../constants/urls';

export type InitialStateType = {
  isFetching: boolean;
  answers: object;
}

const initialState: InitialStateType = {
  answers: {},
  isFetching: false,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

/////////////////////////// SEND ANSWER ///////////////////////////

const _sendWidgetAnswerAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    defaultNotification: {
      success: 'پاسخ شما با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const sendBigAnswerAction = ({ widgetId, text }) =>
  _sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'BigAnswer',
  });

export const sendSmallAnswerAction = ({ widgetId, text }) =>
  _sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'SmallAnswer',
  });

export const sendInviteeUsernameResponseAction = ({ widgetId, username }) =>
  _sendWidgetAnswerAction({
    widgetId,
    username,
    answer_type: 'InviteeUsernameResponse',
  });

export const sendMultiChoiceAnswerAction = ({ problemId, selectedChoices }) =>
  _sendWidgetAnswerAction({
    widgetId: problemId,
    choices: selectedChoices,
    answer_type: 'MultiChoiceAnswer',
  });


export const uploadFileAnswerAction = createAsyncThunkApi(
  'widget/uploadFileAnswerAction',
  Apis.POST_FORM_DATA,
  uploadFileUrl,
  {
    bodyCreator: ({ problemId, answerFile }) => ({
      problem: problemId,
      answer_file: answerFile,
      is_final_answer: true,
    }),
    defaultNotification: {
      success: 'پاسخ شما با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const makeAnswerFileEmptyAction = createAsyncThunkApi(
  'widget/makeAnswerFileEmptyAction',
  Apis.GET,
  makeAnswerEmptyUrl,
  {
    defaultNotification: {
      success: 'پاسخ شما با موفقیت حذف شد.',
      error: 'مشکلی در حذف‌کردن پاسخ وجود داشت.',
    },
  }
);

const AnswerSlice = createSlice({
  name: 'AnswerSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [_sendWidgetAnswerAction.pending.toString()]: isFetching,
    [_sendWidgetAnswerAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.isFetching = false;
    },
    [_sendWidgetAnswerAction.rejected.toString()]: isNotFetching,


    [uploadFileAnswerAction.pending.toString()]: isFetching,
    [uploadFileAnswerAction.fulfilled.toString()]: isNotFetching,
    [uploadFileAnswerAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: AnswerReducer } = AnswerSlice;
