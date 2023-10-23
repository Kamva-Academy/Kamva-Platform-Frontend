import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  roadmapCRUDUrl,
} from 'redux/constants/urls';

import { RoadmapInitialStateType } from 'types/redux/Roadmap'

const initialState: RoadmapInitialStateType = {
  playerTakenPath: [],
  FSMRoadmap: [],
};

export const getPlayerTakenPathAction = createAsyncThunkApi(
  'Roadmap/getPlayerTakenPathAction',
  Apis.POST,
  `${roadmapCRUDUrl}get_player_taken_path/`,
);

export const getFSMRoadmapAction = createAsyncThunkApi(
  'Roadmap/getFSMRoadmapAction',
  Apis.POST,
  `${roadmapCRUDUrl}get_fsm_roadmap/`,
);


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const RoadmapSlice = createSlice({
  name: 'Roadmap',
  initialState,
  reducers: {},
  extraReducers: {
    [getPlayerTakenPathAction.pending.toString()]: isFetching,
    [getPlayerTakenPathAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.playerTakenPath = response;
    },
    [getPlayerTakenPathAction.rejected.toString()]: isNotFetching,

    [getFSMRoadmapAction.pending.toString()]: isFetching,
    [getFSMRoadmapAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.FSMRoadmap = response;
    },
    [getFSMRoadmapAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: RoadmapReducer } = RoadmapSlice;
