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
      message: 'ارتباط با سرور دچار مشکل شده است.',
    });
  }

  if (persianMessages?.[error.response.data?.code]) {
    return rejectWithValue({
      message: persianMessages[error.response.data.code],
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
      if (error.response.config.url.includes('refresh')) {
        dispatch({ type: 'account/logout' });
        return rejectWithValue({
          message: 'نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.',
        });
      } else {
        dispatch({ type: 'account/refreshTokenAction' });
        return;
      }

    // case 404:
    //   return rejectWithValue({
    //     message: 'موردی یافت نشد.',
    //   });
    case 500:
      return rejectWithValue({
        message: 'ایراد سروری پیش آمده! لطفاً ما را در جریان بگذارید.',
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
