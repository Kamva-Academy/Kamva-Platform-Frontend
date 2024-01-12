import { createSlice } from '@reduxjs/toolkit';

import { Apis } from 'redux/apis';
import { createAsyncThunkApi } from 'redux/apis/cerateApiAsyncThunk';
import {
  getOneWorkshopUrl,
  getRegistrableWorkshopsUrl,
  reviewAnswersUrl,
  addMentorToWorkshopUrl,
  edgeUrl,
  getAllWorkshopEdges,
  getAllWorkshopStatesInfoUrl,
  getFSMPlayersUrl,
  stateCRUDUrl,
  teamCRUDUrl,
  workshopCRUDUrl,
  getAllWorkshopMentors,
  removeMentorURL,
} from 'redux/constants/urls';

type FSMInitialStateType = any;

const initialState: FSMInitialStateType = {
  currentState: {
    widgets: [],
  },
  isFetching: false,
  allStates: [],
  allWorkshopEdges: [],
  workshop: null,
  answers: [],
  players: null,
  allWorkshopMentors: [],
};

export const getOneWorkshopAction = createAsyncThunkApi(
  'workshop/getOneWorkshopAction',
  Apis.GET,
  getOneWorkshopUrl
);

export const getAnswersForReviewAction = createAsyncThunkApi(
  'workshop/reviewAnswerAction',
  Apis.GET,
  reviewAnswersUrl
);

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

// for mentors
export const getFSMPlayersAction = createAsyncThunkApi(
  'workshop/getFSMPlayersAction',
  Apis.GET,
  getFSMPlayersUrl,
)

export const getOneWorkshopsInfoAction = createAsyncThunkApi(
  'workshop/getOneWorkshopsInfoAction',
  Apis.GET,
  workshopCRUDUrl
);



export const addMentorToWorkshopAction = createAsyncThunkApi(
  'workshop/addMentorToWorkshopAction',
  Apis.POST,
  addMentorToWorkshopUrl,
  {
    defaultNotification: {
      success: 'همیار با موفقیت اضافه شد.',
    },
  }
);

export const getAllWorkshopStatesInfoAction = createAsyncThunkApi(
  'workshop/getAllWorkshopStatesInfoAction',
  Apis.GET,
  getAllWorkshopStatesInfoUrl
);

export const addStateAction = createAsyncThunkApi(
  'workshop/addStateAction',
  Apis.POST,
  stateCRUDUrl,
  {
    defaultNotification: {
      success: 'گام با موفقیت اضافه شد.',
    },
  }
);

export const removeStateAction = createAsyncThunkApi(
  'workshop/removeStateAction',
  Apis.DELETE,
  stateCRUDUrl,
  {
    defaultNotification: {
      success: 'گام با موفقیت حذف شد.',
    },
  }
);

export const updateStateAction = createAsyncThunkApi(
  'workshop/updateStateAction',
  Apis.PATCH,
  stateCRUDUrl,
  {
    defaultNotification: {
      success: 'گام با موفقیت به‌روز شد.',
    },
  }
);

export const getAllWorkshopEdgesAction = createAsyncThunkApi(
  'workshop/getAllWorkshopEdgesAction',
  Apis.GET,
  getAllWorkshopEdges,
);


export const addEdgeAction = createAsyncThunkApi(
  'workshop/addEdgeAction',
  Apis.POST,
  edgeUrl,
  {
    defaultNotification: {
      success: 'یال با موفقیت اضافه شد.',
    },
  }
);


export const updateEdgeAction = createAsyncThunkApi(
  'workshop/updateEdgeAction',
  Apis.PATCH,
  edgeUrl,
  {
    defaultNotification: {
      success: 'یال با موفقیت به‌روز شد.',
    },
  }
);

export const removeEdgeAction = createAsyncThunkApi(
  'workshop/removeEdgeAction',
  Apis.DELETE,
  edgeUrl,
  {
    defaultNotification: {
      success: 'یال با موفقیت حذف شد.',
    },
  }
);

export const getAllWorkshopMentorsAction = createAsyncThunkApi(
  'account/getAllWorkshopMentorsAction',
  Apis.GET,
  getAllWorkshopMentors
);

export const removeMentorFromWorkshopAction = createAsyncThunkApi(
  'events/removeMentorFromWorkshopAction',
  Apis.POST,
  removeMentorURL,
  {
    bodyCreator: ({ mentor }) => ({
      ...mentor
    }),
    defaultNotification: {
      success: 'همیار با موفقیت از کارگاه حذف شد',
      error: 'اشکالی در حذف همیار از کارگاه رخداد.'
    },
  }
);

const IndexSlice = createSlice({
  name: 'workshop',
  initialState,
  reducers: {},
  extraReducers: {

    [getOneWorkshopAction.pending.toString()]: isFetching,
    [getOneWorkshopAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.workshop = response;
      state.isFetching = false;
    },
    [getOneWorkshopAction.rejected.toString()]: isNotFetching,

    [getAnswersForReviewAction.pending.toString()]: isFetching,
    [getAnswersForReviewAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.answers = response;
      state.isFetching = false;
    },
    [getAnswersForReviewAction.rejected.toString()]: isNotFetching,


    [getOneWorkshopsInfoAction.pending.toString()]: isFetching,
    [getOneWorkshopsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.workshop = response;
      state.isFetching = false;
    },
    [getOneWorkshopsInfoAction.rejected.toString()]: isNotFetching,

    [getAllWorkshopStatesInfoAction.pending.toString()]: isFetching,
    [getAllWorkshopStatesInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allStates = response;
      state.isFetching = false;
    },
    [getAllWorkshopStatesInfoAction.rejected.toString()]: isNotFetching,


    [addStateAction.pending.toString()]: isFetching,
    [addStateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allStates = [...state.allStates, response];
      state.isFetching = false;
    },
    [addStateAction.rejected.toString()]: isNotFetching,


    [updateStateAction.pending.toString()]: isFetching,
    [updateStateAction.fulfilled.toString()]: (state, action) => {
      const newAllStates = [...state.allStates];
      for (let i = 0; i < newAllStates.length; i++) {
        if (newAllStates[i].id == action.meta.arg.paperId) {
          newAllStates[i] = action.payload.response;
        }
      }
      state.allStates = newAllStates;
      state.currentState = action.payload.response;
      state.isFetching = false;
    },
    [updateStateAction.rejected.toString()]: isNotFetching,


    [removeStateAction.pending.toString()]: isFetching,
    [removeStateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    },
    [removeStateAction.rejected.toString()]: isNotFetching,

    [getAllWorkshopEdgesAction.pending.toString()]: isFetching,
    [getAllWorkshopEdgesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allWorkshopEdges = response;
      state.isFetching = false;
    },
    [getAllWorkshopEdgesAction.rejected.toString()]: isNotFetching,


    [updateEdgeAction.pending.toString()]: isFetching,
    [updateEdgeAction.fulfilled.toString()]: (state, action) => {
      const newAllWorkshopEdges = [...state.allWorkshopEdges];
      for (let i = 0; i < newAllWorkshopEdges.length; i++) {
        if (newAllWorkshopEdges[i].id === action.meta.arg.edgeId) {
          newAllWorkshopEdges[i] = action.payload.response;
        }
      }
      state.allWorkshopEdges = newAllWorkshopEdges;
      state.isFetching = false;
    },
    [updateEdgeAction.rejected.toString()]: isNotFetching,


    [addEdgeAction.pending.toString()]: isFetching,
    [addEdgeAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allWorkshopEdges = [response, ...state.allWorkshopEdges];
      state.isFetching = false;
    },
    [addEdgeAction.rejected.toString()]: isNotFetching,


    [removeEdgeAction.pending.toString()]: isFetching,
    [removeEdgeAction.fulfilled.toString()]: (state, action) => {
      const newAllWorkshopEdges = [...state.allWorkshopEdges];
      for (let i = 0; i < newAllWorkshopEdges.length; i++) {
        if (newAllWorkshopEdges[i].id === action.meta.arg.edgeId) {
          newAllWorkshopEdges.splice(i, 1);
        }
      }
      state.allWorkshopEdges = newAllWorkshopEdges;
      state.isFetching = false;
    },
    [removeEdgeAction.rejected.toString()]: isNotFetching,




    [getFSMPlayersAction.pending.toString()]: isFetching,
    [getFSMPlayersAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.players = response;
      state.isFetching = false;
    },
    [getFSMPlayersAction.rejected.toString()]: isNotFetching,

    [getAllWorkshopMentorsAction.pending.toString()]: isFetching,
    [getAllWorkshopMentorsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allWorkshopMentors = response;
      state.isFetching = false;
    },
    [getAllWorkshopMentorsAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: workshopReducer } = IndexSlice;
