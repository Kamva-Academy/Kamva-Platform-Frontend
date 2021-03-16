/* eslint-disable no-case-declarations */
import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  notifications: [],
};

const getMessage = (actionType, message) => {
  switch (actionType) {
    case actionTypes.LOGIN_SUCCESS:
      return 'خوش آمدید!';
    case actionTypes.CALL_MENTOR_SUCCESS:
      return 'درخواست شما برای منتور‌ها ارسال شد.';
    case actionTypes.SEND_ANSWER_SUCCESS:
      return 'جواب شما با موفقیت ثبت شد!';
    case actionTypes.SEND_ANSWER_FAILURE:
      return 'یک مشکلی هست. جواب شما ثبت نشد!';
    default:
      return message;
  }
};

const getVariant = (type) => {
  switch (type) {
    case actionTypes.SEND_ANSWER_FAILURE:
    case actionTypes.SHOW_ERROR_MESSAGE:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTRATION_FAILURE:
    case actionTypes.VERIFY_CODE_FAILURE:
    case actionTypes.CHANGE_PASSWORD_FAILURE:
      return 'error';
    case actionTypes.CALL_MENTOR_SUCCESS:
    case actionTypes.SEND_ANSWER_SUCCESS:
    case actionTypes.SHOW_SUCCESS_MESSAGE:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTRATION_SUCCESS:
    case actionTypes.VERIFY_CODE_SUCCESS:
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return 'success';
    default:
      return 'info';
  }
};

export default function notifications(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ENQUEUE_SNACKBAR:
      return enquequeSnackbar({ state, ...action });

    case actionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case actionTypes.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };

    case actionTypes.SEND_ANSWER_FAILURE:
    case actionTypes.SEND_ANSWER_SUCCESS:
    case actionTypes.CALL_MENTOR_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SHOW_SUCCESS_MESSAGE:
    case actionTypes.SHOW_ERROR_MESSAGE:
    case actionTypes.REGISTRATION_SUCCESS:
    case actionTypes.REGISTRATION_FAILURE:
    case actionTypes.VERIFY_CODE_SUCCESS:
    case actionTypes.VERIFY_CODE_FAILURE:
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
    case actionTypes.CHANGE_PASSWORD_FAILURE:
      const variant = getVariant(action.type);
      const message =
        variant === 'success'
          ? getMessage(action.type, action.message || action.payload.successMessage || action.payload.message)
          : getMessage(action.type, action.error || action.message || action.payload.errorMessage || action.payload.message);
      return enquequeSnackbar({
        state,
        notification: {
          message,
          options: {
            key: new Date().getTime() + Math.random(),
            variant,
            autoHideDuration: 3000,
          },
        },
      });

    default:
      return state;
  }
}

const enquequeSnackbar = ({ state, notification }) => ({
  ...state,
  notifications: [
    ...state.notifications,
    {
      key: notification.options.key,
      ...notification,
    },
  ],
});
