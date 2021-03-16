import * as actionTypes from '../actions/actionTypes';

const initState = {
  isFetching: false,
  memberId: '',
};

function authentication(state = initState, action) {
  switch (action.type) {

    case actionTypes.LOGIN_REQUEST:
    case actionTypes.REGISTRATION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTRATION_SUCCESS:
    case actionTypes.REGISTRATION_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.response,
        token: action.response.access,
      };

    default:
      return state;
  }
}

export default authentication;
