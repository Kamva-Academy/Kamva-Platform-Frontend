import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  hintUrl,
  uploadFileUrl,
  stateCRUDUrl,
  widgetCRUDUrl,
  markSubmissionUrl,
  sendWidgetAnswerUrl,
  makeAnswerEmptyUrl,
  makeWidgetFileEmptyUrl,
} from '../constants/urls';
import { InitialStateType } from '../../types/redux/Paper';
import { getArticleAction } from './article';
import { getRegistrationFormAction } from './events';

//////////////// SEND ANSWER ////////////////

export const uploadFileAnswerAction = createAsyncThunkApi(
  'widget/uploadFileAnswerAction',
  Apis.POST_FORM_DATA,
  uploadFileUrl,
  {
    bodyCreator: ({ problemId, answerFile }) => ({
      problem: problemId,
      answer_file: answerFile,
      is_final_answer: true,
    }),
    defaultNotification: {
      success: 'پاسخ شما با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

const _sendWidgetAnswerAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    defaultNotification: {
      success: 'پاسخ شما با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const sendBigAnswerAction = ({ widgetId, text }) =>
  _sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'BigAnswer',
  });

export const sendSmallAnswerAction = ({ widgetId, text }) =>
  _sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'SmallAnswer',
  });

export const sendMultiChoiceAnswerAction = ({ playerId, problemId, answer }) =>
  _sendWidgetAnswerAction({
    player: playerId,
    problem: problemId,
    problem_type: 'ProblemMultiChoice',
    answer: {
      text: answer,
      answer_type: 'MultiChoiceAnswer',
    },
  });


export const makeAnswerEmptyAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.GET,
  makeAnswerEmptyUrl,
  {
    defaultNotification: {
      success: 'پاسخ شما با موفقیت حذف شد.',
      error: 'مشکلی در حذف‌کردن پاسخ وجود داشت.',
    },
  }
);


//////////////// متفرقه ////////////////

export const markSubmissionAction = createAsyncThunkApi(
  'workshops/markSubmission',
  Apis.POST,
  markSubmissionUrl,
  {
    bodyCreator: ({ submissionId, score, description }) => ({
      submission_id: submissionId,
      score,
      description,
    }),
    defaultNotification: {
      success: 'نمره با موفقیت ثبت شد!',
    },
  }
);

export const getOneStateAction = createAsyncThunkApi(
  'workshop/getOneStateAction',
  Apis.GET,
  stateCRUDUrl
);


//////////////// GET, CREATE, UPDATE & DELETE WIDGETS ////////////////

export const makeWidgetFileEmptyAction = createAsyncThunkApi(
  'widget/makeWidgetFileEmptyAction',
  Apis.GET,
  makeWidgetFileEmptyUrl,
  {
    defaultNotification: {
      error: 'مشکلی در حذف فایل وجود داشت.'
    },
  }
);

export const getWidgetAction = createAsyncThunkApi(
  'widget/getWidgetAction',
  Apis.GET,
  widgetCRUDUrl,
);

export const updateWidgetAction = createAsyncThunkApi(
  'widget/updateWidgetAction',
  Apis.PATCH,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت به‌روز شد.',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.'
    },
  }
);

export const createWidgetAction = createAsyncThunkApi(
  'widget/widget/create',
  Apis.POST,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت اضافه شد.',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.'
    },
  }
);

export const deleteWidgetAction = createAsyncThunkApi(
  'widget/widgets/delete',
  Apis.DELETE,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت حذف شد.',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.'
    },
  }
);

export const createVideoWidgetAction = ({ paper, link }) =>
  createWidgetAction({
    paper,
    widget_type: 'Video',
    link,
  });

export const updateVideoWidgetAction = ({ paper, link, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'Video',
    link,
    widgetId,
  });

export const createMiniGameWidgetAction = ({ paper, link }) =>
  createWidgetAction({
    paper,
    widget_type: 'Game',
    link,
  });

export const updateMiniGameWidgetAction = ({ paper, link, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'Game',
    link,
    widgetId,
  });

export const createImageWidgetAction = ({ paper, link }) =>
  createWidgetAction({
    paper,
    widget_type: 'Image',
    link,
  });

export const updateImageWidgetAction = ({ paper, link, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'Image',
    link,
    widgetId,
  });

export const createTextWidgetAction = ({ paper, text }) =>
  createWidgetAction({
    paper,
    widget_type: 'Description',
    text,
  });

export const updateTextWidgetAction = ({ paper, text, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'Description',
    text,
    widgetId,
  });

export const createUploadFileWidgetAction = ({ paper, text }) =>
  createWidgetAction({
    paper,
    widget_type: 'UploadFileProblem',
    text,
  });

export const updateUploadFileWidgetAction = ({ paper, text, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'UploadFileProblem',
    text,
    widgetId,
  });

export const createSmallAnswerProblemWidgetAction = ({ paper, text, answer }) =>
  answer
    ? createWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      answer: {
        text: answer,
        answer_type: 'SmallAnswer',
      },
    })
    : createWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
    })

export const updateSmallAnswerProblemWidgetAction = ({ paper, text, widgetId, answer }) =>
  answer
    ? updateWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      widgetId,
      answer: {
        text: answer,
        answer_type: 'SmallAnswer',
      },
    })
    : updateWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      widgetId,
    })

export const createBigAnswerQuestionWidgetAction = ({ paper, text, solution }) =>
  solution
    ? createWidgetAction({
      paper,
      widget_type: 'BigAnswerProblem',
      text,
      solution: {
        text: solution,
        answer_type: 'BigAnswer',
      },
    })
    : createWidgetAction({
      paper,
      widget_type: 'BigAnswerProblem',
      text,
    })

export const updateBigAnswerQuestionWidgetAction = ({ paper, text, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'BigAnswerProblem',
    text,
    widgetId,
  });

export const createMultiChoicesQuestionWidgetAction = ({ paper, text, solution, choices }) =>
  solution
    ? createWidgetAction({
      paper,
      widget_type: 'MultiChoiceProblem',
      text,
      solution,
      choices,
    })
    : createWidgetAction({
      paper,
      widget_type: 'MultiChoiceProblem',
      text,
      choices,
    })

export const updateMultiChoicesQuestionWidgetAction = ({ paper, text, choices, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'MultiChoiceProblem',
    text,
    choices,
    widgetId,
  });

//////////////// HINT ////////////////

export const createHintAction = createAsyncThunkApi(
  'widget/hints/create',
  Apis.POST,
  hintUrl,
  {
    bodyCreator: ({ stateId }) => ({ reference: stateId, name: 'help' }),
  }
);

export const deleteHintAction = createAsyncThunkApi(
  'widget/hints/delete',
  Apis.DELETE,
  hintUrl,
);

//////////////// UTILITIES ////////////////

const initialState: InitialStateType = {
  papers: {},
  widget: null,
  isFetching: false,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const PaperSlice = createSlice({
  name: 'PaperState',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getOneStateAction.pending.toString()]: isFetching,
    [getOneStateAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.stateId] = response;
      response.hints.forEach((hint) => {
        state.papers[hint.id] = hint;
      })
      state.isFetching = false;
    },
    [getOneStateAction.rejected.toString()]: isNotFetching,

    [getWidgetAction.pending.toString()]: isFetching,
    [getWidgetAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.widget = response;
      state.isFetching = false;
    },
    [getWidgetAction.rejected.toString()]: isNotFetching,

    [createWidgetAction.pending.toString()]: isFetching,
    [createWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.paper] ||= {};
      state.papers[arg.paper].widgets = [...(state.papers[arg.paper].widgets || []), response];
      state.isFetching = false;
    },
    [createWidgetAction.rejected.toString()]: isNotFetching,

    [deleteWidgetAction.pending.toString()]: isFetching,
    [deleteWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      const newWidgets = state.papers[arg.stateId].widgets;
      for (let i = 0; i < newWidgets.length; i++) {
        if (newWidgets[i].id === arg.widgetId) {
          newWidgets.splice(i, 1);
          break;
        }
      }
      state.papers[arg.stateId].widgets = newWidgets;
      state.isFetching = false;
    },
    [deleteWidgetAction.rejected.toString()]: isNotFetching,


    [updateWidgetAction.pending.toString()]: isFetching,
    [updateWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.paper] ||= {};
      const newWidgets = [...(state.papers[arg.paper].widgets || [])];
      for (let i = 0; i < newWidgets.length; i++) {
        if (newWidgets[i].id === arg.widgetId) {
          newWidgets[i] = response;
        }
      }
      state.papers[arg.paper].widgets = newWidgets;
      state.isFetching = false;
    },
    [updateWidgetAction.rejected.toString()]: isNotFetching,

    [createHintAction.pending.toString()]: isFetching,
    [createHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.stateId] ||= {};
      state.papers[arg.stateId].hints = [...(state.papers[arg.stateId].hints || []), response];
      state.papers[response.id] = response;
      state.isFetching = false;
    },
    [createHintAction.rejected.toString()]: isNotFetching,

    [deleteHintAction.pending.toString()]: isFetching,
    [deleteHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      delete state.papers[arg.hintId];
      state.isFetching = false;
    },
    [deleteHintAction.rejected.toString()]: isNotFetching,

    [uploadFileAnswerAction.pending.toString()]: isFetching,
    [uploadFileAnswerAction.fulfilled.toString()]: (state, action) => {
      // state.uploadedFile = {
      //   link: action.payload?.response?.answer_file,
      //   id: action.payload?.response?.id,
      //   name: action?.meta?.arg?.answerFile?.name,
      // };
      state.isFetching = false;
    },
    [uploadFileAnswerAction.rejected.toString()]: (state) => {
      // state.uploadedFile = null;
      state.isFetching = false;
    },

    [makeWidgetFileEmptyAction.pending.toString()]: isFetching,
    [makeWidgetFileEmptyAction.fulfilled.toString()]: (state, { meta: { arg } }) => {
      const newPapers = { ...state.papers }
      const widgets = newPapers[arg.paperId].widgets;
      for (let i = 0; i < widgets.length; i++) {
        if (widgets[i].id == arg.widgetId) {
          widgets[i].file = null;
        }
      }
      state.papers = newPapers;
      state.isFetching = false;
    },
    [makeWidgetFileEmptyAction.rejected.toString()]: isNotFetching,

    [getArticleAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.papers[response.id] = response;
      state.isFetching = false;
    },

    [getRegistrationFormAction.pending.toString()]: isFetching,
    [getRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.papers[response.id] = response;
      state.isFetching = false;
    },
    [getRegistrationFormAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: paperReducer } = PaperSlice;
