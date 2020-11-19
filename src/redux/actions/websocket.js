import { connect, send } from '@giantmachines/redux-websocket';
import { compressNodes } from '../../utils/compresstion';
import * as actionTypes from './actionTypes';
import * as wsActionTypes from './wsActionTypes';

export const connectToTeam = ({ teamUUID, userUUID }) =>
  connect(`wss://a-lympiad.rastaiha.ir/ws/${teamUUID}/${userUUID}/`);

export const getLastWhiteboard = () =>
  send({ type: wsActionTypes.JOIN_TO_GROUP_ROOM });

export const sendWhiteboardNodes = (getState) => {
  const whiteboard = getState().whiteboard.present;
  return send({
    type: wsActionTypes.PASS_DRAWING_STATE,
    data: compressNodes({
      nodes: whiteboard.nodes,
      version: +whiteboard.version,
    }),
  });
};

export const saveAndSendWhiteboardNodes = (action) => (dispatch, getState) => {
  const futureLength = getState().whiteboard.future.length;
  dispatch(action);
  dispatch({
    type: actionTypes.INCREASE_WHITEBOARD_VERSION,
    payload: futureLength,
  });
  dispatch(sendWhiteboardNodes(getState));
};
