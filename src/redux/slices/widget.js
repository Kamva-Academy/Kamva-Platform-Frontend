import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  makeAnswerEmptyUrl,
  sendWidgetAnswerUrl,
} from '../constants/urls';

export const sendWidgetAnswerAction = createAsyncThunkApi(
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

export const sendFileAction = createAsyncThunkApi(
  'widget/sendFileAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    bodyCreator: ({ playerId, problemId, answerFile }) => ({
      player: playerId,
      problem: problemId,
      problem_type: 'ProblemUploadFileAnswer',
      answer_file: answerFile,
    }),
    defaultNotification: {
      success: 'پاسخ شما با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const sendBigAnswerAction = ({ widgetId, text }) =>
  sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'BigAnswer',
  });

export const sendSmallAnswerAction = ({ widgetId, text }) =>
  sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'SmallAnswer',
  });

export const sendMultiChoiceAnswerAction = ({ playerId, problemId, answer }) =>
  sendWidgetAnswerAction({
    player: playerId,
    problem: problemId,
    problem_type: 'ProblemMultiChoice',
    answer: {
      text: answer,
      answer_type: 'MultiChoiceAnswer',
    },
  });


export const makeAnswerEmptyAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.GET,
  makeAnswerEmptyUrl,
  {
    defaultNotification: {
      success: 'پاسخ شما با موفقیت حذف شد.',
      error: 'مشکلی در حذف‌کردن پاسخ وجود داشت.',
    },
  }
);

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const initialState = {
  isFetching: false,
}

const widgetSlice = createSlice({
  name: 'currentState',
  initialState: initialState,
  extraReducers: {
    [sendWidgetAnswerAction.pending.toString()]: isFetching,
    [sendWidgetAnswerAction.fulfilled.toString()]: isNotFetching,
    [sendWidgetAnswerAction.rejected.toString()]: isNotFetching,

    [sendFileAction.pending.toString()]: isFetching,
    [sendFileAction.fulfilled.toString()]: isNotFetching,
    [sendFileAction.rejected.toString()]: isNotFetching,
    makeAnswerEmptyAction
  },
});

export const { initCurrentState: initCurrentStateAction } = widgetSlice.actions;

export const { reducer: widgetReducer } = widgetSlice;
