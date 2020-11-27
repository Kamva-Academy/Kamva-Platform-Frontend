import * as actionTypes from '../actions/actionTypes';

const initState = {};

function currentState(state = initState, action) {
  switch (action.type) {
    case actionTypes.INIT_CURRENT_STATE:
      return initState;

    case actionTypes.GO_FORWARD_FAILURE:
    case actionTypes.GO_BACKWARD_FAILURE:
      return {
        ...state,
        needUpdateState: true,
      };

    case actionTypes.GO_FORWARD_SUCCESS:
    case actionTypes.GO_BACKWARD_SUCCESS:
    case actionTypes.GET_CURRENT_STATE_SUCCESS:
      return {
        ...state,
        needUpdateState: false,
        state: action.response,
      };

    case actionTypes.SEND_ANSWER_SUCCESS: // TODO: fix another answer types
      return {
        ...state,
        state: {
          ...state.state,
          widgets: state.state.widgets.map((widget) =>
            +widget.id === +action.response.problem
              ? { ...widget, last_submit: action.response.xanswer }
              : widget
          ),
        },
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
