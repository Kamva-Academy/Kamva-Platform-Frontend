import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { changeTeamState } from '../../parse/team';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  enterWorkshopUrl,
  getScoresUrl,
  getSelfUrl,
  goBackwardUrl,
  goForwardUrl,
  mentorGetCurrentStateUrl,
  requestMentorUrl,
  sendAnswerUrl,
} from '../constants/urls';

const changeTeamStateBroadcastAction = createAsyncThunk(
  'currentState/changeTeamStateBroadcast',
  async ({ response: { id }, arg: { playerId } }) => {
    await changeTeamState({
      stateId: id.toString(),
      uuid: playerId,
    });
  }
);

export const goForwardAction = createAsyncThunkApi(
  'currentState/goForward',
  Apis.POST,
  goForwardUrl,
  {
    bodyCreator: ({ edgeId, playerId, password }) => ({
      edge: edgeId,
      player: playerId,
      key: password,
    }),
    defaultNotification: {
      showHttpError: true,
    },
    onSuccessAction: changeTeamStateBroadcastAction,
  }
);

export const goBackwardAction = createAsyncThunkApi(
  'currentState/goBackward',
  Apis.POST,
  goBackwardUrl,
  {
    bodyCreator: ({ edgeId, playerId }) => ({ edge: edgeId, player: playerId }),
    defaultNotification: {
      showHttpError: true,
    },
    onSuccessAction: changeTeamStateBroadcastAction,
  }
);

export const getSelfAction = createAsyncThunkApi(
  'currentState/getSelf',
  Apis.GET,
  getSelfUrl
);

export const mentorGetCurrentStateAction = createAsyncThunkApi(
  'currentState/mentorGetCurrentState',
  Apis.POST,
  mentorGetCurrentStateUrl,
  {
    bodyCreator: ({ stateId, playerId }) => ({
      state: stateId,
      player_id: playerId,
    }),
  }
);

export const sendAnswerAction = createAsyncThunkApi(
  'currentState/sendAnswer',
  Apis.POST,
  sendAnswerUrl,
  {
    defaultNotification: {
      success: 'جوابت با موفقیت ثبت شد!',
      showHttpError: true,
    },
  }
);

export const sendFileAnswerAction = createAsyncThunkApi(
  'currentState/sendFileAnswer',
  Apis.POST,
  sendAnswerUrl,
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

export const enterWorkshopAction = createAsyncThunkApi(
  'currentState/enterWorkshop',
  Apis.POST,
  enterWorkshopUrl,
  {
    bodyCreator: ({ fsmId, password }) => ({ fsm: fsmId, key: password }),
    defaultNotification: {
      showHttpError: true,
    },
  }
);

export const requestMentorAction = createAsyncThunkApi(
  'currentState/requestMentor',
  Apis.POST,
  requestMentorUrl,
  {
    bodyCreator: ({ fsmId, teamId, playerId }) => ({
      fsm: fsmId,
      teamId,
      player: playerId,
    }),
    defaultNotification: {
      success: 'درخواست شما ارسال شد.',
    },
  }
);

export const getScoresAction = createAsyncThunkApi(
  'player/getScore',
  Apis.POST,
  getScoresUrl,
  {
    bodyCreator: ({ fsmId, playerId }) => ({ fsm: fsmId, player: playerId }),
  }
);

const stateNeedUpdate = (state) => {
  state.needUpdateState = true;
};

const getNewState = (state, { payload: { response } }) => {
  state.needUpdateState = false;
  state.state = response;
};

const sentAnswer = (state, { payload: { response } }) => {
  state.state.widgets = state.state.widgets.map((widget) =>
    +widget.id === +response.problem
      ? {
          ...widget,
          last_submit: response.xanswer,
          answer: response.answer,
        }
      : widget
  );
};

const getPlayer = (state, { payload: { response } }) => {
  state.playerId = response.id;
  state.teamId = response.team.id;
  state.state = response.current_state;
};

const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: {
    state: {
      widgets: [],
      hints: [],
    },
    scores: [],
    totalScore: 0,
  },
  extraReducers: {
    [goForwardAction.rejected.toString()]: stateNeedUpdate,
    [goBackwardAction.rejected.toString()]: stateNeedUpdate,

    [goForwardAction.fulfilled.toString()]: getNewState,
    [goBackwardAction.fulfilled.toString()]: getNewState,
    [getSelfAction.fulfilled.toString()]: getPlayer,
    [mentorGetCurrentStateAction.fulfilled.toString()]: getPlayer,

    [sendAnswerAction.fulfilled.toString()]: sentAnswer,
    [sendFileAnswerAction.fulfilled.toString()]: sentAnswer,

    [enterWorkshopAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      if (response.error) {
        return state;
      }
    },

    [getScoresAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.scores = response.score_transactions;
      state.totalScore = response.scores_sum;
    },
  },
});

export const { initCurrentState: initCurrentStateAction } =
  currentStateSlice.actions;

export const { reducer: currentStateReducer } = currentStateSlice;
