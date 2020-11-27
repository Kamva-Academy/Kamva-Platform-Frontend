import jsonToFormData from '../../utils/jsonToFromDate';
import { CALL_API } from '../middleware/api/api';
import * as actionTypes from './actionTypes';
import * as URLs from './urls';

export const initCurrentState = () => ({
  type: actionTypes.INIT_CURRENT_STATE,
});

export const goForward = ({ edgeId, playerId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GO_FORWARD_REQUEST,
      actionTypes.GO_FORWARD_SUCCESS,
      actionTypes.GO_FORWARD_FAILURE,
    ],
    url: URLs.GO_FORWARD,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ edge: edgeId, player: playerId }),
    },
  },
});

export const goBackward = ({ edgeId, playerId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GO_BACKWARD_REQUEST,
      actionTypes.GO_BACKWARD_SUCCESS,
      actionTypes.GO_BACKWARD_FAILURE,
    ],
    url: URLs.GO_BACKWARD,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ edge: edgeId, player: playerId }),
    },
  },
});

export const participantGetCurrentState = ({ fsmId, playerId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_CURRENT_STATE_REQUEST,
      actionTypes.GET_CURRENT_STATE_SUCCESS,
      actionTypes.GET_CURRENT_STATE_FAILURE,
    ],
    url: URLs.PARTICIPANT_GET_CURRENT_STATE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ fsm: fsmId, player: playerId }),
    },
  },
});

export const mentorGetCurrentState = ({ stateId, playerUUID }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_CURRENT_STATE_REQUEST,
      actionTypes.GET_CURRENT_STATE_SUCCESS,
      actionTypes.GET_CURRENT_STATE_FAILURE,
    ],
    url: URLs.MENTOR_GET_CURRENT_STATE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        state: stateId,
        player_uuid: playerUUID,
      }),
    },
  },
});

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
      text: answer,
    },
  });

export const sendSmallAnswer = ({ player, problem, answer }) =>
  sendAnswer({
    player,
    problem,
    problem_type: 'ProblemSmallAnswer',
    answer: {
      text: answer,
    },
  });

export const sendMultiChoiceAnswer = ({ player, problem, answer }) =>
  sendAnswer({
    player,
    problem,
    problem_type: 'ProblemMultiChoice',
    answer: {
      text: answer,
    },
  });

export const startWorkshop = ({ fsmId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.START_WORKSHOP_REQUEST,
      actionTypes.START_WORKSHOP_SUCCESS,
      actionTypes.START_WORKSHOP_FAILURE,
    ],
    url: URLs.START_WORKSHOP,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ fsm: fsmId }),
    },
  },
});

export const callMentor = ({ fsmId, playerId }) => ({
  // TODO: stateId
  [CALL_API]: {
    types: [
      actionTypes.CALL_MENTOR_REQUEST,
      actionTypes.CALL_MENTOR_SUCCESS,
      actionTypes.CALL_MENTOR_FAILURE,
    ],
    url: URLs.CALL_MENTOR,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ fsm: fsmId, player: playerId }),
    },
  },
});
