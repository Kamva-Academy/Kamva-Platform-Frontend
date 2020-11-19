import * as actionTypes from './actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const getUnreadNotifications = () => ({
  [CALL_API]: {
    types: [
      actionTypes.UNREAD_NOTIFICATIONS_REQUEST,
      actionTypes.UNREAD_NOTIFICATIONS_SUCCESS,
      actionTypes.UNREAD_NOTIFICATIONS_FAILURE,
    ],
    url: URLs.UNREAD_NOTIFICATIONS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAllWorkshops = () => ({
  [CALL_API]: {
    types: [
      actionTypes.ALL_WORKSHOPS_REQUEST,
      actionTypes.ALL_WORKSHOPS_SUCCESS,
      actionTypes.ALL_WORKSHOPS_FAILURE,
    ],
    url: URLs.ALL_WORKSHOPS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getWorkshop = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_WORKSHOP_REQUEST,
      actionTypes.GET_WORKSHOP_SUCCESS,
      actionTypes.GET_WORKSHOP_FAILURE,
    ],
    url: URLs.GET_WORKSHOP(id),
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getWorkshopTeams = ({ fsmId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.WORKSHOP_TEAMS_REQUEST,
      actionTypes.WORKSHOP_TEAMS_SUCCESS,
      actionTypes.WORKSHOP_TEAMS_FAILURE,
    ],
    url: URLs.WORKSHOP_TEAMS,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ fsm: fsmId }),
    },
  },
});

export const getTeamAnswers = (fsmId, teamId) => ({
  [CALL_API]: {
    types: [
      actionTypes.TEAM_ANSWERS_REQUEST,
      actionTypes.TEAM_ANSWERS_SUCCESS,
      actionTypes.TEAM_ANSWERS_FAILURE,
    ],
    url: URLs.TEAM_ANSWERS,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ fsmId, teamId }),
    },
  },
});

export const visitTeam = (fsmId, teamId) => ({
  [CALL_API]: {
    types: [
      actionTypes.VISIT_TEAM_REQUEST,
      actionTypes.VISIT_TEAM_SUCCESS,
      actionTypes.VISIT_TEAM_FAILURE,
    ],
    url: URLs.VISIT_TEAM,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ fsm: fsmId, team: teamId }),
    },
  },
});

export const createWorkshop = ({ name }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_WORKSHOP_REQUEST,
      actionTypes.CREATE_WORKSHOP_SUCCESS,
      actionTypes.CREATE_WORKSHOP_FAILURE,
    ],
    url: URLs.CREATE_WORKSHOP,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ name }),
    },
  },
});

export const createState = ({ name, fsm }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_STATE_REQUEST,
      actionTypes.CREATE_STATE_SUCCESS,
      actionTypes.CREATE_STATE_FAILURE,
    ],
    url: URLs.CREATE_STATE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ widgets: [], name, fsm }),
    },
    payload: {
      fsm,
    },
  },
});

export const deleteState = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.DELETE_STATE_REQUEST,
      actionTypes.DELETE_STATE_SUCCESS,
      actionTypes.DELETE_STATE_FAILURE,
    ],
    url: URLs.DELETE_STATE(id),
    fetchOptions: {
      method: 'DELETE',
    },
  },
});

const createWidget = (body) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_WIDGET_REQUEST,
      actionTypes.CREATE_WIDGET_SUCCESS,
      actionTypes.CREATE_WIDGET_FAILURE,
    ],
    url: URLs.CREATE_WIDGET,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(body),
    },
  },
});

export const createVideoWidget = ({ state, link }) =>
  createWidget({
    state,
    widget_type: 'Video',
    link,
  });

export const createImageWidget = ({ state, link }) =>
  createWidget({
    state,
    widget_type: 'Image',
    link,
  });

export const createSmallAnswerQuestionWidget = ({ state, text, answer }) =>
  createWidget({
    state,
    widget_type: 'ProblemSmallAnswer',
    text,
    answer: { text: answer },
  });

export const createBigAnswerQuestionWidget = ({ state, text, answer }) =>
  createWidget({
    state,
    widget_type: 'ProblemBigAnswer',
    text,
    answer: { text: answer },
  });

export const createMultiChoicesQuestionWidget = ({
  state,
  text,
  answer,
  choices,
}) =>
  createWidget({
    state,
    widget_type: 'ProblemMultiChoice',
    text,
    answer: { text: answer },
    choices,
  });

export const createTextWidget = ({ state, text }) =>
  createWidget({
    state,
    widget_type: 'Description',
    text,
  });

export const createUploadFileWidget = ({ state, text }) =>
  createWidget({
    state,
    widget_type: 'ProblemUploadFileAnswer',
    text,
  });

export const getWidget = ({ id }) => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.GET_WIDGET_REQUEST,
        actionTypes.GET_WIDGET_SUCCESS,
        actionTypes.GET_WIDGET_FAILURE,
      ],
      url: URLs.DELETE_WIDGET(id),
      fetchOptions: {
        method: 'GET',
      },
    },
  };
};

export const deleteWidget = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.DELETE_WIDGET_REQUEST,
      actionTypes.DELETE_WIDGET_SUCCESS,
      actionTypes.DELETE_WIDGET_FAILURE,
    ],
    url: URLs.DELETE_WIDGET(id),
    fetchOptions: {
      method: 'DELETE',
    },
  },
});
