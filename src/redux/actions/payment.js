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
    fetchOptions: {
      method: 'POST',
      body: jsonToFormData({
        amount,
        participant_id,
      }),
    },
  },
});

export const removePaymentData = () => ({
  type: actionTypes.REMOVE_PAYMENT_DATA,
});