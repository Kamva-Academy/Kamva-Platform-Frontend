import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  makeAnswerEmptyUrl,
  sendWidgetAnswerUrl,
  widgetCRUDUrl,
  uploadFileUrl,
  makeWidgetFileEmptyUrl,
} from '../constants/urls';

import { InitialStateType } from 'types/redux/widget';

const initialState: InitialStateType = {
  hints: {},
  isFetching: false,
  workshops: [],
  articles: [],
  teams: [],
  notifications: [],
  problems: [],
  submissions: [],
  widgets: {},
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

/////////////////////////// SEND ANSWER ///////////////////////////

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

export const sendInviteeUsernameResponseAction = ({ widgetId, username }) =>
  _sendWidgetAnswerAction({
    widgetId,
    username,
    answer_type: 'InviteeUsernameResponse',
  });

export const sendMultiChoiceAnswerAction = ({ problemId, selectedChoices }) =>
  _sendWidgetAnswerAction({
    widgetId: problemId,
    choices: selectedChoices,
    answer_type: 'MultiChoiceAnswer',
  });


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

export const makeAnswerFileEmptyAction = createAsyncThunkApi(
  'widget/makeAnswerFileEmptyAction',
  Apis.GET,
  makeAnswerEmptyUrl,
  {
    defaultNotification: {
      success: 'پاسخ شما با موفقیت حذف شد.',
      error: 'مشکلی در حذف‌کردن پاسخ وجود داشت.',
    },
  }
);


//////////////// GET AND DELETE WIDGETS ////////////////


export const getWidgetAction = createAsyncThunkApi(
  'widget/getWidgetAction',
  Apis.GET,
  widgetCRUDUrl,
);

export const deleteWidgetAction = createAsyncThunkApi(
  'widget/widgets/delete',
  Apis.DELETE,
  widgetCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.'
    },
  }
);

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

/////////////////////////// CREATE AND UPDATE WIDGETS ///////////////////////////


export const _createWidgetAction = createAsyncThunkApi(
  'widget/widget/create',
  Apis.POST,
  widgetCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در ایجاد ویجت وجود داشت.'
    },
  }
);

export const _createFileWidgetAction = createAsyncThunkApi(
  'widget/widget/create',
  Apis.POST_FORM_DATA,
  widgetCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در ایجاد ویجت وجود داشت.'
    },
  }
);

export const _longLastingCreateFileWidgetAction = createAsyncThunkApi(
  'widget/widget/create',
  Apis.LONG_LASTING_POST_FORM_DATA,
  widgetCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در ایجاد ویجت وجود داشت.'
    },
  }
);

export const _updateWidgetAction = createAsyncThunkApi(
  'widget/updateWidgetAction',
  Apis.PATCH,
  widgetCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در به‌روز‌رسانی ویجت وجود داشت.'
    },
  }
);

export const _updateFileWidgetAction = createAsyncThunkApi(
  'widget/updateWidgetAction',
  Apis.PATCH_FORM_DATA,
  widgetCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در به‌روز‌رسانی ویجت وجود داشت.'
    },
  }
);

export const _longLastingUpdateFileWidgetAction = createAsyncThunkApi(
  'widget/updateWidgetAction',
  Apis.LONG_LASTING_PATCH_FORM_DATA,
  widgetCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در به‌روز‌رسانی ویجت وجود داشت.'
    },
  }
);

export const createVideoWidgetAction = (props) =>
  _longLastingCreateFileWidgetAction({
    ...props,
    widget_type: 'Video',
  });

export const updateVideoWidgetAction = (props) =>
  _longLastingUpdateFileWidgetAction({
    ...props,
    widget_type: 'Video',
  });

export const createAudioWidgetAction = (props) =>
  _createFileWidgetAction({
    ...props,
    widget_type: 'Audio',
  });

export const updateAudioWidgetAction = (props) =>
  _updateFileWidgetAction({
    ...props,
    widget_type: 'Audio',
  });

export const createMiniGameWidgetAction = ({ paper, link, onSuccess }) =>
  _createWidgetAction({
    paper,
    widget_type: 'Game',
    link,
    onSuccess,
  });

export const updateMiniGameWidgetAction = ({ paper, link, widgetId, onSuccess }) =>
  _updateWidgetAction({
    paper,
    widget_type: 'Game',
    link,
    widgetId,
    onSuccess,
  });

export const createImageWidgetAction = (props) =>
  _createFileWidgetAction({
    ...props,
    widget_type: 'Image',
  });

export const updateImageWidgetAction = (props) =>
  _updateFileWidgetAction({
    ...props,
    widget_type: 'Image',
  });

export const createTextWidgetAction = ({ paper, text, onSuccess }) =>
  _createWidgetAction({
    paper,
    widget_type: 'TextWidget',
    text,
    onSuccess,
  });

export const updateTextWidgetAction = ({ paper, text, widgetId, onSuccess }) =>
  _updateWidgetAction({
    paper,
    widget_type: 'TextWidget',
    text,
    widgetId,
    onSuccess,
  });

export const createDetailBoxWidgetAction = ({ paperId, title, details, onSuccess }) =>
  _createWidgetAction({
    paper: paperId,
    widget_type: 'DetailBoxWidget',
    title,
    details,
    onSuccess,
  });

export const updateDetailBoxWidgetAction = ({ paperId, widgetId, title, details, onSuccess }) =>
  _updateWidgetAction({
    paper: paperId,
    widget_type: 'DetailBoxWidget',
    title,
    details,
    widgetId,
    onSuccess,
  });

export const createUploadFileWidgetAction = ({ paper, text, solution, onSuccess }) =>
  _createWidgetAction({
    paper,
    widget_type: 'UploadFileProblem',
    text,
    solution,
    onSuccess,
  });

export const updateUploadFileWidgetAction = ({ paper, text, widgetId, solution, onSuccess }) =>
  _updateWidgetAction({
    paper,
    widget_type: 'UploadFileProblem',
    text,
    widgetId,
    solution,
    onSuccess,
  });

export const createSmallAnswerProblemWidgetAction = ({ paper, text, answer, solution, onSuccess }) =>
  answer
    ? _createWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      solution,
      answer: {
        text: answer,
        answer_type: 'SmallAnswer',
      },
      onSuccess,
    })
    : _createWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      solution,
      onSuccess,
    })

export const updateSmallAnswerProblemWidgetAction = ({ paper, text, widgetId, answer, solution, onSuccess }) =>
  answer
    ? _updateWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      widgetId,
      solution,
      answer: {
        text: answer,
        answer_type: 'SmallAnswer',
      },
      onSuccess,
    })
    : _updateWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      widgetId,
      solution,
      onSuccess,
    })

export const createBigAnswerQuestionWidgetAction = ({ paper, text, solution, onSuccess }) =>
  _createWidgetAction({
    paper,
    widget_type: 'BigAnswerProblem',
    text,
    solution,
    onSuccess,
  })

export const updateBigAnswerQuestionWidgetAction = ({ paper, text, widgetId, solution, onSuccess }) =>
  _updateWidgetAction({
    paper,
    widget_type: 'BigAnswerProblem',
    text,
    widgetId,
    solution,
    onSuccess,
  });

export const createMultiChoicesQuestionWidgetAction = ({ paper, text, solution, choices, ...props }) =>
  solution
    ? _createWidgetAction({
      paper,
      widget_type: 'MultiChoiceProblem',
      text,
      solution,
      choices,
      ...props
    })
    : _createWidgetAction({
      paper,
      widget_type: 'MultiChoiceProblem',
      text,
      choices,
      ...props
    })

export const updateMultiChoicesQuestionWidgetAction = ({ paper, text, choices, widgetId, ...props }) =>
  _updateWidgetAction({
    paper,
    widget_type: 'MultiChoiceProblem',
    text,
    choices,
    widgetId,
    ...props
  });

const widgetSlice = createSlice({
  name: 'widgetSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [_sendWidgetAnswerAction.pending.toString()]: isFetching,
    [_sendWidgetAnswerAction.fulfilled.toString()]: isNotFetching,
    [_sendWidgetAnswerAction.rejected.toString()]: isNotFetching,


    [_createWidgetAction.pending.toString()]: isFetching,
    [_createWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.widgets[arg.paper] = [...(state.widgets[arg.paper] || []), response];
      state.isFetching = false;
    },
    [_createWidgetAction.rejected.toString()]: isNotFetching,

    
    [uploadFileAnswerAction.pending.toString()]: isFetching,
    [uploadFileAnswerAction.fulfilled.toString()]: isNotFetching,
    [uploadFileAnswerAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: widgetReducer } = widgetSlice;
