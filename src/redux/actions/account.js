import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const login = ({ username, password }) => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    url: URLs.LOGIN,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ username, password }),
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

// const fetchUser = () => ({
//   [CALL_API]: {
//     types: [
//       actionTypes.USER_REQUEST,
//       actionTypes.USER_SUCCESS,
//       actionTypes.USER_FAILURE,
//     ],
//     url: URLs.GET_ACCOUNT_BY_USERNAME,
//     fetchOptions: {
//       method: 'GET',
//     },
//   },
// });

// export const loadUser = () => (
//   dispatch,
//   getState
// ) => {
//   const user = getState().users[getState().account.username];
//   if (user) {
//     return null;
//   }
//   return dispatch(fetchUser());
// };
