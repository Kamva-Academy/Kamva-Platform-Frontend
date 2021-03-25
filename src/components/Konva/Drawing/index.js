import React, { useCallback, useContext, useRef, useState } from 'react';
import { Layer, Line, Rect, Stage } from 'react-konva';

import { StatePageContext } from '../../../containers/Workshop';
import DrawingModes from './DrawingModes';
import KonvaNode from './KonvaNode';

function Drawing({
  width,
  height,
  drawingMode,
  nodes,
  onDeselectNodes,
  onSelectNode,
  updateShapeProps,
  addNewLineNode,
  paintingConfig,
  removeNode,
  onSetStage,
}) {
  const stageEl = useRef();
  const setStage = useCallback(
    (node) => {
      if (node) {
        onSetStage(node);
      }
      stageEl.current = node;
    },
    [onSetStage]
  );

  const backgroundEl = useRef();
  const [isRemoving, setIsRemoving] = useState(false);
  const [activeLine, setActiveLine] = useState();

  const onTouchStageStart = (e) => {
    if (e.target === backgroundEl.current) {
      onDeselectNodes();
    }
    if (drawingMode === DrawingModes.DELETE) {
      setIsRemoving(true);
    } else {
      setIsRemoving(false);
    }
    if (
      drawingMode !== DrawingModes.ERASING &&
      drawingMode !== DrawingModes.PAINTING
    ) {
      return;
    }
    let { x, y } = stageEl.current.getPointerPosition();
    setActiveLine({
      lastUpdate: Date.now(),
      points: [x, y],
      shape: {
        ...paintingConfig,
        globalCompositeOperation:
          drawingMode === DrawingModes.ERASING
            ? 'destination-out'
            : 'source-over',
      },
    });
  };

  const updateActiveLine = () => {
    let { x, y } = stageEl.current.getPointerPosition();
    const len = activeLine.points.length;
    if (activeLine.points[len - 2] !== x || activeLine.points[len - 1] !== y) {
      setActiveLine({
        ...activeLine,
        lastUpdate: Date.now(),
        points: [...activeLine.points, x, y],
      });
    }
  };

  const onTouchStageMove = () => {
    if (activeLine && Date.now() - activeLine.lastUpdate > 30) {
      updateActiveLine();
    }
  };

  const {
    player: { uuid },
  } = useContext(StatePageContext);

  const onTouchStageEnd = () => {
    if (activeLine) {
      addNewLineNode({ uuid, line: activeLine });
    }
    setIsRemoving(false);
    setActiveLine(null);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className="drawing"
      style={{
        float: 'left',
        direction: 'ltr',
        overflowX: 'scroll',
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}>
      <Stage
        width={width}
        height={height}
        ref={setStage}
        onMouseDown={onTouchStageStart}
        onTouchStart={onTouchStageStart}
        onMouseMove={onTouchStageMove}
        onTouchMove={onTouchStageMove}
        onMouseUp={onTouchStageEnd}
        onTouchEnd={onTouchStageEnd}>
        <Layer>
          <Rect
            ref={backgroundEl}
            x={0}
            y={0}
            fill="white"
            width={width}
            height={height}
          />
          {nodes.map((node) => (
            <KonvaNode
              key={node.id}
              drawingMode={drawingMode}
              {...node}
              onChange={(newAttrs) =>
                updateShapeProps({ uuid, nodeId: node.id, shape: newAttrs })
              }
              onSelect={() => {
                onDeselectNodes();
                if (drawingMode === DrawingModes.DELETE) {
                  removeNode({ uuid, nodeId: node.id });
                } else {
                  onSelectNode({ nodeId: node.id });
                }
              }}
              onTouchMove={() => {
                if (drawingMode === DrawingModes.DELETE && isRemoving) {
                  removeNode({ uuid, nodeId: node.id });
                }
              }}
            />
          ))}
          {activeLine && (
            <Line {...activeLine.shape} points={activeLine.points} />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default Drawing;
