import * as actionTypes from '../actions/actionTypes';

const initState = { workshop: { states: [] } };

function currentWorkshop(state = initState, action) {
  switch (action.type) {
    case actionTypes.INIT_CURRENT_WORKSHOP:
      return initState;
    case actionTypes.GET_CURRENT_WORKSHOP_SUCCESS:
      return {
        ...state,
        workshop: action.response,
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

export default currentWorkshop;
