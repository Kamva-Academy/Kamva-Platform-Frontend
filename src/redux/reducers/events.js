import * as actionTypes from '../actions/actionTypes';

const initState = {
  isFetching: false,
};

function event(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        events: action.response.events,
      };

    case actionTypes.EVENT_REGISTRATION_INFO_SUCCESS:
      return {
        ...state,
        [action.payload.event_id]: {
          ...state[action.payload.event_id],
          participant_id: action.response.me,
          event: action.response.event,
          team: action.response.team,
        }
      };

    case actionTypes.PAYMENT_REQUEST:
    case actionTypes.APPLY_DISCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    // case actionTypes.APPLY_DISCOUNT_SUCCESS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     [action.payload.event_id]: {
    //       ...state[action.payload.event_id],
    //       is_valid: action.response.is_valid,
    //       discount_value: action.response.value,
    //     }
    //   }

    case actionTypes.APPLY_DISCOUNT_FAILURE:
    case actionTypes.APPLY_DISCOUNT_SUCCESS:
    case actionTypes.PAYMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    case actionTypes.PAYMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }

    default:
      return state;
  }
}

export default event;


