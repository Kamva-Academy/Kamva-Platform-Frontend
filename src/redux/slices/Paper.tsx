import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  hintUrl,
  stateCRUDUrl,
  widgetCRUDUrl,
} from '../constants/urls';

import { InitialStateType } from '../../types/redux/Paper';

const initialState: InitialStateType = {
  papers: {},
  isFetching: false,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

export const getOneStateAction = createAsyncThunkApi(
  'workshop/getOneStateAction',
  Apis.GET,
  stateCRUDUrl
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

  },
});

export const { reducer: paperReducer } = PaperSlice;
