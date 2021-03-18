import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const getEventRegistrationInfo = ({ event_id, member_uuid }) => ({
  [CALL_API]: {
    types: [
      actionTypes.EVENT_REGISTRATION_INFO_REQUEST,
      actionTypes.EVENT_REGISTRATION_INFO_SUCCESS,
      actionTypes.EVENT_REGISTRATION_INFO_FAILURE,
    ],
    payload: {
      event_id,
    },
    url: URLs.EVENT_REGISTRATION_INFO,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        event_id,
        member_uuid,
      }),
    },
  },
});

export const applyDiscount = ({ discount_code, participant_id, event_id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.APPLY_DISCOUNT_REQUEST,
      actionTypes.APPLY_DISCOUNT_SUCCESS,
      actionTypes.APPLY_DISCOUNT_FAILURE,
    ],
    url: URLs.SUBMIT_DISCOUNT,
    payload: {
      event_id,
    },
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        code: discount_code,
        participant_id,
      }),
    },
  },
});


export const goForPayment = ({ participant_id, event_id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.PAYMENT_REQUEST,
      actionTypes.PAYMENT_SUCCESS,
      actionTypes.PAYMENT_FAILURE,
    ],
    url: URLs.PAYMENT,
    payload: {
      event_id,
      successMessage: 'در حال انتقال به صفحه‌ی پرداخت...',
      failureMessage: 'یه مشکلی وجود داره. چند لحظه دیگه دوباره تلاش کن!',
    },
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        participant_id,
      }),
    },
  },
});