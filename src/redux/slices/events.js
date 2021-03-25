import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postApi } from '../apis';
import {
  applyDiscountUrl,
  getEventRegistrationInfoUrl,
  paymentRequestUrl,
} from '../constants/urls';
import { loginAction } from './account';

export const getEventRegistrationInfoAction = createAsyncThunk(
  'events/getEventRegistrationInfo',
  async ({ eventId, memberUuid }) => ({
    response: await postApi(getEventRegistrationInfoUrl, {
      event_id: eventId,
      member_uuid: memberUuid,
    }),
    additional: {
      eventId,
    },
  })
);

export const paymentRequestAction = createAsyncThunk(
  'events/paymentRequest',
  async ({ participantId, discountCode }, { rejectWithValue }) => {
    try {
      return {
        response: await postApi(paymentRequestUrl, {
          code: discountCode,
          participant_id: participantId,
        }),
        message: 'در حال انتقال به صفحه‌ی پرداخت...',
      };
    } catch {
      return rejectWithValue({
        message: 'مشکلی وجود داره! یه چند لحظه دیگه دوباره تلاش کنید.',
      });
    }
  }
);

export const applyDiscountAction = createAsyncThunk(
  'events/applyDiscount',
  async ({ discountCode, participantId, eventId }) => ({
    response: await postApi(applyDiscountUrl, {
      code: discountCode,
      participant_id: participantId,
    }),
    additional: {
      event_id: eventId,
    },
  })
);

const initialState = {
  isFetching: false,
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
      { payload: { response, additional } }
    ) => {
      state[additional.eventId] = {
        ...state[additional.eventId],
        participant_id: response.me,
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
