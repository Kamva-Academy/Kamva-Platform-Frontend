import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  accountCRUDUrl,
  changePasswordUrl,
  institutesUrl,
  loginUrl,
  profileCRUDUrl,
  studentshipCRUDUrl,
  studentShipUrl,
  verificationCodeUrl,
} from '../constants/urls';

const initialState = { token: null, user: {} };

export const loginAction = createAsyncThunkApi(
  'users/loginAction',
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
  'users/createAccountAction',
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

export const createStudentShipAction = createAsyncThunkApi(
  'users/createStudentShipAction',
  Apis.POST,
  studentShipUrl,
);

export const updateStudentShipAction = createAsyncThunkApi(
  'users/updateStudentShipAction',
  Apis.PATCH,
  studentshipCRUDUrl,
);

export const getInstitutesAction = createAsyncThunkApi(
  'users/getInstitutesAction',
  Apis.GET,
  institutesUrl,
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
    [loginAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userAccount = response.account;
      state.token = response.access;
      state.isFetching = false;
    },
    [loginAction.rejected.toString()]: isNotFetching,

    [changePasswordAction.pending.toString()]: isFetching,
    [changePasswordAction.fulfilled.toString()]: isNotFetching,
    [changePasswordAction.rejected.toString()]: isNotFetching,

    [getUserProfileAction.pending.toString()]: isFetching,
    [getUserProfileAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userProfile = response;
      console.log(response)
      // state.userAccount = response.account;
      state.isFetching = false;
    },
    [getUserProfileAction.rejected.toString()]: isNotFetching,

    [createAccountAction.pending.toString()]: isFetching,
    [createAccountAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userAccount = response.account;
      state.token = response.access;
      state.isFetching = false;
    },
    [createAccountAction.rejected.toString()]: isNotFetching,

    [getInstitutesAction.pending.toString()]: isFetching,
    [getInstitutesAction.fulfilled.toString()]: isNotFetching,
    [getInstitutesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.institutes = response;
    },
  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
