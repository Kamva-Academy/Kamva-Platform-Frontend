import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, user: {} };

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.REGISTRATION_REQUEST:
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.response.access,
        user: action.response.user_info,
      };

    case actionTypes.REGISTRATION_SUCCESS:
    case actionTypes.REGISTRATION_FAILURE:
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case actionTypes.LOGOUT_REQUEST:
      return initState;

    default:
      return state;
  }
}

export default account;
