import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { changeTeamState } from '../../parse/team';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  getScoresUrl,
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
  scores: [],
  totalScore: 0,
};

const changeTeamStateBroadcastAction = createAsyncThunk(
  'currentState/changeTeamStateBroadcast',
  async ({ id }, { getState }) => {
    const {
      account: { token },
    } = getState();
    await changeTeamState({ stateId: id.toString(), token });
  }
);

export const goForwardAction = createAsyncThunkApi(
  'currentState/goForward',
  Apis.POST,
  goForwardUrl,
  {
    bodyCreator: ({ edgeId, playerId }) => ({ edge: edgeId, player: playerId }),
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

export const participantGetCurrentStateAction = createAsyncThunkApi(
  'currentState/participantGetCurrentState',
  Apis.POST,
  participantGetCurrentStateUrl,
  {
    bodyCreator: ({ fsmId, playerId }) => ({
      fsm: fsmId,
      player: playerId,
    }),
  }
);

export const mentorGetCurrentStateAction = createAsyncThunkApi(
  'currentState/mentorGetCurrentState',
  Apis.POST,
  mentorGetCurrentStateUrl,
  {
    bodyCreator: ({ stateId, playerUUID }) => ({
      state: stateId,
      player_uuid: playerUUID,
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

export const startWorkshopAction = createAsyncThunkApi(
  'currentState/startWorkshop',
  Apis.POST,
  startWorkshopUrl,
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
    bodyCreator: ({ fsmId, playerId }) => ({ fsm: fsmId, player: playerId }),
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

const stateDontNeedUpdate = (state) => {
  state.needUpdateState = false;
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
      } // TODO: check backend
      state.player = response.player;
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

export const {
  initCurrentState: initCurrentStateAction,
} = currentStateSlice.actions;

export const { reducer: currentStateReducer } = currentStateSlice;
