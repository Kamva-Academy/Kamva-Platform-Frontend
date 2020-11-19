import * as actionTypes from '../actions/actionTypes';

const initState = { workshops: [] };

function mentor(state = initState, action) {
  switch (action.type) {
    case actionTypes.ALL_WORKSHOPS_SUCCESS:
      return {
        ...state,
        workshops: action.response,
      };

    case actionTypes.GET_WORKSHOP_SUCCESS:
      const newWorkshops = state.workshops.filter(
        (workshop) => workshop.id !== action.response.id
      );
      newWorkshops.push(action.response);
      return {
        ...state,
        workshops: newWorkshops,
      };

    case actionTypes.CREATE_STATE_SUCCESS:
      return {
        ...state,
        workshops: state.workshops.map((workshop) =>
          workshop.id === action.payload.fsm
            ? { ...workshop, states: [...workshop.states, action.response] }
            : workshop
        ),
      };

    default:
      return state;
  }
}

export default mentor;
