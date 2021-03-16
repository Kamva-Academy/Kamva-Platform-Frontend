import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const getEventRegistrationInfo = ({ eventId }) => ({
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
        eventId,
      }),
    },
  },
});