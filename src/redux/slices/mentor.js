import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../axios/axiosConfig';
import {
  articlesUrl,
  helpUrl,
  statesUrl,
  teamAnswersUrl,
  unreadNotifications,
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
  async () => (await axios.get(unreadNotifications)).data
);

export const getWorkshopsAction = createAsyncThunk(
  'workshops/getAll',
  async () => (await axios.get(workshopsUrl)).data
);

export const getWorkshopAction = createAsyncThunk(
  'workshops/getOne',
  async ({ workshopId }) =>
    (await axios.get(workshopsUrl + workshopId + '/')).data
);

export const createWorkshopAction = createAsyncThunk(
  'workshops/create',
  async ({ name, playerType = 'team', mentorType = 'withMentor' }) =>
    (
      await axios.post(workshopsUrl, {
        name,
        fsm_p_type: playerType,
        fsm_learning_type: mentorType,
      })
    ).data
);

export const getArticlesAction = createAsyncThunk(
  'articles/getAll',
  async () => (await axios.get(articlesUrl)).data
);

export const getArticleAction = createAsyncThunk(
  'articles/getOne',
  async ({ articleId }) => (await axios.get(articlesUrl + articleId + '/')).data
);

export const createArticleAction = createAsyncThunk(
  'articles/create',
  async ({ name }) => (await axios.post(articlesUrl, { name })).data
);

export const getStateAction = createAsyncThunk(
  'states/getOne',
  async ({ stateId }) => (await axios.get(statesUrl + stateId + '/')).data
);

export const createStateAction = createAsyncThunk(
  'states/create',
  async ({ name, fsmId }) =>
    (await axios.post(statesUrl, { name, fsm: fsmId })).data
);

export const deleteStateAction = createAsyncThunk(
  'states/delete',
  async ({ stateId }) => (await axios.delete(statesUrl + stateId + '/')).data
);

export const createHelpAction = createAsyncThunk(
  'states/helps/create',
  async ({ stateId }) =>
    (await axios.post(helpUrl, { state: stateId, name: 'help' })).data
);

export const createWidgetAction = createAsyncThunk(
  'states/widget/create',
  async (body) => (await axios.post(widgetUrl, { priority: 0, ...body })).data
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
  async ({ widgetId }) => (await axios.delete(widgetUrl + widgetId + '/')).data
);

export const getWidgetAction = createAsyncThunk(
  'states/widgets/getOne',
  async ({ widgetId }) => (await axios.get(widgetUrl + widgetId + '/')).data
);

export const getWorkshopTeamsAction = createAsyncThunk(
  'workshops/teams/getAll',
  async ({ fsmId }) => (await axios.post(workshopTeamsUrl, { fsm: fsmId })).data
);

export const getTeamAnswersAction = createAsyncThunk(
  'workshops/teams/getAllAnswers',
  async ({ fsmId, teamId }) =>
    (await axios.post(teamAnswersUrl, { fsmId, teamId })).data
);

export const visitWorkshopPlayerAction = createAsyncThunk(
  'workshops/teams/visitWorkshopPlayer',
  async ({ workshopPlayerId }) =>
    (await axios.post(teamAnswersUrl, { player_workshop: workshopPlayerId }))
      .data
);

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {},
  extraReducers: {
    [getWorkshopsAction.fulfilled.toString()]: (state, { payload }) => {
      state.workshops = payload;
      state.getWorkshopsLoading = false;
    },
    [getWorkshopsAction.pending.toString()]: (state) => {
      state.getWorkshopsLoading = true;
    },
    [getWorkshopsAction.rejected.toString()]: (state) => {
      state.getWorkshopsLoading = true;
    },
    [getWorkshopAction.fulfilled.toString()]: (state, { payload }) => {
      state.workshops = state.workshops.filter(
        (workshop) => +workshop.id !== +payload.id
      );
      state.workshops.push(payload);
    },
    [getArticlesAction.fulfilled.toString()]: (state, { payload }) => {
      state.articles = payload;
    },
    [getArticleAction.fulfilled.toString()]: (state, { payload }) => {
      state.articles = state.articles.filter(
        (article) => +article.id !== +payload.id
      );
      state.articles.push(payload);
    },
    [createStateAction.fulfilled.toString()]: (state, { payload }) => {
      state.workshops = state.workshops.map((workshop) =>
        workshop.id === payload.fsmId
          ? { ...workshop, states: [...workshop.states, payload.response] }
          : workshop
      );
    },
    [getWorkshopTeamsAction.fulfilled.toString()]: (state, { payload }) => {
      state.teams = {
        ...state.teams,
        [payload.fsmId]: payload.response,
      };
    },
    [getUnreadNotificationsAction.fulfilled.toString()]: (
      state,
      { payload }
    ) => {
      state.notifications = payload.response.unread_list.map(
        (unread) => +unread.actor_object_id
      );
    },
  },
});

export const { logout: logoutAction } = mentorSlice.actions;

export const { reducer: mentorReducer } = mentorSlice;
