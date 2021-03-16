import * as actionTypes from '../actions/actionTypes';

const initState = {
  isFetching: false,
};

function event(state = initState, action) {
  switch (action.type) {
    case actionTypes.EVENT_REGISTRATION_INFO_SUCCESS:
      return {
        ...state,
        participant_id: action.response.me,
        event: action.response.event,
        team: action.response.team,
      };

    default:
      return state;
  }
}

export default event;


