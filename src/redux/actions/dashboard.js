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

export const submitDiscount = ({ discountCode, participant_id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SUBMIT_DISCOUNT_REQUEST,
      actionTypes.SUBMIT_DISCOUNT_SUCCESS,
      actionTypes.SUBMIT_DISCOUNT_FAILURE,
    ],
    url: URLs.SUBMIT_DISCOUNT,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        discountCode,
        participant_id,
      }),
    },
  },
});