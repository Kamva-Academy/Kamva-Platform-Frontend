import * as actionTypes from '../actions/actionTypes';

const initState = {
  connected: false,
  lastOpen: null,
  lastClose: null,
  receivedMessages: [],
  url: null,
};

function websocket(state = initState, action) {
  switch (action.type) {
    case actionTypes.REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        url: action.payload.url,
      };

    case actionTypes.REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true,
        lastOpen: action.meta.timestamp,
      };

    case actionTypes.REDUX_WEBSOCKET_BROKEN:
    case actionTypes.REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
        lastClose: action.meta.timestamp,
      };

    default:
      return state;
  }
}

export default websocket;
