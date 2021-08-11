import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  accountCRUDUrl,
  changePasswordUrl,
  loginUrl,
  profileCRUDUrl,
  verificationCodeUrl,
} from '../constants/urls';

const initialState = { token: null, user: {} };

export const loginAction = createAsyncThunkApi(
  'users/login',
  Apis.POST,
  loginUrl,
  {
    defaultNotification: {
      success: 'سلام!',
      error: 'نام کاربری یا رمز عبور اشتباه است!',
    },
  }
);

export const createAccountAction = createAsyncThunkApi(
  'users/register',
  Apis.POST_FORM_DATA,
  accountCRUDUrl,
  {
    bodyCreator: ({ phoneNumber, password, code }) => ({ phone_number: phoneNumber, password, code }),
    defaultNotification: {
      success:
        'تبریک! حساب شما با موفقیت ایجاد شد.',
      error: 'ایجاد حساب با مشکل روبه‌رو شد. چند لحظه‌ی دیگر دوباره تلاش کن!',
    },
  }
);

export const getUserAccountAction = createAsyncThunkApi(
  'users/get/userAccount',
  Apis.GET,
  accountCRUDUrl
);

export const updateUserAccountAction = createAsyncThunkApi(
  'users/update/userAccount',
  Apis.PATCH,
  accountCRUDUrl
);

export const getUserProfileAction = createAsyncThunkApi(
  'users/userProfile',
  Apis.GET,
  profileCRUDUrl
);


export const changePasswordAction = createAsyncThunkApi(
  'users/changePassword',
  Apis.POST,
  changePasswordUrl,
  {
    bodyCreator: ({ phoneNumber, password, code }) => ({ phone_number: phoneNumber, password, code }),
    defaultNotification: {
      success: 'حله! رمزت با موفقیت عوض شد.',
      error: 'یه مشکلی وجود داره، رمزت تغییر نکرد!',
    },
  }
);

export const getVerificationCodeAction = createAsyncThunkApi(
  'users/getVerificationCode',
  Apis.POST,
  verificationCodeUrl,
  {
    bodyCreator: ({ phoneNumber, codeType }) => ({ phone_number: phoneNumber, code_type: codeType }),
    defaultNotification: {
      success: 'کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی میشه.',
      error: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره درخواست بده!',
    },
  }
);

export const updateProfileAction = createAsyncThunkApi(
  'users/update-profile',
  Apis.POST,
  profileCRUDUrl,
  {
    defaultNotification: {
      success: 'اطلاعات حساب با موفقیت به‌روز‌رسانی شد!',
      error: 'یه جای کار می‌لنگه! مرگ بر آمریکا',
    },
  }
);

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: {
    [loginAction.pending.toString()]: isFetching,
    [createAccountAction.pending.toString()]: isFetching,
    [changePasswordAction.pending.toString()]: isFetching,
    [getUserProfileAction.pending.toString()]: isFetching,
    [loginAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userAccount = response.account;
      state.token = response.access;
      state.isFetching = false;
    },
    [loginAction.rejected.toString()]: isNotFetching,
    [changePasswordAction.fulfilled.toString()]: isNotFetching,
    [changePasswordAction.rejected.toString()]: isNotFetching,
    [getUserProfileAction.rejected.toString()]: isNotFetching,
    [createAccountAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userAccount = response.account;
      state.token = response.access;
      state.isFetching = false;
    },
    [createAccountAction.rejected.toString()]: isNotFetching,
    [getUserProfileAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userProfile = response;
      state.isFetching = false;
    },

  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
