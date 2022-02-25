import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyDiscountUrl,
  deleteInvitationUrl,
  getAllEventsInfoUrl,
  getAllUserMerchandisesUrl,
  getCertificateUrl,
  getEventRegistrationInfoUrl,
  getMyInvitationsUrl,
  getOneEventInfoUrl,
  getOneRegistrationFormUrl,
  getTeamInvitationsUrl,
  getTeamUrl,
  getWorkshopsUrl,
  inviteSomeoneUrl,
  paymentRequestUrl,
  purchaseEventUrl,
  registrationReceiptUrl,
  respondInvitationUrl,
  submitDiscountCodeUrl,
  submitRegistrationFormUrl,
  TeamCRUDUrl,
  uploadFileUrl,
} from '../constants/urls';

export const getEventWorkshopsAction = createAsyncThunkApi(
  'events/getEventWorkshopsAction',
  Apis.GET,
  getWorkshopsUrl
);

export const getAllEventsInfoAction = createAsyncThunkApi(
  'events/getAllEventsInfoAction',
  Apis.GET,
  getAllEventsInfoUrl
);

export const getOneEventInfoAction = createAsyncThunkApi(
  'events/getOneEventInfoAction',
  Apis.GET,
  getOneEventInfoUrl
);

export const getOneRegistrationFormAction = createAsyncThunkApi(
  'events/getOneRegistrationFormAction',
  Apis.GET,
  getOneRegistrationFormUrl
);

export const submitRegistrationFormAction = createAsyncThunkApi(
  'events/submitRegistrationFormAction',
  Apis.POST,
  submitRegistrationFormUrl,
  {
    bodyCreator: ({ answers }) => ({
      answer_sheet_type: 'RegistrationReceipt',
      answers,
    }),
    defaultNotification: {
      success: 'فرم ثبت‌نام با موفقیت ثبت شد!',
    },
  }
);

export const applyDiscountCodeAction = createAsyncThunkApi(
  'events/applyDiscountCodeAction',
  Apis.POST,
  submitDiscountCodeUrl,
  {
    defaultNotification: {
      success: 'کد تخفیف با موفقیت اعمال شد!',
    },
  }
);

export const getOneMerchandiseAction = createAsyncThunkApi(
  'events/getOneMerchandiseAction',
  Apis.GET,
  getAllUserMerchandisesUrl
);

export const purchaseEventAction = createAsyncThunkApi(
  'events/purchaseEventAction',
  Apis.POST,
  purchaseEventUrl,
  {
    defaultNotification: {
      success: 'در حال انتقال به صفحه‌ی پرداخت...',
      error:
        'مشکلی در ارتباط با سرور پرداخت وجود دارد. اگر از VPN استفاده می‌کنید، آن را خاموش کن!',
    },
  }
);

export const getOneRegistrationReceiptAction = createAsyncThunkApi(
  'events/getOneRegistrationReceiptAction',
  Apis.GET,
  registrationReceiptUrl
);

export const uploadFileAction = createAsyncThunkApi(
  'events/uploadFileAction',
  Apis.POST_FORM_DATA,
  uploadFileUrl,
  {
    bodyCreator: ({ answerFile, widgetId, name }) => ({
      answer_file: answerFile,
      problem: widgetId,
      file_name: name,
      is_final_answer: true,
    }),
  }
);

export const getTeamAction = createAsyncThunkApi(
  'events/getTeamAction',
  Apis.GET,
  getTeamUrl
);

export const getTeamInvitationsAction = createAsyncThunkApi(
  'events/getTeamInvitationsAction',
  Apis.GET,
  getTeamInvitationsUrl
);

export const getMyInvitationsAction = createAsyncThunkApi(
  'events/getMyInvitationsAction',
  Apis.GET,
  getMyInvitationsUrl
);

export const inviteSomeoneAction = createAsyncThunkApi(
  'events/inviteSomeoneAction',
  Apis.POST,
  inviteSomeoneUrl,
  {
    defaultNotification: {
      success: 'دعوت‌نامه‌ی شما با موفقیت ارسال شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

export const deleteInvitationAction = createAsyncThunkApi(
  'events/deleteInvitationAction',
  Apis.DELETE,
  deleteInvitationUrl,
  {
    defaultNotification: {
      success: 'دعوت‌نامه پس گرفته شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

export const respondInvitationAction = createAsyncThunkApi(
  'events/respondInvitationAction',
  Apis.POST,
  respondInvitationUrl,
  {
    defaultNotification: {
      success: 'پاسخ به دعوت‌نامه با موفقیت ثبت شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

export const createTeamAction = createAsyncThunkApi(
  'events/createTeamAction',
  Apis.POST,
  TeamCRUDUrl,
  {
    defaultNotification: {
      success: 'تیم با موفقیت ساخته شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

export const deleteTeamAction = createAsyncThunkApi(
  'events/deleteTeamAction',
  Apis.DELETE,
  TeamCRUDUrl,
  {
    defaultNotification: {
      success: 'تیم با موفقیت حذف شد.',
      error: 'مشکلی وجود داشت. .',
    },
  }
);

export const getEventRegistrationInfoAction = createAsyncThunkApi(
  'events/getEventRegistrationInfo',
  Apis.POST,
  getEventRegistrationInfoUrl,
  {
    bodyCreator: ({ eventId, memberUuid }) => ({
      event_id: eventId,
      member_uuid: memberUuid,
    }),
  }
);

export const paymentRequestAction = createAsyncThunkApi(
  'events/paymentRequest',
  Apis.POST,
  paymentRequestUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
    defaultNotification: {
      success: 'در حال انتقال به صفحه‌ی پرداخت...',
    },
  }
);

export const applyDiscountAction = createAsyncThunkApi(
  'events/applyDiscount',
  Apis.POST,
  applyDiscountUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
  }
);

export const getCertificateAction = createAsyncThunkApi(
  'events/getCertificate',
  Apis.GET,
  getCertificateUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت گواهی حضور وجود داشت. .',
    },
  }
);


const initialState = {
  isFetching: false,
  getWorkshopsLoading: false,
  workshops: [],
  events: [],
  registeredEvents: {},
  uploadedFile: { link: '', name: '', value: '' },
  myInvitations: [],
  teamInvitations: [],
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: {
    [getEventWorkshopsAction.pending.toString()]: (state) => {
      state.getWorkshopsLoading = true;
    },
    [getEventWorkshopsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.getWorkshopsLoading = false;
      state.workshops = response.results;
      state.eventWorkshopsCount = response.count;
    },
    [getEventWorkshopsAction.rejected.toString()]: (state) => {
      state.getWorkshopsLoading = false;
    },

    [getAllEventsInfoAction.pending.toString()]: isFetching,
    [getAllEventsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = response.results;
      state.isFetching = false;
    },
    [getAllEventsInfoAction.rejected.toString()]: isNotFetching,

    [getOneEventInfoAction.pending.toString()]: isFetching,
    [getOneEventInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
      state.isFetching = false;
    },
    [getOneEventInfoAction.rejected.toString()]: isNotFetching,

    [getOneRegistrationFormAction.pending.toString()]: isFetching,
    [getOneRegistrationFormAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.registrationForm = response;
      state.isFetching = false;
    },
    [getOneRegistrationFormAction.rejected.toString()]: isNotFetching,

    [getOneMerchandiseAction.pending.toString()]: isFetching,
    [getOneMerchandiseAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.merchandise = response;
    },
    [getOneMerchandiseAction.rejected.toString()]: isNotFetching,

    [submitRegistrationFormAction.pending.toString()]: isFetching,
    [submitRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      window.location.reload()
      state.isFetching = false;
    },
    [submitRegistrationFormAction.rejected.toString()]: isNotFetching,

    [purchaseEventAction.pending.toString()]: isFetching,
    [purchaseEventAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      window.location.href = response.payment_link; //todo
    },
    [purchaseEventAction.rejected.toString()]: isNotFetching,

    [applyDiscountCodeAction.pending.toString()]: isFetching,
    [applyDiscountCodeAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.isFetching = false;
      state.discountedPrice = response.new_price;
    },
    [applyDiscountCodeAction.rejected.toString()]: isNotFetching,

    [getOneRegistrationReceiptAction.pending.toString()]: isFetching,
    [getOneRegistrationReceiptAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.isFetching = false;
      state.receipt = response;
    },
    [getOneRegistrationReceiptAction.rejected.toString()]: isNotFetching,

    [uploadFileAction.pending.toString()]: isFetching,
    [uploadFileAction.fulfilled.toString()]: (state, action) => {
      state.uploadedFile = {
        link: action.payload?.response?.answer_file,
        id: action.payload?.response?.id,
        name: action?.meta?.arg?.answerFile?.name,
      };
      state.isFetching = false;
    },
    [uploadFileAction.rejected.toString()]: (state) => {
      state.uploadedFile = '';
      state.isFetching = false;
    },

    [getTeamAction.pending.toString()]: isFetching,
    [getTeamAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.isFetching = false;
      state.team = response;
    },
    [getTeamAction.rejected.toString()]: isNotFetching,

    [getTeamInvitationsAction.pending.toString()]: isFetching,
    [getTeamInvitationsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.isFetching = false;
      state.teamInvitations = response;
    },
    [getTeamInvitationsAction.rejected.toString()]: isNotFetching,

    [inviteSomeoneAction.pending.toString()]: isFetching,
    [inviteSomeoneAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.isFetching = false;
      state.teamInvitations = [response, ...state.teamInvitations];
    },
    [inviteSomeoneAction.rejected.toString()]: isNotFetching,

    [deleteInvitationAction.pending.toString()]: isFetching,
    [deleteInvitationAction.fulfilled.toString()]: (state, action) => {
      state.isFetching = false;
      let newTeamInvitations = [...state.teamInvitations];
      for (let i = 0; i < newTeamInvitations.length; i++) {
        if (newTeamInvitations[i].id == action.meta.arg.invitationId) {
          newTeamInvitations.splice(i, 1); // todo
        }
      }
      state.teamInvitations = newTeamInvitations;
    },
    [deleteInvitationAction.rejected.toString()]: isNotFetching,

    [getMyInvitationsAction.pending.toString()]: isFetching,
    [getMyInvitationsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.isFetching = false;
      state.myInvitations = response;
    },
    [getMyInvitationsAction.rejected.toString()]: isNotFetching,

    [respondInvitationAction.pending.toString()]: isFetching,
    [respondInvitationAction.fulfilled.toString()]: (state, action) => {
      state.isFetching = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // let newMyInvitations = [...state.myInvitations];
      // for (let i = 0; i < newMyInvitations.length; i++) {
      //   if (newMyInvitations[i].id == action.meta.arg.invitationId) {
      //     newMyInvitations[i] = action.payload.response; //todo
      //   }
      // }
      // state.myInvitations = newMyInvitations;
    },
    [respondInvitationAction.rejected.toString()]: isNotFetching,

    [createTeamAction.pending.toString()]: isFetching,
    [createTeamAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      state.team = response;
    },
    [createTeamAction.rejected.toString()]: isNotFetching,


    [deleteTeamAction.pending.toString()]: isFetching,
    [deleteTeamAction.fulfilled.toString()]: (state, action) => {
      state.isFetching = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    [deleteTeamAction.rejected.toString()]: isNotFetching,


    [getCertificateAction.pending.toString()]: isFetching,
    [getCertificateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.certificateLink = response.certificate;
      state.isFetching = false;
    },
    [getCertificateAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: eventsReducer } = eventSlice;
