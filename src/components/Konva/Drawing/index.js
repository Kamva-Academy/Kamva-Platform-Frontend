import React, { useCallback, useRef, useState } from 'react';
import { Layer, Stage, Rect, Line } from 'react-konva';
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

  const setStage = useCallback((node) => {
    if (node) {
      onSetStage(node);
    }
    stageEl.current = node;
  }, []);

  const backgroundEl = useRef();
  const [isRemoving, setIsRemoving] = useState();
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
      shapeProps: {
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

  const onTouchStageEnd = () => {
    if (activeLine) {
      addNewLineNode(activeLine);
    }
    setIsRemoving(false);
    setActiveLine(null);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
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
            onChange={(newAttrs) => updateShapeProps(node.id, newAttrs)}
            onSelect={() => {
              onDeselectNodes();
              if (drawingMode === DrawingModes.DELETE) {
                removeNode(node.id);
              } else {
                onSelectNode(node.id);
              }
            }}
            onTouchMove={() => {
              if (drawingMode === DrawingModes.DELETE && isRemoving) {
                removeNode(node.id);
              }
            }}
          />
        ))}
        {activeLine && (
          <Line {...activeLine.shapeProps} points={activeLine.points} />
        )}
      </Layer>
    </Stage>
  );
}

export default Drawing;
