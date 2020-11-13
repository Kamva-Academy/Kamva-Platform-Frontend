import * as actionTypes from '../actions/actionTypes';

const initState = { allWorkshops: [] };

function mentor(state = initState, action) {
  switch (action.type) {
    case actionTypes.WORKSHOP_TEAMS_REQUEST:
      return {
        isFetching: true,
      };

    case actionTypes.WORKSHOP_TEAMS_SUCCESS:
      return {
        isFetching: false,
        teams: action.response.teams,
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        isFetching: false,
      };

    case actionTypes.ALL_WORKSHOPS_REQUEST:
      return {
        isFetching: true,
      };

    case actionTypes.ALL_WORKSHOPS_SUCCESS:
      return {
        isFetching: false,
        allWorkshops: action.response.allWorkshops,
      };

    case actionTypes.ALL_WORKSHOPS_FAILURE:
      return {
        isFetching: false,
      };

    case actionTypes.VISIT_TEAM_REQUEST:
      return {
        isFetching: true,
      };

    case actionTypes.VISIT_TEAM_SUCCESS:
      return {
        isFetching: false,
      };

    case actionTypes.VISIT_TEAM_FAILURE:
      return {
        isFetching: false,
      };

    default:
      return state;
  }
}

export default mentor;
