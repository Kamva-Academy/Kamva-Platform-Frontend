import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  sendWidgetAnswerUrl,
} from '../constants/urls';

export const sendWidgetAnswerAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    defaultNotification: {
      success: 'پاسخ شما با موفقیت ثبت شد.',
      showHttpError: true,
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
      success: 'جوابت با موفقیت ثبت شد!',
      showHttpError: true,
    },
  }
);

export const sendBigAnswerAction = ({ widgetId, text }) =>
  sendWidgetAnswerAction({
    widgetId,
    problem_type: 'BigAnswer',
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

const widgetSlice = createSlice({
  name: 'currentState',
  initialState: {
    state: {
      widgets: [],
      hints: [],
    },
    scores: [],
    totalScore: 0,
  },
  extraReducers: {},
});

export const { initCurrentState: initCurrentStateAction } = widgetSlice.actions;

export const { reducer: widgetReducer } = widgetSlice;
