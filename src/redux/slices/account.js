import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  accountCRUDUrl,
  changePasswordUrl,
  institutesUrl,
  discountCRUDUrl,
  merchandiseDiscountCodeUrl,
  loginUrl,
  profileCRUDUrl,
  studentshipCRUDUrl,
  verificationCodeUrl,
} from '../constants/urls';

export const createAccountAction = createAsyncThunkApi(
  'account/createAccountAction',
  Apis.POST,
  accountCRUDUrl,
  {
    bodyCreator: ({ phoneNumber, password, code, firstName, lastName }) => ({
      phone_number: phoneNumber,
      password,
      code,
      first_name: firstName,
      last_name: lastName,
    }),
    defaultNotification: {
      success: 'حساب شما با موفقیت ایجاد شد.',
      error: 'مشکلی در ایجاد حساب وجود داشت.',
    },
  }
);

export const getVerificationCodeAction = createAsyncThunkApi(
  'account/getVerificationCode',
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

export const loginAction = createAsyncThunkApi(
  'account/loginAction',
  Apis.POST,
  loginUrl,
  {
    defaultNotification: {
      success: 'سلام!',
      error: 'نام کاربری یا رمز عبور اشتباه است.',
    },
  }
);

export const changePasswordAction = createAsyncThunkApi(
  'account/changePasswordAction',
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


////////////////


export const updateStudentShipAction = createAsyncThunkApi(
  'account/updateStudentShipAction',
  Apis.PATCH_FORM_DATA,
  studentshipCRUDUrl,
  {
    defaultNotification: {
      success: 'مشخصات دانش‌آموزی با موفقیت به‌روز شدند.',
    },
  }
);

export const createInstitutesAction = createAsyncThunkApi(
  'account/createInstitutesAction',
  Apis.POST,
  institutesUrl,
  {
    defaultNotification: {
      success: 'مدرسه با موفقیت ایجاد شد.',
    },
  }
);

export const getInstitutesAction = createAsyncThunkApi(
  'account/getInstitutesAction',
  Apis.GET,
  institutesUrl
);

// todo: clean these 3 functions
export const getUserAccountAction = createAsyncThunkApi(
  'account/getUserAccountAction',
  Apis.GET,
  accountCRUDUrl
);

export const updateUserInfoAction = createAsyncThunkApi(
  'account/updateUserInfoAction',
  Apis.PATCH_FORM_DATA,
  accountCRUDUrl,
  {
    defaultNotification: {
      success: 'مشخصات فردی با موفقیت به‌روز شدند.',
      error: 'مشکلی در به‌روز‌رسانی اطلاعات وجود داشت.',
    },
  }
);

export const getUserProfileAction = createAsyncThunkApi(
  'account/getUserProfileAction',
  Apis.GET,
  profileCRUDUrl
);


// actions for mentors:

export const getUserStudentshipAction = createAsyncThunkApi(
  'account/getUserStudentshipAction',
  Apis.GET,
  studentshipCRUDUrl,
);

export const createDiscountCodeAction = createAsyncThunkApi(
  'account/createDiscountCodeAction',
  Apis.POST,
  discountCRUDUrl,
  {
    defaultNotification: {
      success: 'کد تخفیف با موفقیت ایجاد شد.',
    },
  }
);

export const deleteDiscountCodeAction = createAsyncThunkApi(
  'account/deleteDiscountCodeAction',
  Apis.DELETE,
  discountCRUDUrl,
  {
    defaultNotification: {
      success: 'کد تخفیف با موفقیت حذف شد.',
    },
  }
);

export const getAllMerchandiseDiscountCodesAction = createAsyncThunkApi(
  'account/getAllMerchandiseDiscountCodesAction',
  Apis.GET,
  merchandiseDiscountCodeUrl,
);


// end of actions for mentors



const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const initialState = {
  // userInfo includes both user account information + user profile information
  userInfo: {},
  institutes: [],
  isFetching: false,
  token: '',
  refresh: '',
  user: {},
  discountCodes: [],
};


const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: () => initialState,
    refreshToken: (state, action) => {
      state.token = action.payload.access;
      state.refresh = action.payload.refresh;
      window.location.reload();
    },
  },

  extraReducers: {
    [loginAction.pending.toString()]: isFetching,
    [loginAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userInfo = response.account;
      state.token = response.access;
      state.refresh = response.refresh;
      state.isFetching = false;
    },
    [loginAction.rejected.toString()]: isNotFetching,


    [createAccountAction.pending.toString()]: isFetching,
    [createAccountAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userInfo = response.account;
      state.token = response.access;
      state.refresh = response.refresh;
      state.isFetching = false;
    },
    [createAccountAction.rejected.toString()]: isNotFetching,


    [changePasswordAction.pending.toString()]: isFetching,
    [changePasswordAction.fulfilled.toString()]: isNotFetching,
    [changePasswordAction.rejected.toString()]: isNotFetching,


    [getUserProfileAction.pending.toString()]: isFetching,
    [getUserProfileAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userInfo = { ...state.userInfo, ...response };
      state.isFetching = false;
    },
    [getUserProfileAction.rejected.toString()]: isNotFetching,


    [getInstitutesAction.pending.toString()]: isFetching,
    [getInstitutesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.institutes = response;
      state.isFetching = false;
    },
    [getInstitutesAction.rejected.toString()]: isNotFetching,


    [getUserAccountAction.pending.toString()]: isFetching,
    [getUserAccountAction.fulfilled.toString()]: isNotFetching,
    [getUserAccountAction.rejected.toString()]: isNotFetching,


    [createInstitutesAction.pending.toString()]: isFetching,
    [createInstitutesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.institutes = [...state.institutes, response,];
      state.newlyAddedInstitute = response;
      state.isFetching = false;
    },
    [createInstitutesAction.rejected.toString()]: isNotFetching,


    [updateUserInfoAction.pending.toString()]: isFetching,
    [updateUserInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userInfo = { ...state.userInfo, ...response }
      state.isFetching = false;
    },
    [updateUserInfoAction.rejected.toString()]: isNotFetching,


    [updateStudentShipAction.pending.toString()]: isFetching,
    [updateStudentShipAction.fulfilled.toString()]: isNotFetching,
    [updateStudentShipAction.rejected.toString()]: isNotFetching,

    // for mentors

    [createDiscountCodeAction.pending.toString()]: isFetching,
    [createDiscountCodeAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.discountCodes = [...state.discountCodes, response]
      state.isFetching = false;
    },
    [createDiscountCodeAction.rejected.toString()]: isNotFetching,


    [deleteDiscountCodeAction.pending.toString()]: isFetching,
    [deleteDiscountCodeAction.fulfilled.toString()]: (state, action) => {
      const discountCodeId = action?.meta?.arg?.discountCodeId;
      const newDiscountCodes = [...state.discountCodes]
      for (let i = 0; i < newDiscountCodes.length; i++) {
        if (newDiscountCodes[i].id == discountCodeId) {
          newDiscountCodes.splice(i, 1);
          break;
        }
      }
      state.discountCodes = newDiscountCodes;
      state.isFetching = false;
    },
    [deleteDiscountCodeAction.rejected.toString()]: isNotFetching,

    [getAllMerchandiseDiscountCodesAction.pending.toString()]: isFetching,
    [getAllMerchandiseDiscountCodesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.discountCodes = response;
      state.isFetching = false;
    },
    [getAllMerchandiseDiscountCodesAction.rejected.toString()]: isNotFetching,
  },
});

export const { logout: logoutAction } =
  accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
