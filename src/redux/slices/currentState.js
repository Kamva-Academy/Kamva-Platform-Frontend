import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import jsonToFormData from '../../utils/jsonToFromDate';
import axios from '../axios/axiosConfig';
import {
  goBackwardUrl,
  goForwardUrl,
  mentorGetCurrentStateUrl,
  participantGetCurrentStateUrl,
  requestMentorUrl,
  sendAnswerUrl,
  startWorkshopUrl,
} from '../constants/urls';
import {
  createHelpAction,
  createWidgetAction,
  deleteWidgetAction,
  getArticleAction,
  getArticlesAction,
} from './mentor';

const initialState = {};

export const goForwardAction = createAsyncThunk(
  'currentState/goForward',
  async ({ edgeId, playerId }) =>
    (await axios.post(goForwardUrl, { edge: edgeId, player: playerId })).data
);

export const goBackwardAction = createAsyncThunk(
  'currentState/goBackward',
  async ({ edgeId, playerId }) =>
    (await axios.post(goBackwardUrl, { edge: edgeId, player: playerId })).data
);

export const participantGetCurrentStateAction = createAsyncThunk(
  'currentState/participantGetCurrentState',
  async ({ fsmId, playerId }) =>
    (
      await axios.post(participantGetCurrentStateUrl, {
        fsm: fsmId,
        player: playerId,
      })
    ).data
);

export const mentorGetCurrentStateAction = createAsyncThunk(
  'currentState/mentorGetCurrentState',
  async ({ edgeId, playerId }) =>
    (
      await axios.post(mentorGetCurrentStateUrl, {
        edge: edgeId,
        player: playerId,
      })
    ).data
);

const sendAnswerAction = createAsyncThunk(
  'currentState/sendAnswer',
  async (answer) => (await axios.post(sendAnswerUrl, answer)).data
);

export const sendFileAnswerAction = createAsyncThunk(
  'currentState/sendFileAnswer',
  async ({ playerId, problemId, answerFile }) =>
    axios.post(
      sendAnswerUrl,
      jsonToFormData({
        player: playerId,
        problem: problemId,
        problem_type: 'ProblemUploadFileAnswer',
        answer_file: answerFile,
      }),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    ).data
);

export const sendBigAnswerAction = ({ playerId, problemId, answer }) =>
  sendAnswerAction({
    player: playerId,
    problem: problemId,
    problem_type: 'ProblemBigAnswer',
    answer: {
      text: answer,
      answer_type: 'BigAnswer',
    },
  });

export const sendSmallAnswerAction = ({ playerId, problemId, answer }) =>
  sendAnswerAction({
    player: playerId,
    problem: problemId,
    problem_type: 'ProblemSmallAnswer',
    answer: {
      text: answer,
      answer_type: 'SmallAnswer',
    },
  });

export const sendMultiChoiceAnswerAction = ({ playerId, problemId, answer }) =>
  sendAnswerAction({
    player: playerId,
    problem: problemId,
    problem_type: 'ProblemMultiChoice',
    answer: {
      text: answer,
      answer_type: 'MultiChoiceAnswer',
    },
  });

export const startWorkshopAction = createAsyncThunk(
  'currentState/startWorkshop',
  async ({ fsmId }) => (await axios.post(startWorkshopUrl, { fsmId })).data
);

export const requestMentorAction = createAsyncThunk(
  'currentState/requestMentor',
  async ({ fsmId, playerId }) =>
    (await axios.post(requestMentorUrl, { fsmId, playerId })).data
);

const stateNeedUpdate = (state) => {
  state.needUpdateState = true;
};

const stateDontNeedUpdate = (state) => {
  state.needUpdateState = false;
};

const getNewState = (state, { payload }) => {
  state.needUpdateState = false;
  state.state = payload;
};

const sentAnswer = (state, { payload }) => {
  state.widgets = state.state.widgets.map((widget) =>
    +widget.id === +payload.response.problem
      ? {
          ...widget,
          last_submit: payload.response.xanswer,
          answer: payload.response.answer,
        }
      : widget
  );
};

const currentStateSlice = createSlice({
  name: 'currentState',
  initialState,
  reducers: {
    initCurrentState: () => initialState,
  },
  extraReducers: {
    [createHelpAction.fulfilled.toString()]: stateNeedUpdate,
    [createWidgetAction.fulfilled.toString()]: stateNeedUpdate,
    [deleteWidgetAction.fulfilled.toString()]: stateNeedUpdate,
    [goForwardAction.rejected.toString()]: stateNeedUpdate,
    [goBackwardAction.rejected.toString()]: stateNeedUpdate,

    [getArticleAction.fulfilled.toString()]: stateDontNeedUpdate,
    [getArticlesAction.fulfilled.toString()]: stateDontNeedUpdate,

    [goForwardAction.fulfilled.toString()]: getNewState,
    [goBackwardAction.fulfilled.toString()]: getNewState,
    [participantGetCurrentStateAction.fulfilled.toString()]: getNewState,
    [mentorGetCurrentStateAction.fulfilled.toString()]: getNewState,

    [sendAnswerAction.fulfilled.toString()]: sentAnswer,
    [sendFileAnswerAction.fulfilled.toString()]: sentAnswer,

    [startWorkshopAction.fulfilled.toString()]: (state, { payload }) => {
      state.player = payload.response.player;
    },
  },
});

export const { reducer: accountReducer } = currentStateSlice;
