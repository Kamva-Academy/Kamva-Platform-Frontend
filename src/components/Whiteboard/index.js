import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  addNewLineNodeAction,
  deselectWhiteboardNodesAction,
  initWhiteboardAction,
  removeWhiteboardNodeAction,
  selectWhiteboardNodeAction,
  updateWhiteboardNodeAction,
} from '../../redux/slices/whiteboard';
import Drawing from '../Konva/Drawing';
import WhiteboardNavbar from './WhiteboardNavbar';

const useStyles = makeStyles(() => ({
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
  deselectNodes,
  selectNode,
  removeNode,
  updateShapeProps,
  addNewLineNode,
  handleClose,
  isFullScreen,
  setIsFullScreen,
}) {
  const classes = useStyles();

  const [stage, setStage] = useState();

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
});

export default connect(mapStateToProps, {
  deselectNodes: deselectWhiteboardNodesAction,
  selectNode: selectWhiteboardNodeAction,
  updateShapeProps: updateWhiteboardNodeAction,
  addNewLineNode: addNewLineNodeAction,
  removeNode: removeWhiteboardNodeAction,
  initWhiteboard: initWhiteboardAction,
})(Whiteboard);
