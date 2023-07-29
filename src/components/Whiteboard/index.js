import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from 'pages/FSM';
import { getWhiteboardActionSubscription } from '../../parse/whiteboard';
import {
  addNewLineNodeAction,
  deselectWhiteboardNodesAction,
  getWhiteboardNodesAction,
  initWhiteboardAction,
  offlineUpdateWhiteboardAction,
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
  offlineUpdateWhiteboard,
  removeNode,
  updateShapeProps,
  addNewLineNode,
  handleClose,
  isFullScreen,
  setIsFullScreen,
  getWhiteboardNodes,
}) {
  const classes = useStyles();
  const subscriberRef = useRef(null);
  const [stage, setStage] = useState();

  const { teamId } = useContext(StatePageContext);

  useEffect(() => {
    const subscribe = async (teamId) => {
      getWhiteboardNodes({ uuid: teamId });
      const subscriber = await getWhiteboardActionSubscription({
        uuid: teamId,
      });
      subscriber.on('create', (whiteboardAction) =>
        offlineUpdateWhiteboard(whiteboardAction.get('action'))
      );
      subscriberRef.current = subscriber;
    }
    if (teamId) {
      subscribe(teamId);
    }
    return () => {
      subscriberRef.current?.unsubscribe();
    };
  }, [teamId]);

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
  nodes: state.whiteboard.present.nodes,
  drawingMode: state.whiteboard.present.mode,
  paintingConfig: state.whiteboard.present.paintingConfig,
});

export default connect(mapStateToProps, {
  deselectNodes: deselectWhiteboardNodesAction,
  selectNode: selectWhiteboardNodeAction,
  updateShapeProps: updateWhiteboardNodeAction,
  addNewLineNode: addNewLineNodeAction,
  initWhiteboard: initWhiteboardAction,
  getWhiteboardNodes: getWhiteboardNodesAction,
  offlineUpdateWhiteboard: offlineUpdateWhiteboardAction,
  removeNode: removeWhiteboardNodeAction,
})(Whiteboard);
