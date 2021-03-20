import { disconnect as wsDisconnect } from '@giantmachines/redux-websocket';
import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from '../../containers/Workshop';
import {
  connectToTeam,
  getLastWhiteboard,
} from '../../redux/actions/websocket';
import {
  addNewLineNode,
  deselectNodes,
  initWhiteboard,
  removeNode,
  selectNode,
  updateShapeProps,
} from '../../redux/actions/whiteboard';
import Drawing from '../Konva/Drawing';
import WhiteboardNavbar from './WhiteboardNavbar';

const useStyles = makeStyles((theme) => ({
  whiteboard: {
    position: 'relative',
    display: 'inline-block',
    background: '#F7F9FC',
    touchAction: 'none',
    width: '100%',
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
  isFullScreen,
  setIsFullScreen,
}) {
  const classes = useStyles();

  const [stage, setStage] = useState();
  const { player } = useContext(StatePageContext);

  useEffect(() => {
    initWhiteboard();
    connectToTeam({ playerUUID: player.uuid, userUUID });
    return () => wsDisconnect();
  }, [initWhiteboard, connectToTeam, wsDisconnect, player.uuid, userUUID]);

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
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
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
