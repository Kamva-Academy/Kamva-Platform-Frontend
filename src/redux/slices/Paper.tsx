import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  hintUrl,
  widgetHintUrl,
  stateCRUDUrl,
  statesCRUDUrl,
} from '../constants/urls';
import { InitialStateType } from 'types/redux/Paper';
import { getArticleAction } from './article';
import { getRegistrationFormAction } from './events';
import {
  _createWidgetAction,
  deleteWidgetAction,
  getWidgetAction,
  makeWidgetFileEmptyAction,
  _updateWidgetAction,
} from './widget';

//////////////// متفرقه ////////////////

export const getOneStateAction = createAsyncThunkApi(
  'workshop/getOneStateAction',
  Apis.GET,
  stateCRUDUrl
);

export const deleteStateAction = createAsyncThunkApi(
  'widget/delete',
  Apis.DELETE,
  statesCRUDUrl,
);

//////////////// HINT ////////////////

export const createHintAction = createAsyncThunkApi(
  'widget/hints/create',
  Apis.POST,
  hintUrl,
  {
    bodyCreator: ({ referenceId }) => ({ reference: referenceId, name: 'help' }),
  }
);

export const deleteHintAction = createAsyncThunkApi(
  'widget/hints/delete',
  Apis.DELETE,
  hintUrl,
);

//////////////// WIDGET HINT ////////////////
// TOFF

export const createWidgetHintAction = createAsyncThunkApi(
  'widget/widget-hints/create',
  Apis.POST,
  widgetHintUrl,
  {
    bodyCreator: ({ referenceId }) => ({ reference: referenceId, name: 'help' }),
  }
);

export const deleteWidgetHintAction = createAsyncThunkApi(
  'widget/widget-hints/delete',
  Apis.DELETE,
  widgetHintUrl,
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

const addNewPaperToList = (papers, newPaper) => {
  let newPapers = { ...papers };
  // put itself
  newPapers[newPaper.id] = newPaper;
  // put its hints
  newPaper.hints?.forEach((hint) => {
    newPapers[hint.id] = hint;
  })
  // put its widgets hints
  newPaper.widgets?.forEach((widget) => {
    widget.hints?.forEach((hint) => {
      newPapers = addNewPaperToList(newPapers, hint);
    })
  })
  return newPapers;
}

const PaperSlice = createSlice({
  name: 'PaperState',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getOneStateAction.pending.toString()]: isFetching,
    [getOneStateAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.paperId] = response;
      state.papers = addNewPaperToList(state.papers, response);
      state.isFetching = false;
    },
    [getOneStateAction.rejected.toString()]: isNotFetching,


    [getWidgetAction.pending.toString()]: isFetching,
    [getWidgetAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.widget = response;
      state.isFetching = false;
    },
    [getWidgetAction.rejected.toString()]: isNotFetching,


    [_createWidgetAction.pending.toString()]: isFetching,
    [_createWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.paper] ||= {};
      state.papers[arg.paper].widgets = [...(state.papers[arg.paper].widgets || []), response];
      state.isFetching = false;
    },
    [_createWidgetAction.rejected.toString()]: isNotFetching,


    [deleteWidgetAction.pending.toString()]: isFetching,
    [deleteWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      const newWidgets = state.papers[arg.paperId].widgets;
      for (let i = 0; i < newWidgets.length; i++) {
        if (newWidgets[i].id === arg.widgetId) {
          newWidgets.splice(i, 1);
          break;
        }
      }
      state.papers[arg.paperId].widgets = newWidgets;
      state.isFetching = false;
    },
    [deleteWidgetAction.rejected.toString()]: isNotFetching,


    [_updateWidgetAction.pending.toString()]: isFetching,
    [_updateWidgetAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
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
    [_updateWidgetAction.rejected.toString()]: isNotFetching,


    [createHintAction.pending.toString()]: isFetching,
    [createHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.referenceId] ||= {};
      state.papers[arg.referenceId].hints = [...(state.papers[arg.referenceId].hints || []), response];
      state.papers = addNewPaperToList(state.papers, response);
      state.isFetching = false;
    },
    [createHintAction.rejected.toString()]: isNotFetching,


    [createWidgetHintAction.pending.toString()]: isFetching,
    [createWidgetHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers = addNewPaperToList(state.papers, response);
      state.isFetching = false;
    },
    [createWidgetHintAction.rejected.toString()]: isNotFetching,


    [deleteHintAction.pending.toString()]: isFetching,
    [deleteHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      delete state.papers[arg.hintId];
      state.isFetching = false;
    },
    [deleteHintAction.rejected.toString()]: isNotFetching,


    [deleteWidgetHintAction.pending.toString()]: isFetching,
    [deleteWidgetHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      delete state.papers[arg.hintId];
      state.isFetching = false;
    },
    [deleteWidgetHintAction.rejected.toString()]: isNotFetching,

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
