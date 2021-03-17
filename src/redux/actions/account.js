import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const login = ({ username, email, phone, password }) => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    payload: {
      successMessage: 'دوباره سلام!',
    },
    url: URLs.LOGIN,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        username,
        email,
        phone,
        password
      }),
    },
  },
});

export const register = (data) => ({
  [CALL_API]: {
    types: [
      actionTypes.REGISTRATION_REQUEST,
      actionTypes.REGISTRATION_SUCCESS,
      actionTypes.REGISTRATION_FAILURE,
    ],
    payload: {
      successMessage: 'ایول! ثبت‌نامت با موفقیت انجام شد. یه پیامک برات میاد که جزئیات ثبت‌نامت توشه.',
      errorMessage: 'ثبت‌نامت با مشکل روبه‌رو شده. یه چند لحظه دیگه دوباره تلاش کن!',
    },
    url: URLs.REGISTRATION,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData(data),
    },
  },
});

export const getVerifyCode = ({ phone, code_type }) => ({
  [CALL_API]: {
    types: [
      actionTypes.VERIFY_CODE_REQUEST,
      actionTypes.VERIFY_CODE_SUCCESS,
      actionTypes.VERIFY_CODE_FAILURE,
    ],
    payload: {
      successMessage: 'کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی میشه.',
      errorMessage: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره درخواست بده!',
    },
    url: URLs.VERIFY_CODE,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        phone,
        code_type,
      }),
    },
  },
});

export const changePassword = ({ phone, password }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CHANGE_PASSWORD_REQUEST,
      actionTypes.CHANGE_PASSWORD_SUCCESS,
      actionTypes.CHANGE_PASSWORD_FAILURE,
    ],
    payload: {
      successMessage: 'حله! رمزت با موفقیت عوض شد.',
    },
    url: URLs.CHANGE_PASSWORD,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        phone,
        password,
      }),
    },
  },
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.LOGOUT_FAILURE,
    ],
    url: URLs.LOGOUT,
    fetchOptions: {
      method: 'POST',
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