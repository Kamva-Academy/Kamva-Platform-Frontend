import { connect, send } from '@giantmachines/redux-websocket';
import { compressNodes } from '../../utils/compresstion';
import * as wsActionTypes from './wsActionTypes';

export const connectToTeam = ({ teamUUID, userUUID }) =>
  connect(`wss://rastaiha.ir/ws/${teamUUID}/${userUUID}/`);

export const getLastWhiteboard = () =>
  send({ type: wsActionTypes.JOIN_TO_GROUP_ROOM });

export const sendWhiteboardNodes = (getState) => {
  const whiteboard = getState().whiteboard.present;
  return send({
    type: wsActionTypes.PASS_DRAWING_STATE,
    data: compressNodes({
      nodes: whiteboard.nodes,
      changeCount: +whiteboard.changeCount,
    }),
  });
};

export const saveAndSendWhiteboardNodes = (action) => (dispatch, getState) => {
  dispatch(action);
  dispatch(sendWhiteboardNodes(getState));
};
