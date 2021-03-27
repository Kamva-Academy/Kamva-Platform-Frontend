export const errorHandler = (
  error,
  dispatch,
  rejectWithValue,
  errorMessage,
  showHttpError
) => {
  if (!error.response) {
    return rejectWithValue({
      message: 'ارتباطت با مشکل مواجه شده. یه چند لحظه دیگه دوباره تلاش کن!',
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
        message: 'موردی یافت نشد!',
      });
    case 500:
      return rejectWithValue({
        message: 'ایرادی پیش اومده! لطفا ما را در جریان بذار!',
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
