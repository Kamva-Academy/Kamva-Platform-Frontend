import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postApi, postFormDataApi } from '../apis';
import { loginUrl, registerUrl } from '../constants/urls';

const initialState = { token: null, user: {} };

export const loginAction = createAsyncThunk(
  'users/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return {
        response: await postApi(loginUrl, { username, password }),
        message: 'دوباره سلام!',
      };
    } catch {
      return rejectWithValue({ message: 'نام کاربری یا رمز عبورت اشتباهه!' });
    }
  }
);

export const registerAction = createAsyncThunk(
  'users/register',
  async (registrationData, { rejectWithValue }) => {
    try {
      return {
        response: await postFormDataApi(registerUrl, registrationData),
        message:
          'ایول! ثبت‌نامت با موفقیت انجام شد. یه پیامک برات میاد که جزئیات ثبت‌نامت توشه.',
      };
    } catch {
      return rejectWithValue({
        message:
          'ثبت‌نامت با مشکل روبه‌رو شده. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
  }
);

export const getVerificationCodeAction = createAsyncThunk(
  'users/getVerificationCode',
  async ({ phone, codeType }, { rejectWithValue }) => {
    try {
      return {
        response: await postApi({ phone, code_type: codeType }),
        message: 'کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی میشه.',
      };
    } catch {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره درخواست بده!',
      });
    }
  }
);

export const changePasswordAction = createAsyncThunk(
  'users/changePassword',
  async ({ phone, password, verificationCode }, { rejectWithValue }) => {
    try {
      return {
        response: await postApi({
          phone,
          password,
          verify_code: verificationCode,
        }),
        message: 'حله! رمزت با موفقیت عوض شد.',
      };
    } catch {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره، رمزت تغییر نکرد!',
      });
    }
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
    [registerAction.pending.toString()]: isFetching,
    [changePasswordAction.pending.toString()]: isFetching,

    [loginAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.user = response.user_info;
      state.token = response.access;
      state.isFetching = false;
    },
    [loginAction.rejected.toString()]: isNotFetching,
    [changePasswordAction.fulfilled.toString()]: isNotFetching,
    [changePasswordAction.rejected.toString()]: isNotFetching,
    [registerAction.fulfilled.toString()]: isNotFetching,
    [registerAction.rejected.toString()]: isNotFetching,
  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
