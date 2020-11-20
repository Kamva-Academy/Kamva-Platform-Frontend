import React, { useContext, useEffect, useState } from 'react';
import {
  initWhiteboard,
  deselectNodes,
  selectNode,
  updateShapeProps,
  addNewLineNode,
  removeNode,
} from '../../redux/actions/whiteboard';
import { connect } from 'react-redux';

import Drawing from '../Konva/Drawing';
import { makeStyles } from '@material-ui/core';
import WhiteboardNavbar from './WhiteboardNavbar';
import { disconnect as wsDisconnect } from '@giantmachines/redux-websocket';
import {
  connectToTeam,
  getLastWhiteboard,
} from '../../redux/actions/websocket';
import { StatePageContext } from '../../containers/Workshop';

const useStyles = makeStyles((theme) => ({
  whiteboard: {
    position: 'relative',
    display: 'inline-block',
    background: '#F7F9FC',
    touchAction: 'none',
  },
}));

function Whiteboard({
  width,
  height,
  nodes,
  drawingMode,
  paintingConfig,
  wsConnected,
  deselectNodes,
  selectNode,
  removeNode,
  updateShapeProps,
  addNewLineNode,
  initWhiteboard,
  connectToTeam,
  wsDisconnect,
  getLastWhiteboard,
  userUUID,
  handleClose,
}) {
  const classes = useStyles();

  const [stage, setStage] = useState();
  const { playerUUID } = useContext(StatePageContext);

  useEffect(() => {
    initWhiteboard();
    connectToTeam({ playerUUID, userUUID });
    return () => wsDisconnect();
  }, [initWhiteboard, connectToTeam, wsDisconnect, playerUUID, userUUID]);

  useEffect(() => {
    if (wsConnected) {
      getLastWhiteboard();
    }
  }, [wsConnected, getLastWhiteboard]);

  return (
    <div className={classes.whiteboard}>
      <WhiteboardNavbar
        getDataURL={() => stage.toDataURL()}
        handleClose={handleClose}
      />
      <Drawing
        onSetStage={(stage) => setStage(stage)}
        width={width}
        height={height}
        drawingMode={drawingMode}
        nodes={nodes}
        onDeselectNodes={deselectNodes}
        onSelectNode={selectNode}
        updateShapeProps={updateShapeProps}
        addNewLineNode={addNewLineNode}
        paintingConfig={paintingConfig}
        removeNode={removeNode}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userUUID: state.account.user.uuid,
  nodes: state.whiteboard.present.nodes,
  drawingMode: state.whiteboard.present.mode,
  paintingConfig: state.whiteboard.present.paintingConfig,
  wsConnected: state.websocket.connected,
});

export default connect(mapStateToProps, {
  deselectNodes,
  selectNode,
  updateShapeProps,
  addNewLineNode,
  removeNode,
  initWhiteboard,
  connectToTeam,
  wsDisconnect,
  getLastWhiteboard,
})(Whiteboard);
