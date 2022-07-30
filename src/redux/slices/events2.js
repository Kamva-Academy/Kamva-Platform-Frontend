import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteRequest, getRequests } from '../../parse/mentor2';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk2';
import {
  addMentorToWorkshopUrl,
  addTeamsViaCSVUrl,
  addUserToTeamUrl,
  allRegistrationReceiptsUrl,
  createTeamUrl,
  eventInfoUrl,
  getAllEventsInfoUrl,
  getMentoredFsmsUrl,
  getPlayerFromTeamUrl,
  getTeamsUrl,
  getWorkshopsUrl,
  makeTeamHeadUrl,
  oneRegistrationReceiptUrl,
  registrationFormCRUDUrl,
  validateRegistrationReceiptUrl,
  workshopCRUDUrl,
} from '../constants/urls2';
import {
  createWidgetAction,
  deleteWidgetAction,
  updateWidgetAction,
} from './widget2';

export const getRegistrationFormAction = createAsyncThunkApi(
  'events/getRegistrationFormAction',
  Apis.GET,
  registrationFormCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت فرم ثبت‌نام وجود داشت.'
    },
  }
);


export const addTeamsViaCSVAction = createAsyncThunkApi(
  'events/addTeamsViaCSVAction',
  Apis.POST_FORM_DATA,
  addTeamsViaCSVUrl,
  {
    defaultNotification: {
      success: 'تیم‌ها با موفقیت اضافه شدند.',
      error: 'اشکالی در اضافه‌کردن تیم‌ها وجود داشت.'
    },
  }
);

export const createTeamAction = createAsyncThunkApi(
  'events/createTeamAction',
  Apis.POST,
  createTeamUrl
);

export const addUserToTeamAction = createAsyncThunkApi(
  'events/addUserToTeamAction',
  Apis.POST,
  addUserToTeamUrl,
  {
    defaultNotification: {
      success: 'عضو با موفقیت به گروه اضافه شد',
      error: 'اشکالی در اضافه‌کردن عضو به گروه وجود داشت.'
    },
  }
);

export const getAllEventsInfoAction = createAsyncThunkApi(
  'events/getAllEventsInfoAction',
  Apis.GET,
  getAllEventsInfoUrl
);

export const getMentoredFsmsAction = createAsyncThunkApi(
  'events/getMentoredFsms',
  Apis.GET,
  getMentoredFsmsUrl
);

export const getOneEventInfoAction = createAsyncThunkApi(
  'events/getEventInfoAction',
  Apis.GET,
  eventInfoUrl
);

export const editOneEventInfoAction = createAsyncThunkApi(
  'events/editOneEventInfoAction',
  Apis.PATCH,
  eventInfoUrl,
  {
    bodyCreator: ({ workshopPlayerId }) => ({
      player_workshop: workshopPlayerId,
    }),
  }
);

export const getAllRegistrationReceiptsAction = createAsyncThunkApi(
  'events/getAllRegistrationReceiptsAction',
  Apis.GET,
  allRegistrationReceiptsUrl
);

export const getOneRegistrationReceiptAction = createAsyncThunkApi(
  'events/getOneRegistrationReceiptAction',
  Apis.GET,
  oneRegistrationReceiptUrl
);

export const validateRegistrationReceiptAction = createAsyncThunkApi(
  'events/validateRegistrationReceiptAction',
  Apis.POST,
  validateRegistrationReceiptUrl,
  {
    defaultNotification: {
      success: 'وضعیت رسید ثبت‌نام با موفقیت ثبت شد.',
    },
  }
);

export const getEventTeamsAction = createAsyncThunkApi(
  'events/getEventTeamsAction',
  Apis.GET,
  getTeamsUrl
);

export const createWorkshopAction = createAsyncThunkApi(
  'events/createWorkshopAction',
  Apis.POST,
  workshopCRUDUrl
);

export const getAllWorkshopsInfoAction = createAsyncThunkApi(
  'events/getAllWorkshopsInfoAction',
  Apis.GET,
  workshopCRUDUrl
);

export const getEventWorkshopsAction = createAsyncThunkApi(
  'events/getEventWorkshopsAction',
  Apis.GET,
  getWorkshopsUrl,
);

export const addMentorToWorkshopAction = createAsyncThunkApi(
  'events/addMentorToWorkshopAction',
  Apis.POST,
  addMentorToWorkshopUrl,
  {
    defaultNotification: {
      success: 'همیار با موفقیت اضافه شد.',
    },
  }
);

export const getPlayerFromTeamAction = createAsyncThunkApi(
  'events/removeEdgeAction',
  Apis.POST,
  getPlayerFromTeamUrl,
  {
    bodyCreator: ({ teamId }) => ({
      team: teamId,
    }),
  }
);

export const makeTeamHeadAction = createAsyncThunkApi(
  'events/makeTeamHeadAction',
  Apis.POST,
  makeTeamHeadUrl,
  {
    bodyCreator: ({ receipt }) => ({
      receipt,
    }),
    defaultNotification: {
      success: 'سرگروه تیم با موفقیت تغییر کرد.',
    },
  }
);


const initialState = {
  isFetching: false,
  allRegistrationReceipts: [],
  widgets: [],
  events: [],
  allEventTeams: [],
  requestTeams: {},
  allEventWorkshops: [],
  myWorkshops: [],
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

export const getRequestMentorAction = createAsyncThunk(
  'requestMentor/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const requests = await getRequests();
      const requestTeams = {};
      requests.forEach((request) => {
        const teamId = request.get('teamId');
        const playerId = request.get('playerId');
        const fsmId = request.get('fsmId');
        requestTeams[teamId + '.' + fsmId] = playerId;
      });
      return { requestTeams };
    } catch (err) {
      return rejectWithValue({
        message: 'مشکلی در دریافت درخواست‌‌های همیار وجود داشت.',
      });
    }
  }
);

export const deleteRequestMentorAction = createAsyncThunk(
  'requestMentor/delete',
  async ({ teamId, fsmId }, { rejectWithValue }) => {
    try {
      await deleteRequest({ teamId, fsmId });
    } catch (err) {
      return rejectWithValue({
        message: 'مشکلی در پاک‌کردن درخواست وجود دارد.',
      });
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    createRequestMentor: (state, { payload: { playerId, teamId, fsmId } }) => {
      state.requestTeams[teamId + '.' + fsmId] = playerId;
    },
    removeRequestMentor: (state, { payload: { teamId, fsmId } }) => {
      delete state.requestTeams[teamId + '.' + fsmId];
    },
  },
  extraReducers: {
    [getPlayerFromTeamAction.fulfilled.toString()]: (state, { payload, meta }) => {
      window.open(
        `https://kamva.academy/join/${payload?.response?.id}/${meta?.arg?.token}/`
      );
    },

    [getRequestMentorAction.fulfilled.toString()]: (state, { payload: { requestTeams } }) => {
      state.requestTeams = requestTeams;
    },

    [deleteRequestMentorAction.fulfilled.toString()]: (state, { meta: { arg } }) => {
      delete state.requestTeams[arg.teamId + '.' + arg.fsmId];
    },

    [getOneEventInfoAction.pending.toString()]: isFetching,
    [getOneEventInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
      state.isFetching = false;
    },
    [getOneEventInfoAction.rejected.toString()]: isNotFetching,

    [getAllRegistrationReceiptsAction.pending.toString()]: isFetching,
    [getAllRegistrationReceiptsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allRegistrationReceipts = response;
      state.isFetching = false;
    },
    [getAllRegistrationReceiptsAction.rejected.toString()]: isNotFetching,

    [getMentoredFsmsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.myWorkshops = response;
    },


    [getAllEventsInfoAction.pending.toString()]: isFetching,
    [getAllEventsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = response.results;
      state.eventsCount = response.count;
      state.isFetching = false;
    },
    [getAllEventsInfoAction.rejected.toString()]: isNotFetching,


    [getEventTeamsAction.pending.toString()]: isFetching,
    [getEventTeamsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allEventTeams = response;
      state.isFetching = false;
    },
    [getEventTeamsAction.rejected.toString()]: isNotFetching,

    [getEventWorkshopsAction.pending.toString()]: isFetching,
    [getEventWorkshopsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allEventWorkshops = response?.results;
      state.workshopsCount = response.count;
      state.isFetching = false;
    },
    [getEventWorkshopsAction.rejected.toString()]: isNotFetching,

    [createWorkshopAction.pending.toString()]: isFetching,
    [createWorkshopAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allEventWorkshops = [...state.allEventWorkshops, response];
      state.isFetching = false;
    },
    [createWorkshopAction.rejected.toString()]: isNotFetching,


    [makeTeamHeadAction.pending.toString()]: isFetching,
    [makeTeamHeadAction.fulfilled.toString()]: (state, action) => {
      let newAllEventTeams = [...state.allEventTeams];
      for (let i = 0; i < newAllEventTeams.length; i++) {
        if (newAllEventTeams[i].id == action.payload.response.id) {
          newAllEventTeams[i] = action.payload.response;
        }
      }
      state.allEventTeams = newAllEventTeams;
      state.isFetching = false;
    },
    [makeTeamHeadAction.rejected.toString()]: isNotFetching,


    [createTeamAction.pending.toString()]: isFetching,
    [createTeamAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allEventTeams = [response, ...state.allEventTeams];
      state.isFetching = false;
    },
    [createTeamAction.rejected.toString()]: isNotFetching,


    [addUserToTeamAction.pending.toString()]: isFetching,
    [addUserToTeamAction.fulfilled.toString()]: (state, action) => {
      let newAllEventTeams = [...state.allEventTeams];
      for (let i = 0; i < newAllEventTeams.length; i++) {
        if (newAllEventTeams[i].id == action.payload.response.id) {
          newAllEventTeams[i] = action.payload.response;
        }
      }
      state.allEventTeams = newAllEventTeams;
      state.isFetching = false;
    },
    [addUserToTeamAction.rejected.toString()]: isNotFetching,


    [getOneRegistrationReceiptAction.pending.toString()]: isFetching,
    [getOneRegistrationReceiptAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrationReceipt = response;
      state.isFetching = false;
    },
    [getOneRegistrationReceiptAction.rejected.toString()]: isNotFetching,


    [addTeamsViaCSVAction.pending.toString()]: isFetching,
    [addTeamsViaCSVAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      window.location.reload();
      state.isFetching = false;
    },
    [addTeamsViaCSVAction.rejected.toString()]: isNotFetching,


    [getRegistrationFormAction.pending.toString()]: isFetching,
    [getRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.widgets = response.widgets;
      state.isFetching = false;
    },
    [getRegistrationFormAction.rejected.toString()]: isNotFetching,

    [createWidgetAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.widgets = [...state.widgets, response];
    },
    [deleteWidgetAction.fulfilled.toString()]: (state, action) => {
      const newWidgets = [...state.widgets];
      for (let i = 0; i < newWidgets.length; i++) {
        if (newWidgets[i].id === action.meta.arg.widgetId) {
          newWidgets.splice(i, 1);
        }
      }
      state.widgets = newWidgets;
    },
    [updateWidgetAction.fulfilled.toString()]: (state, action) => {
      const newWidgets = [...state.widgets];
      for (let i = 0; i < newWidgets.length; i++) {
        if (newWidgets[i].id === action.meta.arg.widgetId) {
          newWidgets[i] = action.payload.response;
        }
      }
      state.widgets = newWidgets;
    },

  },
});

export const {
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
} = eventSlice.actions;

export const { reducer: eventsReducer } = eventSlice;
