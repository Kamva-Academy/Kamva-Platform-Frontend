import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyDiscountUrl,
  getAllEventsInfoUrl,
  getAllUserMerchandisesUrl,
  getEventRegistrationInfoUrl,
  getOneEventInfoUrl,
  getOneRegistrationFormUrl,
  getWorkshopsDescriptionUrl,
  goForPurchaseUrl,
  paymentRequestUrl,
  submitRegistrationFormUrl,
} from '../constants/urls';
import { loginAction } from './account';

export const getAllEventsInfoAction = createAsyncThunkApi(
  'events/getAllEventsInfoAction',
  Apis.GET,
  getAllEventsInfoUrl,
);

export const getOneEventInfoAction = createAsyncThunkApi(
  'events/getOneEventInfoAction',
  Apis.GET,
  getOneEventInfoUrl,
);

export const getOneRegistrationFormAction = createAsyncThunkApi(
  'events/getOneRegistrationForm',
  Apis.GET,
  getOneRegistrationFormUrl,
);

export const submitRegistrationFormAction = createAsyncThunkApi(
  'events/submitRegistrationFormAction',
  Apis.POST,
  submitRegistrationFormUrl,
  {
    bodyCreator: ({ answer_sheet_type, answers }) => ({
      answer_sheet_type, answers: [],
    }),
  }
);


export const getOneMerchandiseAction = createAsyncThunkApi(
  'events/getOneMerchandiseAction',
  Apis.GET,
  getAllUserMerchandisesUrl,
);


export const goForPurchaseUrlAction = createAsyncThunkApi(
  'events/goForPurchaseUrlAction',
  Apis.POST,
  goForPurchaseUrl,
);







export const getEventRegistrationInfoAction = createAsyncThunkApi(
  'events/getEventRegistrationInfo',
  Apis.POST,
  getEventRegistrationInfoUrl,
  {
    bodyCreator: ({ eventId, memberUuid }) => ({
      event_id: eventId,
      member_uuid: memberUuid,
    }),
  }
);

export const paymentRequestAction = createAsyncThunkApi(
  'events/paymentRequest',
  Apis.POST,
  paymentRequestUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
    defaultNotification: {
      success: 'در حال انتقال به صفحه‌ی پرداخت...',
    },
  }
);

export const applyDiscountAction = createAsyncThunkApi(
  'events/applyDiscount',
  Apis.POST,
  applyDiscountUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
  }
);

export const getWorkshopsDescriptionAction = createAsyncThunkApi(
  'events/getWorkshops',
  Apis.GET,
  getWorkshopsDescriptionUrl
);

const initialState = {
  isFetching: false,
  getWorkshopsLoading: false,
  workshops: [],
  events: [],
  registeredEvents: {},
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: {
    [getAllEventsInfoAction.pending.toString()]: isFetching,
    [getAllEventsInfoAction.rejected.toString()]: isNotFetching,
    [getAllEventsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = response;
      state.isFetching = false;
    },
    [getOneEventInfoAction.pending.toString()]: isFetching,
    [getOneEventInfoAction.rejected.toString()]: isNotFetching,
    [getOneEventInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
      state.isFetching = false;
    },
    [getOneRegistrationFormAction.pending.toString()]: isFetching,
    [getOneRegistrationFormAction.rejected.toString()]: isNotFetching,
    [getOneRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrationForm = response;
      state.isFetching = false;
    },
    [getOneMerchandiseAction.pending.toString()]: isFetching,
    [getOneMerchandiseAction.rejected.toString()]: isNotFetching,
    [getOneMerchandiseAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.merchandise = response;
    },
    [submitRegistrationFormAction.pending.toString()]: isFetching,
    [submitRegistrationFormAction.rejected.toString()]: isNotFetching,
    [submitRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      window.location.reload();
    },

    [goForPurchaseUrlAction.pending.toString()]: isFetching,
    [goForPurchaseUrlAction.rejected.toString()]: isNotFetching,
    [goForPurchaseUrlAction.fulfilled.toString()]: isNotFetching,

    [goForPurchaseUrlAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      console.log(response)
      window.location.href = response.payment_link;
    },

    // [getEventRegistrationInfoAction.fulfilled.toString()]: (
    //   state,
    //   { payload: { response }, meta: { arg } }
    // ) => {
    //   if (!state.registeredEvents) {
    //     state.registeredEvents = {};
    //   }
    //   state.registeredEvents[arg.eventId] = {
    //     ...state.registeredEvents[arg.eventId],
    //     participantId: response.me,
    //     event: response.event,
    //     team: response.team,
    //   };
    // },
    // [paymentRequestAction.pending.toString()]: isFetching,
    // [paymentRequestAction.fulfilled.toString()]: isNotFetching,
    // [paymentRequestAction.rejected.toString()]: isNotFetching,
    // [getWorkshopsDescriptionAction.pending.toString()]: (state) => {
    //   state.getWorkshopsLoading = true;
    // },
    // [getWorkshopsDescriptionAction.rejected.toString()]: (state) => {
    //   state.getWorkshopsLoading = false;
    // },
    // [getWorkshopsDescriptionAction.fulfilled.toString()]: (
    //   state,
    //   { payload: { response } }
    // ) => {
    //   state.workshops = response;
    //   state.getWorkshopsLoading = false;
    // },
  },
});

export const { reducer: eventsReducer } = eventSlice;
