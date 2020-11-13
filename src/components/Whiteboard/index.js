import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  whiteboard: {
    position: 'relative',
    display: 'inline-block',
    padding: theme.spacing(1),
    background: '#F7F9FC',
    borderRadius: 10,
    boxShadow:
      '0 3px #bbb, 0 6px #aaa, 0 -3px #bbb, 0 -6px #aaa, 3px 0 #bbb, 6px 0 #aaa, -3px 0 #bbb, -6px 0 #aaa',
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
}) {
  const classes = useStyles();

  const [stage, setStage] = useState();

  useEffect(() => {
    const teamUUID = 'e33227d2-7533-44c6-8978-857b4425eba8';
    const userUUID = 'e2713a2f-ebed-4b05-82a8-36f129c49d4e';
    initWhiteboard();
    connectToTeam({ teamUUID, userUUID });
    return () => wsDisconnect();
  }, [initWhiteboard, connectToTeam, wsDisconnect]);

  useEffect(() => {
    if (wsConnected) {
      getLastWhiteboard();
    }
  }, [wsConnected, getLastWhiteboard]);

  return (
    <div className={classes.whiteboard}>
      <WhiteboardNavbar getDataURL={() => stage.toDataURL()} />
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
