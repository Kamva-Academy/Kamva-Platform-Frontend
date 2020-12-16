import { normalize } from 'normalizr';

import fetchApi from '../../../utils/fetchApi';
import * as actionTypes from '../../actions/actionTypes';

export const CALL_API = 'callAPI';

const getRequestOptions = ({ fetchOptions, token }) => ({
  ...fetchOptions,
  headers: {
    ...(!fetchOptions.dontContentType && {
      'Content-Type': 'application/json',
    }),
    ...fetchOptions.headers,
    ...(token && { Authorization: 'JWT ' + token }),
  },
});

const onSuccess = ({
  response,
  schema,
  actionWithoutCallAPI,
  successType,
  next,
}) => {
  response = schema ? normalize(response, schema) : response;
  return next({
    ...actionWithoutCallAPI,
    response,
    type: successType,
  });
};

const ERRORS = {
  SERVER_ERROR: 'ایراد سروری رخ داده‌است! ما رو مطلع کنید.',
  TOKEN_EXPIRED: 'لطفا به سامانه وارد شوید!',
  NOT_FOUND: 'اطلاعات یافت نشد!',
  [actionTypes.LOGIN_FAILURE]: 'نام کاربری یا رمزعبور اشتباه است!',
};

const onFailure = ({ error, actionWithoutCallAPI, failureType, next }) => {
  if (error.message === 'TOKEN_EXPIRED') {
    next({
      type: actionTypes.LOGOUT_REQUEST,
    });
  }
  return next({
    ...actionWithoutCallAPI,
    type: failureType,
    error:
      ERRORS[failureType] ||
      ERRORS[error.message] ||
      error.message ||
      'خطایی رخ داده است!',
  });
};

export default ({ getState }) => (next) => (action) => {
  const { callAPI, ...actionWithoutCallAPI } = action;
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { url, types, schema, fetchOptions } = callAPI;
  const [requestType, successType, failureType] = types;
  next({ ...actionWithoutCallAPI, type: requestType });
  const requestOptions = getRequestOptions({
    fetchOptions,
    token: getState().account.token,
  });

  return fetchApi(url, requestOptions)
    .then((response) =>
      onSuccess({
        response,
        schema,
        actionWithoutCallAPI,
        successType,
        next,
      })
    )
    .catch((error) =>
      onFailure({ error, actionWithoutCallAPI, failureType, next })
    );
};
