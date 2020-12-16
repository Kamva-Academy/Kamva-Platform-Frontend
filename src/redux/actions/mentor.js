import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const getUnreadNotifications = () => ({
  // TODO: get stateId
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

export const createEvent = ({
  name,
  description,
  image,
  type,
  password,
}) => ({}); // TODO: type:['private', 'public']

export const editEvent = ({ id, name, description, image, password }) => ({}); // TODO:

export const deleteEvent = ({ id }) => ({}); // TODO:

export const getAllEvents = () => ({}); // TODO:

export const getAllWorkshops = () => ({
  // TODO: get event workshops
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

export const getAllArticles = () => ({
  [CALL_API]: {
    types: [
      actionTypes.ALL_ARTICLES_REQUEST,
      actionTypes.ALL_ARTICLES_SUCCESS,
      actionTypes.ALL_ARTICLES_FAILURE,
    ],
    url: URLs.ALL_ARTICLES,
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

export const getArticle = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_ARTICLE_REQUEST,
      actionTypes.GET_ARTICLE_SUCCESS,
      actionTypes.GET_ARTICLE_FAILURE,
    ],
    url: URLs.GET_ARTICLE(id),
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getState = ({ stateId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_CURRENT_STATE_REQUEST,
      actionTypes.GET_CURRENT_STATE_SUCCESS,
      actionTypes.GET_CURRENT_STATE_FAILURE,
    ],
    url: URLs.GET_STATE(stateId),
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const editWorkshop = () => ({}); // TODO:

export const deleteWorkshop = () => ({}); // TODO:

export const getWorkshopTeams = ({ fsmId }) => ({
  // teams => players
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
  payload: { fsmId },
});

export const getTeamAnswers = (fsmId, teamId) => ({
  //TODO: team => player, answer => history
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

export const visitPlayerWorkshop = ({ playerWorkshopId }) => ({
  // TODO: fsmId, playerId
  [CALL_API]: {
    types: [
      actionTypes.VISIT_PLAYER_WORKSHOP_REQUEST,
      actionTypes.VISIT_PLAYER_WORKSHOP_SUCCESS,
      actionTypes.VISIT_PLAYER_WORKSHOP_FAILURE,
    ],
    url: URLs.VISIT_PLAYER_WORKSHOP,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ player_workshop: playerWorkshopId }),
    },
  },
});

export const createWorkshop = ({
  name,
  playerType = 'team',
  mentorType = 'withMentor',
}) => ({
  // TODO: eventId, description, image, playerType:['team', 'individual', 'hybrid'], mentorType=['withMentor', 'noMentor']
  [CALL_API]: {
    types: [
      actionTypes.CREATE_WORKSHOP_REQUEST,
      actionTypes.CREATE_WORKSHOP_SUCCESS,
      actionTypes.CREATE_WORKSHOP_FAILURE,
    ],
    url: URLs.CREATE_WORKSHOP,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        name,
        fsm_p_type: playerType,
        fsm_learning_type: mentorType,
      }),
    },
  },
});

export const createArticle = ({ name }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_ARTICLE_REQUEST,
      actionTypes.CREATE_ARTICLE_SUCCESS,
      actionTypes.CREATE_ARTICLE_FAILURE,
    ],
    url: URLs.CREATE_ARTICLE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        name,
      }),
    },
  },
});

export const createState = ({ name, fsmId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_STATE_REQUEST,
      actionTypes.CREATE_STATE_SUCCESS,
      actionTypes.CREATE_STATE_FAILURE,
    ],
    url: URLs.CREATE_STATE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ name, fsm: fsmId }),
    },
  },
  payload: { fsmId },
});

export const editState = ({ stateId, name }) => ({}); // TODO:

export const getOutwardsEdges = ({ stateId }) => ({}); // TODO: [{ from, to }]

export const createEdges = ({ edges }) => ({}); // TODO: [{ from, to }]

export const editEdges = ({ edges }) => ({}); // TODO:

export const createHelp = ({ stateId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_HELP_REQUEST,
      actionTypes.CREATE_HELP_SUCCESS,
      actionTypes.CREATE_HELP_FAILURE,
    ],
    url: URLs.CREATE_HELP,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ state: stateId, name: 'heeeeellllllp' }),
    },
  },
  payload: { stateId },
});

export const changePlayerState = ({ edge, player }) => ({}); // TODO:

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
      body: JSON.stringify({ priority: 0, ...body }),
    },
  },
});

export const createVideoWidget = ({ state, link }) =>
  createWidget({
    state,
    widget_type: 'Video',
    link,
  });

export const createMiniGameWidget = ({ state, link }) =>
  createWidget({
    state,
    widget_type: 'Game',
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
      url: URLs.DELETE_WIDGET(id), // TODO: rename
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

export const editWidget = ({ id }) => ({}); // TODO:
