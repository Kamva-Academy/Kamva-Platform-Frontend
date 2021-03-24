import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteApi, getApi, postApi } from '../apis';
import {
  articlesUrl,
  getUnreadNotificationsUrl,
  helpUrl,
  statesUrl,
  visitWorkshopPlayerUrl,
  widgetUrl,
  workshopsUrl,
  workshopTeamsUrl,
} from '../constants/urls';

const initialState = {
  workshops: [],
  articles: [],
  teams: {},
  notifications: [],
};

export const getUnreadNotificationsAction = createAsyncThunk(
  'workshops/getNotifications',
  async () => ({
    response: await getApi(getUnreadNotificationsUrl),
  })
);

export const getWorkshopsAction = createAsyncThunk(
  'workshops/getAll',
  async () => ({
    response: await getApi(workshopsUrl),
  })
);

export const getWorkshopAction = createAsyncThunk(
  'workshops/getOne',
  async ({ fsmId }) => ({
    response: await getApi(workshopsUrl + fsmId + '/'),
  })
);

export const createWorkshopAction = createAsyncThunk(
  'workshops/create',
  async ({ name, playerType = 'team', mentorType = 'withMentor' }) => ({
    response: await postApi(workshopsUrl, {
      name,
      fsm_p_type: playerType,
      fsm_learning_type: mentorType,
    }),
  })
);

export const getArticlesAction = createAsyncThunk(
  'articles/getAll',
  async () => ({
    response: await getApi(articlesUrl),
  })
);

export const getArticleAction = createAsyncThunk(
  'articles/getOne',
  async ({ articleId }) => ({
    response: await getApi(articlesUrl + articleId + '/'),
  })
);

export const createArticleAction = createAsyncThunk(
  'articles/create',
  async ({ name }) => ({
    response: await postApi(articlesUrl, { name }),
  })
);

export const getStateAction = createAsyncThunk(
  'states/getOne',
  async ({ stateId }) => ({
    response: await getApi(statesUrl + stateId + '/'),
  })
);

export const createStateAction = createAsyncThunk(
  'states/create',
  async ({ name, fsmId }) => ({
    response: await postApi(statesUrl, { name, fsm: fsmId }),
    additional: { fsmId },
  })
);

export const deleteStateAction = createAsyncThunk(
  'states/delete',
  async ({ stateId }) => ({
    response: await deleteApi(statesUrl + stateId + '/'),
  })
);

export const createHelpAction = createAsyncThunk(
  'states/helps/create',
  async ({ stateId }) => ({
    response: await postApi(helpUrl, { state: stateId, name: 'help' }),
  })
);

export const createWidgetAction = createAsyncThunk(
  'states/widget/create',
  async (body) => ({
    response: await postApi(widgetUrl, { priority: 0, ...body }),
  })
);

export const createVideoWidgetAction = ({ state, link }) =>
  createWidgetAction({
    state,
    widget_type: 'Video',
    link,
  });

export const createMiniGameWidgetAction = ({ state, link }) =>
  createWidgetAction({
    state,
    widget_type: 'Game',
    link,
  });

export const createImageWidgetAction = ({ state, link }) =>
  createWidgetAction({
    state,
    widget_type: 'Image',
    link,
  });

export const createSmallAnswerQuestionWidgetAction = ({
  state,
  text,
  answer,
}) =>
  createWidgetAction({
    state,
    widget_type: 'ProblemSmallAnswer',
    text,
    answer: { text: answer },
  });

export const createBigAnswerQuestionWidgetAction = ({ state, text, answer }) =>
  createWidgetAction({
    state,
    widget_type: 'ProblemBigAnswer',
    text,
    answer: { text: answer },
  });

export const createMultiChoicesQuestionWidgetAction = ({
  state,
  text,
  answer,
  choices,
}) =>
  createWidgetAction({
    state,
    widget_type: 'ProblemMultiChoice',
    text,
    answer: { text: answer },
    choices,
  });

export const createTextWidgetAction = ({ state, text }) =>
  createWidgetAction({
    state,
    widget_type: 'Description',
    text,
  });

export const createUploadFileWidgetAction = ({ state, text }) =>
  createWidgetAction({
    state,
    widget_type: 'ProblemUploadFileAnswer',
    text,
  });

export const deleteWidgetAction = createAsyncThunk(
  'states/widgets/delete',
  async ({ widgetId }) => ({
    response: await deleteApi(widgetUrl + widgetId + '/'),
  })
);

export const getWidgetAction = createAsyncThunk(
  'states/widgets/getOne',
  async ({ widgetId }) => ({
    response: await getApi(widgetUrl + widgetId + '/'),
  })
);

export const getWorkshopTeamsAction = createAsyncThunk(
  'workshops/teams/getAll',
  async ({ fsmId }) => ({
    response: await postApi(workshopTeamsUrl, { fsm: fsmId }),
    additional: { fsmId },
  })
);

export const visitWorkshopPlayerAction = createAsyncThunk(
  'workshops/teams/visitWorkshopPlayer',
  async ({ workshopPlayerId }) => ({
    response: await postApi(visitWorkshopPlayerUrl, {
      player_workshop: workshopPlayerId,
    }),
    additional: {
      workshopPlayerId,
    },
  })
);

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {},
  extraReducers: {
    [getWorkshopsAction.pending.toString()]: (state) => {
      state.getWorkshopsLoading = true;
    },
    [getWorkshopsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.workshops = response;
      state.getWorkshopsLoading = false;
    },
    [getWorkshopsAction.rejected.toString()]: (state) => {
      state.getWorkshopsLoading = false;
    },
    [getWorkshopAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.workshops = state.workshops.filter(
        (workshop) => +workshop.id !== +response.id
      );
      state.workshops.push(response);
    },
    [getArticlesAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.articles = response;
    },
    [getArticleAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.articles = state.articles.filter(
        (article) => +article.id !== +response.id
      );
      state.articles.push(response);
    },
    [createStateAction.fulfilled.toString()]: (
      state,
      { payload: { response, additional } }
    ) => {
      state.workshops = state.workshops.map((workshop) =>
        +workshop.id === +additional.fsmId
          ? { ...workshop, states: [...workshop.states, response] }
          : workshop
      );
    },
    [getWorkshopTeamsAction.fulfilled.toString()]: (
      state,
      { payload: { response, additional } }
    ) => {
      state.teams = {
        ...state.teams,
        [additional.fsmId]: response,
      };
    },
    [getUnreadNotificationsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.notifications = response.unread_list.map(
        (unread) => +unread.actor_object_id
      );
    },
    [visitWorkshopPlayerAction.fulfilled.toString()]: (
      state,
      { payload: { additional } }
    ) => {
      state.notifications = state.notifications.filter(
        (notification) => notification !== additional.workshopPlayerId
      );
    },
  },
});

export const { reducer: mentorReducer } = mentorSlice;
