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

export const getWorkshopTeams = (fsmId) => ({
  [CALL_API]: {
    types: [
      actionTypes.WORKSHOP_TEAMS_REQUEST,
      actionTypes.WORKSHOP_TEAMS_SUCCESS,
      actionTypes.WORKSHOP_TEAMS_FAILURE,
    ],
    url: URLs.WORKSHOP_TEAMS,
    fetchOptions: {
      method: 'POST',
      fsmId,
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
      fsmId,
      teamId,
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
      fsmId,
      teamId,
    },
  },
});