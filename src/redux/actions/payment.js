import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as urls from './urls';

export const paymentRequest = ({ participant_id, discount_code }) => ({
  [CALL_API]: {
    types: [
      actionTypes.PAYMENT_REQUEST,
      actionTypes.PAYMENT_SUCCESS,
      actionTypes.PAYMENT_FAILURE,
    ],
    url: urls.PAYMENT,
    payload: {
      successMessage: 'در حال انتقال به صفحه‌ی پرداخت...',
      errorMessage: 'مشکلی وجود داره! یه چند لحظه دیگه دوباره تلاش کنید.',
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


export const applyDiscount = ({ discount_code, participant_id, event_id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.APPLY_DISCOUNT_REQUEST,
      actionTypes.APPLY_DISCOUNT_SUCCESS,
      actionTypes.APPLY_DISCOUNT_FAILURE,
    ],
    url: urls.SUBMIT_DISCOUNT,
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
    url: urls.PAYMENT,
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