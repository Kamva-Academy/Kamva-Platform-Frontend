import * as actionTypes from '../actions/actionTypes';

const initState = {
  teams: {},
  members: [],
  workshops: [],
  FAQs: [],
};

function landing(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_LANDING_SUCCESS:
      return {
        ...state,
        teams: action.response.teams,
        members: action.response.members,
        workshops: action.response.workshops,
        FAQs: action.response.FAQs,
      };

    default:
      return state;
  }
}

export default landing;
