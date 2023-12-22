import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  makeAnswerEmptyUrl,
  sendWidgetAnswerUrl,
  getProblemsUrl,
  getUnreadNotificationsUrl,
  hintUrl,
  markSubmissionUrl,
  statesCRUDUrl,
  visitWorkshopPlayerUrl,
  widgetCRUDUrl,
  workshopTeamsUrl,
} from '../constants/urls';

import { InitialStateType } from '../../types/redux/widget';

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

const sendWidgetAnswerAction = createAsyncThunkApi(
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

export const sendFileAction = createAsyncThunkApi(
  'widget/sendFileAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    bodyCreator: ({ playerId, problemId, answerFile }) => ({
      player: playerId,
      problem: problemId,
      problem_type: 'ProblemUploadFileAnswer',
      answer_file: answerFile,
    }),
    defaultNotification: {
      success: 'پاسخ شما با موفقیت ثبت شد.',
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const sendBigAnswerAction = ({ widgetId, text }) =>
  sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'BigAnswer',
  });

export const sendSmallAnswerAction = ({ widgetId, text }) =>
  sendWidgetAnswerAction({
    widgetId,
    text,
    answer_type: 'SmallAnswer',
  });

export const sendMultiChoiceAnswerAction = ({ playerId, problemId, answer }) =>
  sendWidgetAnswerAction({
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

/////////////////////////// متفرقه ///////////////////////////


export const getUnreadNotificationsAction = createAsyncThunkApi(
  'workshops/getNotifications',
  Apis.GET,
  getUnreadNotificationsUrl
);

export const getProblemsAction = createAsyncThunkApi(
  'workshops/getProblems',
  Apis.GET,
  getProblemsUrl
);

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

/////////////////////////// CREATE AND UPDATE WIDGETS ///////////////////////////

export const updateWidgetAction = createAsyncThunkApi(
  'widget/updateWidgetAction',
  Apis.PATCH,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت به‌روز شد.',
      error: 'مشکلی در به‌روز‌رسانی ویجت وجود داشت.'
    },
  }
);

export const updateFileWidgetAction = createAsyncThunkApi(
  'widget/updateFileWidgetAction',
  Apis.PATCH_FORM_DATA,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت به‌روز شد.',
      error: 'مشکلی در به‌روز‌رسانی ویجت وجود داشت.'
    },
  }
);

export const longLastingUpdateFileWidgetAction = createAsyncThunkApi(
  'widget/updateLongLastingFileWidgetAction',
  Apis.LONG_LASTING_PATCH_FORM_DATA,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت به‌روز شد.',
      error: 'مشکلی در به‌روز‌رسانی ویجت وجود داشت.'
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
      error: 'مشکلی در ایجاد ویجت وجود داشت.'
    },
  }
);

export const createFileWidgetAction = createAsyncThunkApi(
  'widget/widget/createFileWidget',
  Apis.POST_FORM_DATA,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت اضافه شد.',
      error: 'مشکلی در ایجاد ویجت وجود داشت.'
    },
  }
);

export const longLastingCreateFileWidgetAction = createAsyncThunkApi(
  'widget/widget/createLongLastingFile',
  Apis.LONG_LASTING_POST_FORM_DATA,
  widgetCRUDUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت اضافه شد.',
      error: 'مشکلی در ایجاد ویجت وجود داشت.'
    },
  }
);

export const createVideoWidgetAction = (props) =>
  longLastingCreateFileWidgetAction({
    ...props,
    widget_type: 'Video',
  });

export const updateVideoWidgetAction = (props) =>
  longLastingUpdateFileWidgetAction({
    ...props,
    widget_type: 'Video',
  });

export const createAudioWidgetAction = (props) =>
  createFileWidgetAction({
    ...props,
    widget_type: 'Audio',
  });

export const updateAudioWidgetAction = (props) =>
  updateFileWidgetAction({
    ...props,
    widget_type: 'Audio',
  });

export const createMiniGameWidgetAction = ({ paper, link, onSuccess }) =>
  createWidgetAction({
    paper,
    widget_type: 'Game',
    link,
    onSuccess,
  });

export const updateMiniGameWidgetAction = ({ paper, link, widgetId, onSuccess }) =>
  updateWidgetAction({
    paper,
    widget_type: 'Game',
    link,
    widgetId,
    onSuccess,
  });

export const createImageWidgetAction = (props) =>
  createFileWidgetAction({
    ...props,
    widget_type: 'Image',
  });

export const updateImageWidgetAction = (props) =>
  updateFileWidgetAction({
    ...props,
    widget_type: 'Image',
  });

export const createTextWidgetAction = ({ paper, text, onSuccess }) =>
  createWidgetAction({
    paper,
    widget_type: 'TextWidget',
    text,
    onSuccess,
  });

export const updateTextWidgetAction = ({ paper, text, widgetId, onSuccess }) =>
  updateWidgetAction({
    paper,
    widget_type: 'TextWidget',
    text,
    widgetId,
    onSuccess,
  });

export const createDetailBoxWidgetAction = ({ paperId, title, details, onSuccess }) =>
  createWidgetAction({
    paper: paperId,
    widget_type: 'DetailBoxWidget',
    title,
    details,
    onSuccess,
  });

export const updateDetailBoxWidgetAction = ({ paperId, widgetId, title, details, onSuccess }) =>
  updateWidgetAction({
    paper: paperId,
    widget_type: 'DetailBoxWidget',
    title,
    details,
    widgetId,
    onSuccess,
  });

export const createUploadFileWidgetAction = ({ paper, text, solution, onSuccess }) =>
  createWidgetAction({
    paper,
    widget_type: 'UploadFileProblem',
    text,
    solution,
    onSuccess,
  });

export const updateUploadFileWidgetAction = ({ paper, text, widgetId, solution, onSuccess }) =>
  updateWidgetAction({
    paper,
    widget_type: 'UploadFileProblem',
    text,
    widgetId,
    solution,
    onSuccess,
  });

export const createSmallAnswerQuestionWidgetAction = ({ paper, text, solution }) =>
  solution
    ? createWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
      solution: {
        text: solution,
        answer_type: 'SmallAnswer',
      },
    })
    : createWidgetAction({
      paper,
      widget_type: 'SmallAnswerProblem',
      text,
    })

export const updateSmallAnswerQuestionWidgetAction = ({ paper, text, widgetId }) =>
  updateWidgetAction({
    paper,
    widget_type: 'SmallAnswerProblem',
    text,
    widgetId,
  });

export const createBigAnswerQuestionWidgetAction = ({ paper, text, solution, onSuccess }) =>
  createWidgetAction({
    paper,
    widget_type: 'BigAnswerProblem',
    text,
    solution,
    onSuccess,
  })

export const updateBigAnswerQuestionWidgetAction = ({ paper, text, widgetId, solution, onSuccess }) =>
  updateWidgetAction({
    paper,
    widget_type: 'BigAnswerProblem',
    text,
    widgetId,
    solution,
    onSuccess,
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

export const deleteStateAction = createAsyncThunkApi(
  'widget/delete',
  Apis.DELETE,
  statesCRUDUrl,
);

export const getWorkshopTeamsAction = createAsyncThunkApi(
  'workshops/teams/getAll',
  Apis.POST,
  workshopTeamsUrl,
  {
    bodyCreator: ({ fsmId }) => ({ fsm: fsmId }),
  }
);

export const visitWorkshopPlayerAction = createAsyncThunkApi(
  'workshops/teams/visitWorkshopPlayer',
  Apis.POST,
  visitWorkshopPlayerUrl,
  {
    bodyCreator: ({ workshopPlayerId }) => ({
      player_workshop: workshopPlayerId,
    }),
  }
);

const widgetSlice = createSlice({
  name: 'widgetSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [sendWidgetAnswerAction.pending.toString()]: isFetching,
    [sendWidgetAnswerAction.fulfilled.toString()]: isNotFetching,
    [sendWidgetAnswerAction.rejected.toString()]: isNotFetching,

    [sendFileAction.pending.toString()]: isFetching,
    [sendFileAction.fulfilled.toString()]: isNotFetching,
    [sendFileAction.rejected.toString()]: isNotFetching,

    [getWorkshopTeamsAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.teams = {
        ...state.teams,
        [arg.fsmId]: { teams: response, lastUpdate: Date.now() },
      };
    },

    [getUnreadNotificationsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.notifications = response.unread_list.map(
        (unread) => +unread.actor_object_id
      );
    },

    [visitWorkshopPlayerAction.fulfilled.toString()]: (state, { meta: { arg } }) => {
      state.notifications = state.notifications.filter(
        (notification) => notification !== arg.workshopPlayerId
      );
    },

    [getProblemsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.problems = response;
    },

    [createWidgetAction.pending.toString()]: isFetching,
    [createWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.widgets[arg.paper] = [...(state.widgets[arg.paper] || []), response];
      state.isFetching = false;
    },
    [createWidgetAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: widgetReducer } = widgetSlice;
