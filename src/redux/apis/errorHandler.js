import { persianMessages } from './messages';

export const errorHandler = (
  error,
  dispatch,
  rejectWithValue,
  errorMessage,
  showHttpError
) => {

  console.log(error.response)


  if (!error.response) {
    return rejectWithValue({
      message: 'ارتباطت با مشکل مواجه شده. یه چند لحظه دیگه دوباره تلاش کن!',
    });
  }

  console.log(error.response)


  if (error.response.data?.code && persianMessages[error.response.data?.code]) {
    return rejectWithValue({
      message: persianMessages[error.response.data?.code]
    });
  }

  console.log(error.response)


  switch (error.response.status) {
    case 401:
      console.log(error.response)
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
