import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  makeAnswerEmptyUrl,
  sendWidgetAnswerUrl,
  getProblemsUrl,
  getSubmissionsUrl,
  getUnreadNotificationsUrl,
  helpUrl,
  markSubmissionUrl,
  statesCRUDUrl,
  visitWorkshopPlayerUrl,
  widgetCRUDUrl,
  workshopTeamsUrl,
} from '../constants/urls';

import { InitialState } from '../../types/redux/widget';

const initialState: InitialState = {
  isFetching: false,
  workshops: [],
  articles: [],
  teams: [],
  notifications: [],
  problems: [],
  submissions: [],
  submissionsIsLoading: false,
  widget: null,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

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

// for mentors
export { initialState as mentorInitialState };

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

export const getSubmissionsAction = createAsyncThunkApi(
  'workshops/getSubmissions',
  Apis.POST,
  getSubmissionsUrl,
  {
    bodyCreator: ({ fsmId, stateId, problemId }) => ({
      fsm_id: fsmId,
      state_id: stateId,
      problem_id: problemId,
    }),
  }
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


export const getStateAction = createAsyncThunkApi(
  'widget/getOne',
  Apis.GET,
  statesCRUDUrl,
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

export const deleteStateAction = createAsyncThunkApi(
  'widget/delete',
  Apis.DELETE,
  statesCRUDUrl,
);

export const getWidgetAction = createAsyncThunkApi(
  'widget/getWidgetAction',
  Apis.GET,
  widgetCRUDUrl,
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

export const createHelpAction = createAsyncThunkApi(
  'widget/helps/create',
  Apis.POST,
  helpUrl,
  {
    bodyCreator: ({ stateId }) => ({ state: stateId, name: 'help' }),
  }
);


const widgetSlice = createSlice({
  name: 'currentState',
  initialState: initialState,
  reducers:{},
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

    [getSubmissionsAction.pending.toString()]: (state) => {
      state.submissionsIsLoading = true;
    },

    [getSubmissionsAction.rejected.toString()]: (state) => {
      state.submissionsIsLoading = false;
    },

    [getSubmissionsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.submissions = response;
      state.submissionsIsLoading = false;
    },



    [getWidgetAction.pending.toString()]: isFetching,
    [getWidgetAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.widget = response;
      state.isFetching = false;
    },
    [getWidgetAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: widgetReducer } = widgetSlice;
