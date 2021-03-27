import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyDiscountUrl,
  getEventRegistrationInfoUrl,
  paymentRequestUrl,
} from '../constants/urls';
import { loginAction } from './account';

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

const initialState = {
  isFetching: false,
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
  reducers: {},
  extraReducers: {
    [loginAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = response.events;
    },
    [getEventRegistrationInfoAction.fulfilled.toString()]: (
      state,
      { payload: { response }, meta: { arg } }
    ) => {
      if (!state.registeredEvents) {
        state.registeredEvents = {};
      }
      state.registeredEvents[arg.eventId] = {
        ...state.registeredEvents[arg.eventId],
        participantId: response.me,
        event: response.event,
        team: response.team,
      };
    },
    [paymentRequestAction.pending.toString()]: isFetching,
    [paymentRequestAction.fulfilled.toString()]: isNotFetching,
    [paymentRequestAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: eventsReducer } = eventSlice;
