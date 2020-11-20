import * as actionTypes from '../actions/actionTypes';

const initState = { state: { widgets: [] }, player: {} };

function currentState(state = initState, action) {
  switch (action.type) {
    case actionTypes.INIT_CURRENT_STATE:
      return initState;

    case actionTypes.GET_CURRENT_STATE_SUCCESS:
      return {
        ...state,
        state: action.response,
      };

    case actionTypes.START_WORKSHOP_SUCCESS:
      if (action.response.error) {
        return state;
      }
      return { ...state, player: action.response.player };

    default:
      return state;
  }
}

export default currentState;
