import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postApi, postFormDataApi } from '../apis';
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
  getStateAction,
} from './mentor';

const initialState = {
  state: {
    widgets: [],
    help_states: [],
  },
};

export const goForwardAction = createAsyncThunk(
  'currentState/goForward',
  async ({ edgeId, playerId }) => ({
    response: await postApi(goForwardUrl, { edge: edgeId, player: playerId }),
  })
);

export const goBackwardAction = createAsyncThunk(
  'currentState/goBackward',
  async ({ edgeId, playerId }) => ({
    response: await postApi(goBackwardUrl, { edge: edgeId, player: playerId }),
  })
);

export const participantGetCurrentStateAction = createAsyncThunk(
  'currentState/participantGetCurrentState',
  async ({ fsmId, playerId }) => ({
    response: await postApi(participantGetCurrentStateUrl, {
      fsm: fsmId,
      player: playerId,
    }),
  })
);

export const mentorGetCurrentStateAction = createAsyncThunk(
  'currentState/mentorGetCurrentState',
  async ({ edgeId, playerUUID }) => ({
    response: await postApi(mentorGetCurrentStateUrl, {
      edge: edgeId,
      player_uuid: playerUUID,
    }),
  })
);

const sendAnswerAction = createAsyncThunk(
  'currentState/sendAnswer',
  async (answer) => ({
    response: await postApi(sendAnswerUrl, { answer }),
  })
);

export const sendFileAnswerAction = createAsyncThunk(
  'currentState/sendFileAnswer',
  async ({ playerId, problemId, answerFile }) => ({
    response: await postFormDataApi(sendAnswerUrl, {
      player: playerId,
      problem: problemId,
      problem_type: 'ProblemUploadFileAnswer',
      answer_file: answerFile,
    }),
  })
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
  async ({ fsmId }) => ({
    response: await postApi(startWorkshopUrl, { fsmId }),
  })
);

export const requestMentorAction = createAsyncThunk(
  'currentState/requestMentor',
  async ({ fsmId, playerId }) => ({
    response: await postApi(requestMentorUrl, { fsmId, playerId }),
    message: 'درخواست شما برای منتور‌ها ارسال شد.',
  })
);

const stateNeedUpdate = (state) => {
  state.needUpdateState = true;
};

const stateDontNeedUpdate = (state) => {
  state.needUpdateState = false;
};

const getNewState = (state, { payload: { response } }) => {
  state.needUpdateState = false;
  state.state = response;
};

const sentAnswer = (state, { payload: { response } }) => {
  state.widgets = state.state.widgets.map((widget) =>
    +widget.id === +response.problem
      ? {
          ...widget,
          last_submit: response.xanswer,
          answer: response.answer,
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
    [getStateAction.fulfilled.toString()]: getNewState,

    [sendAnswerAction.fulfilled.toString()]: sentAnswer,
    [sendFileAnswerAction.fulfilled.toString()]: sentAnswer,

    [startWorkshopAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      if (response.error) {
        return state;
      }
      state.player = response.player;
    },
  },
});

export const {
  initCurrentState: initCurrentStateAction,
} = currentStateSlice.actions;

export const { reducer: currentStateReducer } = currentStateSlice;
