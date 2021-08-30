import { persianMessages } from './messages';

export const errorHandler = (
  error,
  dispatch,
  rejectWithValue,
  errorMessage,
  showHttpError
) => {

  if (!error.response) {
    return rejectWithValue({
      message: 'ارتباط با سرور دچار مشکل شده!',
    });
  }

  if (error.response.data?.code) {
    return rejectWithValue({
      message: persianMessages[error.response.data?.code],
    });
  }

  if (error.response.detail) {
    return rejectWithValue({
      message: error.response.detail,
    });
  }

  switch (error.response.status) {
    case 401:
      if (error.config.url === 'auth/token/obtain/') {
        break;
      }
      dispatch({ type: 'account/logout' });
      return rejectWithValue({
        message: 'لطفا دوباره وارد سامانه شو!',
      });
    case 404:
      return rejectWithValue({
        message: 'موردی یافت نشد.',
      });
    case 500:
      return rejectWithValue({
        message: 'ایراد سروری پیش اومده! لطفاً ما را در جریان بذار.',
      });
  }

  if (errorMessage) {
    return rejectWithValue({ message: errorMessage });
  }

  if (showHttpError && error.response.data?.error) {
    return rejectWithValue({ message: error.response.data.error });
  }

  return rejectWithValue();
};
