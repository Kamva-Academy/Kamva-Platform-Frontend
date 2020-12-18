import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const getLandingData = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_LANDING_REQUEST,
      actionTypes.GET_LANDING_SUCCESS,
      actionTypes.GET_LANDING_FAILURE,
    ],
    url: URLs.GET_LANDING,
    fetchOptions: {
      method: 'GET',
    },
  },
});
