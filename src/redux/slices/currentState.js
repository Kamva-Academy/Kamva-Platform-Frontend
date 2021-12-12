import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { requestMentor } from '../../parse/mentor';
import { changeTeamState } from '../../parse/team';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  enterWorkshopUrl,
  getScoresUrl,
  goBackwardUrl,
  goForwardUrl,
  mentorGetCurrentStateUrl,
  mentorMoveBackwardUrl,
  mentorMoveForwardUrl,
} from '../constants/urls';

const changeTeamStateBroadcastAction = createAsyncThunk(
  'currentState/changeTeamStateBroadcast',
  async ({ response: { current_state }, arg: { teamId } }) => {
    await changeTeamState({
      stateId: current_state.id.toString(),
      uuid: teamId,
    });
  }
);

export const goForwardAction = createAsyncThunkApi(
  'currentState/goForward',
  Apis.POST,
  goForwardUrl,
  {
    bodyCreator: ({ password }) => ({
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
    defaultNotification: {
      showHttpError: true,
    },
    onSuccessAction: changeTeamStateBroadcastAction,
  }
);

export const mentorMoveForwardAction = createAsyncThunkApi(
  'currentState/mentorMoveForward',
  Apis.POST,
  mentorMoveForwardUrl,
  {
    bodyCreator: ({ teamId }) => ({
      team: teamId,
    }),
    defaultNotification: {
      showHttpError: true,
    },
    onSuccessAction: changeTeamStateBroadcastAction,
  }
);

export const mentorMoveBackwardAction = createAsyncThunkApi(
  'currentState/mentorMoveBackward',
  Apis.POST,
  mentorMoveBackwardUrl,
  {
    bodyCreator: ({ teamId }) => ({
      team: teamId,
    }),
    defaultNotification: {
      showHttpError: true,
    },
    onSuccessAction: changeTeamStateBroadcastAction,
  }
);

export const mentorGetCurrentStateAction = createAsyncThunkApi(
  'currentState/mentorGetCurrentState',
  Apis.GET,
  mentorGetCurrentStateUrl
);

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

export const requestMentorAction = createAsyncThunk(
  'requestMentor',
  async ({ playerId, teamId, fsmId }, { rejectWithValue }) => {
    try {
      await requestMentor({ playerId, teamId, fsmId });
      return {
        message: 'درخواست شما ارسال شد.',
      };
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
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
  state.state = response.current_state;
};

const getPlayer = (state, { payload: { response } }) => {
  state.needUpdateState = false;
  state.playerId = response.id;
  state.teamId = response.team?.id;
  state.state = response.current_state;
  state.myTeam = response.team;
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

    [mentorMoveForwardAction.fulfilled.toString()]: getNewState,
    [mentorMoveBackwardAction.fulfilled.toString()]: getNewState,

    [mentorGetCurrentStateAction.fulfilled.toString()]: getPlayer,

    [enterWorkshopAction.fulfilled.toString()]: getPlayer,

    [getScoresAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.scores = response.score_transactions;
      state.totalScore = response.scores_sum;
    },
  },
});

export const { initCurrentState: initCurrentStateAction } =
  currentStateSlice.actions;

export const { reducer: currentStateReducer } = currentStateSlice;
