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
  paymentRequestUrl,
  purchaseEventUrl,
  submitDiscountCodeUrl,
  submitRegistrationFormUrl,
} from '../constants/urls';

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
    bodyCreator: ({ answers }) => ({
      answer_sheet_type: "RegistrationReceipt",
      answers,
    }),
  }
);

export const applyDiscountCodeAction = createAsyncThunkApi(
  'events/submitDiscountAction',
  Apis.POST,
  submitDiscountCodeUrl,
)


export const getOneMerchandiseAction = createAsyncThunkApi(
  'events/getOneMerchandiseAction',
  Apis.GET,
  getAllUserMerchandisesUrl,
);


export const purchaseEventUrlAction = createAsyncThunkApi(
  'events/purchaseEventUrlAction',
  Apis.POST,
  purchaseEventUrl,
  {
    defaultNotification: {
      success: 'در حال انتقال به صفحه‌ی پرداخت...',
    },
  }
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
    [getAllEventsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = response;
      state.isFetching = false;
    },
    [getAllEventsInfoAction.rejected.toString()]: isNotFetching,

    [getOneEventInfoAction.pending.toString()]: isFetching,
    [getOneEventInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
      state.isFetching = false;
    },
    [getOneEventInfoAction.rejected.toString()]: isNotFetching,

    [getOneRegistrationFormAction.pending.toString()]: isFetching,
    [getOneRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrationForm = response;
      state.isFetching = false;
    },
    [getOneRegistrationFormAction.rejected.toString()]: isNotFetching,

    [getOneMerchandiseAction.pending.toString()]: isFetching,
    [getOneMerchandiseAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.merchandise = response;
    },
    [getOneMerchandiseAction.rejected.toString()]: isNotFetching,

    [submitRegistrationFormAction.pending.toString()]: isFetching,
    [submitRegistrationFormAction.fulfilled.toString()]: isNotFetching,
    [submitRegistrationFormAction.rejected.toString()]: isNotFetching,

    [purchaseEventUrlAction.pending.toString()]: isFetching,
    [purchaseEventUrlAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      window.location.href = response.payment_link; //todo
    },
    [purchaseEventUrlAction.rejected.toString()]: isNotFetching,

    [applyDiscountCodeAction.pending.toString()]: isFetching,
    [applyDiscountCodeAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.discountedPrice = response.new_price;
    },
    [applyDiscountCodeAction.rejected.toString()]: isNotFetching,

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
