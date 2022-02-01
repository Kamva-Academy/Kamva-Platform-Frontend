import { Apis } from '../apis';
import {
  refreshTokenUrl,
} from '../constants/urls';
import { persianMessages } from './messages';

const errorHandler = async (
  state,
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
    case 401: {
      if (error.config.url === 'auth/token/obtain/') {
        break;
      }
      try {
        const response = await Apis.POST(refreshTokenUrl, { refresh: state?.account?.refresh });
        console.log(response)
        dispatch({ type: 'account/refreshToken', payload: { access: response.access, refresh: response.refresh } });
        return rejectWithValue();
      }
      catch (error) {
        dispatch({ type: 'account/logout' });
        return rejectWithValue({
          message: 'نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.',
        });
      }
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


export default errorHandler;