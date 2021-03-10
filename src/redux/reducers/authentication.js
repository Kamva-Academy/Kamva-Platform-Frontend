import * as actionTypes from '../actions/actionTypes';

const initState = { isFetching: null };

function authentication(state = initState, action) {
  switch (action.type) {

    case actionTypes.REGISTRATION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.REGISTRATION_SUCCESS:
    case actionTypes.REGISTRATION_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
}

export default authentication;
