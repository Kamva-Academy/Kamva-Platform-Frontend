import * as actionTypes from './actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';
import jsonToFormData from '../../utils/jsonToFromDate';

export const initCurrentWorkshop = () => ({
  type: actionTypes.INIT_CURRENT_WORKSHOP,
});

export const getCurrentWorkshop = ({ fsmId, teamUuid }) => {
  if (!!teamUuid) {
    return {
      [CALL_API]: {
        types: [
          actionTypes.GET_CURRENT_WORKSHOP_REQUEST,
          actionTypes.GET_CURRENT_WORKSHOP_SUCCESS,
          actionTypes.GET_CURRENT_WORKSHOP_FAILURE,
        ],
        url: URLs.GET_MENTOR_WORKSHOP,
        fetchOptions: {
          method: 'POST',
          body: JSON.stringify({
            fsm: fsmId,
            team_uuid: teamUuid,
          }),
        },
      },
    };
  }
  return {
    [CALL_API]: {
      types: [
        actionTypes.GET_CURRENT_WORKSHOP_REQUEST,
        actionTypes.GET_CURRENT_WORKSHOP_SUCCESS,
        actionTypes.GET_CURRENT_WORKSHOP_FAILURE,
      ],
      url: URLs.GET_WORKSHOP(fsmId),
      fetchOptions: {
        method: 'GET',
      },
    },
  };
};

const sendAnswer = (body) => ({
  [CALL_API]: {
    types: [
      actionTypes.SEND_ANSWER_REQUEST,
      actionTypes.SEND_ANSWER_SUCCESS,
      actionTypes.SEND_ANSWER_FAILURE,
    ],
    url: URLs.SEND_ANSWER,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(body),
    },
  },
});

export const sendFileAnswer = ({ player, problem, answer_file }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SEND_ANSWER_REQUEST,
      actionTypes.SEND_ANSWER_SUCCESS,
      actionTypes.SEND_ANSWER_FAILURE,
    ],
    url: URLs.SEND_ANSWER,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: jsonToFormData({
        player,
        problem,
        problem_type: 'ProblemUploadFileAnswer',
        answer_file,
      }),
    },
  },
});

export const sendBigAnswer = ({ player, problem, answer }) =>
  sendAnswer({
    player,
    problem,
    problem_type: 'ProblemBigAnswer',
    answer: {
      answer_type: 'BigAnswer',
      text: answer,
    },
  });

export const sendSmallAnswer = ({ player, problem, answer }) =>
  sendAnswer({
    player,
    problem,
    problem_type: 'ProblemSmallAnswer',
    answer: {
      answer_type: 'SmallAnswer',
      text: answer,
    },
  });

export const sendMultiChoiceAnswer = ({ player, problem, answer }) =>
  sendAnswer({
    player,
    problem,
    problem_type: 'ProblemMultiChoice',
    answer: {
      answer_type: 'MultiChoiceAnswer',
      text: answer,
    },
  });

export const startWorkshop = ({ fsm }) => ({
  [CALL_API]: {
    types: [
      actionTypes.START_WORKSHOP_REQUEST,
      actionTypes.START_WORKSHOP_SUCCESS,
      actionTypes.START_WORKSHOP_FAILURE,
    ],
    url: URLs.START_WORKSHOP,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ fsm }),
    },
  },
});
