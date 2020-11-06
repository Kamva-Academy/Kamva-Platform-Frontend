import * as actionTypes from './actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';


export const getTeammates = (fsmId) => ({
  [CALL_API]: {
    types: [
      actionTypes.TEAMMATES_REQUEST,
      actionTypes.TEAMMATES_SUCCESS,
      actionTypes.TEAMMATES_FAILURE,
    ],
    url: URLs.TEAMMATES,
    fetchOptions: {
      method: 'POST',
      fsmId,
    },
  },
});


export const getWorkshops = () => ({
  [CALL_API]: {
    types: [
      actionTypes.STUDENT_WORKSHOPS_REQUEST,
      actionTypes.STUDENT_WORKSHOPS_SUCCESS,
      actionTypes.STUDENT_WORKSHOPS_FAILURE,
    ],
    url: URLs.STUDENT_WORKSHOPS,
    fetchOptions: {
      method: 'POST', //todo?
    },
  },
});


export const getCurrentState = (fsmId,) => ({
  [CALL_API]: {
    types: [
      actionTypes.CURRENT_STATE_REQUEST,
      actionTypes.CURRENT_STATE_SUCCESS,
      actionTypes.CURRENT_STATE_FAILURE,
    ],
    url: URLs.CURRENT_STATE,
    fetchOptions: {
      method: 'POST',
      fsmId,
    },
  },
});


export const submitAnswer = (type, questionNumber, answerType, answer) => ({
  [CALL_API]: {
    types: [
      actionTypes.SUBMIT_ANSWER_REQUEST,
      actionTypes.SUBMIT_ANSWER_SUCCESS,
      actionTypes.SUBMIT_ANSWER_FAILURE,
    ],
    url: URLs.SUBMIT_ANSWER,
    fetchOptions: {
      method: 'POST',
      type,
      questionNumber,
      answerType, //text or file
      answer
    },
  },
});


export const callMentor = (fsmId) => ({
  [CALL_API]: {
    types: [
      actionTypes.SUBMIT_ANSWER_REQUEST,
      actionTypes.SUBMIT_ANSWER_SUCCESS,
      actionTypes.SUBMIT_ANSWER_FAILURE,
    ],
    url: URLs.CALL_MENTOR,
    fetchOptions: {
      method: 'POST',
      fsmId,
    },
  },
});

export const goForward = (fsmId) => ({
  [CALL_API]: {
    types: [
      actionTypes.GO_FORWARD_REQUEST,
      actionTypes.GO_FORWARD_SUCCESS,
      actionTypes.GO_FORWARD_FAILURE,
    ],
    url: URLs.GO_FORWARD,
    fetchOptions: {
      method: 'POST',
      fsmId,
    },
  },
});


export const goBackward = (fsmId) => ({
  [CALL_API]: {
    types: [
      actionTypes.GO_BACKWARD_REQUEST,
      actionTypes.GO_BACKWARD_SUCCESS,
      actionTypes.GO_BACKWARD_FAILURE,
    ],
    url: URLs.goBackward,
    fetchOptions: {
      method: 'POST',
      fsmId,
    },
  },
});