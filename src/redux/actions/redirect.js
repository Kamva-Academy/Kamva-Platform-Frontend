import * as actionTypes from './actionTypes';

export const initRedirect = () => ({
  type: actionTypes.INIT_REDIRECT,
});

export const redirect = (url = '/') => ({
  type: actionTypes.REDIRECT,
  payload: url,
});
