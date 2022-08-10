import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

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
      currnetStageName: current_state.name,
      teamEnterTimeToStage: moment().format('HH:mm:ss')
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
    bodyCreator: ({ eventId, fsmId, password }) => ({ event: eventId, fsm: fsmId, key: password }),
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
  state.isFetching = false;
};

const getNewState = (state, { payload: { response } }) => {
  state.needUpdateState = false;
  state.state = response.current_state;
  state.isFetching = false;
};

const getPlayer = (state, { payload: { response } }) => {
  console.log(response)
  state.needUpdateState = false;
  state.workshopId = response.fsm;
  state.playerId = response.id;
  state.teamRoom = response.team?.chat_room;
  // todo: here I put playerId as teamId
  state.teamId = response.team?.id ? response.team?.id : String(response.id);
  state.state = response.current_state;
  state.myTeam = response.team;
  state.isFetching = false;
};


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: {
    openChatRoom: false,
    isFetching: false,
    state: {
      widgets: [],
      hints: [],
    },
    scores: [],
    totalScore: 0,
  },
  reducers: {
    changeOpenChatRoom: (state, actions) => {
      state.openChatRoom = !state.openChatRoom;
    },
  },
  extraReducers: {
    [goForwardAction.pending.toString()]: isFetching,
    [goForwardAction.fulfilled.toString()]: getNewState,
    [goForwardAction.rejected.toString()]: stateNeedUpdate,

    [goBackwardAction.pending.toString()]: isFetching,
    [goBackwardAction.fulfilled.toString()]: getNewState,
    [goBackwardAction.rejected.toString()]: stateNeedUpdate,

    [mentorMoveForwardAction.pending.toString()]: isFetching,
    [mentorMoveForwardAction.fulfilled.toString()]: getNewState,
    [mentorMoveForwardAction.rejected.toString()]: isNotFetching,

    [mentorMoveBackwardAction.pending.toString()]: isFetching,
    [mentorMoveBackwardAction.fulfilled.toString()]: getNewState,
    [mentorMoveBackwardAction.rejected.toString()]: isNotFetching,

    [mentorGetCurrentStateAction.pending.toString()]: isFetching,
    [mentorGetCurrentStateAction.fulfilled.toString()]: getPlayer,
    [mentorGetCurrentStateAction.rejected.toString()]: isNotFetching,

    [enterWorkshopAction.pending.toString()]: isFetching,
    [enterWorkshopAction.fulfilled.toString()]: getPlayer,
    [enterWorkshopAction.rejected.toString()]: isNotFetching,

    [getScoresAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.scores = response.score_transactions;
      state.totalScore = response.scores_sum;
    },
  },
});

export const { changeOpenChatRoom: changeOpenChatRoomAction } =
  currentStateSlice.actions;

export const { reducer: currentStateReducer } = currentStateSlice;
