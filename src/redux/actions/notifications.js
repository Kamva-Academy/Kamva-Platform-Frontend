import * as actionTypes from './actionTypes';

export const closeSnackbar = (key) => ({
  type: actionTypes.CLOSE_SNACKBAR,
  dismissAll: !key,
  key,
});

export const removeSnackbar = (key) => ({
  type: actionTypes.REMOVE_SNACKBAR,
  key,
});

export const addNotification = ({ message, type }) => ({
  type:
    type === 'success'
      ? actionTypes.SHOW_SUCCESS_MESSAGE
      : actionTypes.SHOW_ERROR_MESSAGE,
  message: message,
});
