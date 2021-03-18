import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as urls from './urls';

export const paymentRequest = ({ amount = 70000, participant_id }) => ({
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
        amount,
        participant_id,
      }),
    },
  },
});