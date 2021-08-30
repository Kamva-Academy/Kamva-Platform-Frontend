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
    bodyCreator: ({ phoneNumber, password, code }) => ({
      phone_number: phoneNumber,
      password,
      code,
    }),
    defaultNotification: {
      success: 'حساب شما با موفقیت ایجاد شد.',
      error: 'ایجاد حساب با مشکل روبه‌رو شد. چند لحظه‌ی دیگر دوباره تلاش کن!',
    },
  }
);

export const updateStudentShipAction = createAsyncThunkApi(
  'users/updateStudentShipAction',
  Apis.PATCH,
  studentshipCRUDUrl,
  {
    defaultNotification: {
      success: 'اطلاعات با موفقیت به‌روز شدند!',
    },
  }
);

export const createInstitutesAction = createAsyncThunkApi(
  'users/createInstitutesAction',
  Apis.POST,
  institutesUrl,
  {
    defaultNotification: {
      success: 'مدرسه با موفقیت ایجاد شد!',
    },
  }
);

export const getInstitutesAction = createAsyncThunkApi(
  'users/getInstitutesAction',
  Apis.GET,
  institutesUrl
);

// todo: clean these 3 functions
export const getUserAccountAction = createAsyncThunkApi(
  'users/getUserAccountAction',
  Apis.GET,
  accountCRUDUrl
);

export const updateUserAccountAction = createAsyncThunkApi(
  'users/updateUserAccountAction',
  Apis.PATCH,
  accountCRUDUrl,
  {
    defaultNotification: {
      success: 'اطلاعات با موفقیت به‌روز شدند.',
    },
  }
);

export const getUserProfileAction = createAsyncThunkApi(
  'users/getUserProfileAction',
  Apis.GET,
  profileCRUDUrl
);

export const changePasswordAction = createAsyncThunkApi(
  'users/changePasswordAction',
  Apis.POST,
  changePasswordUrl,
  {
    bodyCreator: ({ phoneNumber, password, code }) => ({
      phone_number: phoneNumber,
      password,
      code,
    }),
    defaultNotification: {
      success: 'گذرواژه با موفقیت تغییر یافت!',
      error: 'مشکلی وجود دارد، رمز تغییر نکرد.',
    },
  }
);

export const getVerificationCodeAction = createAsyncThunkApi(
  'users/getVerificationCode',
  Apis.POST,
  verificationCodeUrl,
  {
    bodyCreator: ({ phoneNumber, codeType }) => ({
      phone_number: phoneNumber,
      code_type: codeType,
    }),
    defaultNotification: {
      success: 'کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی می‌شود.',
      error: 'مشکلی وجود دارد. چند لحظه دیگر دوباره تلاش کن!',
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
    setMentorToken: (state, { payload: { token } }) => ({
      token,
      user: { is_mentor: true },
    }),
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
    [getUserProfileAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.userProfile = response;
      state.isFetching = false;
    },
    [getUserProfileAction.rejected.toString()]: isNotFetching,

    [createAccountAction.pending.toString()]: isFetching,
    [createAccountAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.userAccount = response.account;
      state.token = response.access;
      state.isFetching = false;
    },
    [createAccountAction.rejected.toString()]: isNotFetching,

    [getInstitutesAction.pending.toString()]: isFetching,
    [getInstitutesAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.institutes = response;
      state.isFetching = false;
    },
    [getInstitutesAction.rejected.toString()]: isNotFetching,

    [getUserAccountAction.pending.toString()]: isFetching,
    [getUserAccountAction.fulfilled.toString()]: isNotFetching,
    [getUserAccountAction.rejected.toString()]: isNotFetching,

    [createInstitutesAction.pending.toString()]: isFetching,
    [createInstitutesAction.fulfilled.toString()]: isNotFetching,
    [createInstitutesAction.rejected.toString()]: isNotFetching,

    [updateUserAccountAction.pending.toString()]: isFetching,
    [updateUserAccountAction.fulfilled.toString()]: isNotFetching,
    [updateUserAccountAction.rejected.toString()]: isNotFetching,

    [updateStudentShipAction.pending.toString()]: isFetching,
    [updateStudentShipAction.fulfilled.toString()]: isNotFetching,
    [updateStudentShipAction.rejected.toString()]: isNotFetching,
  },
});

export const { logout: logoutAction, setMentorToken: setMentorTokenAction } =
  accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
