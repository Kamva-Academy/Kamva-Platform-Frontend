import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as urls from './urls';

export const checkPayment = () => ({
  [CALL_API]: {
    types: [
      actionTypes.CHECK_PAYMENT_REQUEST,
      actionTypes.CHECK_PAYMENT_SUCCESS,
      actionTypes.CHECK_PAYMENT_FAILURE,
    ],
    url: urls.CHECK_PAYMENT,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const removePaymentData = () => ({
  type: actionTypes.REMOVE_PAYMENT_DATA,
});