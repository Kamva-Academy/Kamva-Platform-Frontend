import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const register = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.REGISTRATION_REQUEST,
      actionTypes.REGISTRATION_SUCCESS,
      actionTypes.REGISTRATION_FAILURE,
    ],
    url: URLs.REGISTRATION,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData(data),
    },
  },
});


export const getVerifyCode = ({ phone }) => ({
  [CALL_API]: {
    types: [
      actionTypes.VERIFY_CODE_REQUEST,
      actionTypes.VERIFY_CODE_SUCCESS,
      actionTypes.VERIFY_CODE_FAILURE,
    ],
    url: URLs.VERIFY_CODE,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        phone,
      }),
    },
  },
});

export const getTeamData = ({ teamCode }) => ({
  [CALL_API]: {
    types: [
      actionTypes.TEAM_DATA_REQUEST,
      actionTypes.TEAM_DATA_SUCCESS,
      actionTypes.TEAM_DATA_FAILURE,
    ],
    url: URLs.TEAM_DATA,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        team_code: teamCode,
      }),
    },
  },
});
