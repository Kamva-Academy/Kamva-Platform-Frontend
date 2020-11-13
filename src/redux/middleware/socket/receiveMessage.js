import {
  REDUX_UPDATE_WHITEBOARD,
  REDUX_WEBSOCKET_MESSAGE,
} from '../../actions/actionTypes';
import { sendWhiteboardNodes } from '../../actions/websocket';
import {
  JOIN_TO_GROUP_ROOM,
  PASS_DRAWING_STATE,
} from '../../actions/wsActionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ getState, dispatch }) => (next) => async (action) => {
  if (action.type !== REDUX_WEBSOCKET_MESSAGE) {
    return next(action);
  }

  const message = {
    data: JSON.parse(action.payload.message),
    origin: action.payload.origin,
    timestamp: action.meta.timestamp,
  };

  switch (message.data.type) {
    case JOIN_TO_GROUP_ROOM:
      return dispatch(sendWhiteboardNodes(getState));
    case PASS_DRAWING_STATE:
      return next({
        type: REDUX_UPDATE_WHITEBOARD,
        payload: {
          nodes: message.data.data.nodes,
          changeCount: message.data.data.changeCount,
        },
      });
    default:
      return next(action);
  }
};
