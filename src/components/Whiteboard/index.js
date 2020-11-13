import React, { useState } from 'react';
import {
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
  deselectNodes,
  selectNode,
  removeNode,
  updateShapeProps,
  addNewLineNode,
}) {
  const classes = useStyles();

  const [stage, setStage] = useState();

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
});

export default connect(mapStateToProps, {
  deselectNodes,
  selectNode,
  updateShapeProps,
  addNewLineNode,
  removeNode,
})(Whiteboard);
