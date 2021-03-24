import React, { useCallback, useEffect, useRef } from 'react';
import { Circle, Image, Line, Rect, Transformer } from 'react-konva';

import KonvaTextNode from './Components/KonvaTextNode';
import DrawingModes from './DrawingModes';

const nodeComponents = {
  RECT: Rect,
  CIRCLE: Circle,
  LINE: Line,
  IMAGE: Image,
  TEXT: KonvaTextNode,
};

export default function KonvaNode({
  isSelected,
  drawingMode,
  type,
  shape,
  onSelect,
  onChange,
  onTouchMove,
}) {
  const nodeEl = useRef();

  const transformerProps =
    type === 'TEXT'
      ? {
          enabledAnchors: ['middle-left', 'middle-right'],
          boundBoxFunc: function (oldBox, newBox) {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          },
        }
      : {};

  const setNode = useCallback(
    (node) => {
      if (node) {
        if (drawingMode === DrawingModes.MOVE) {
          node.draggable(true);
        } else {
          node.draggable(false);
        }
      }
      nodeEl.current = node;
    },
    [drawingMode]
  );

  useEffect(() => {
    if (isSelected) {
      transformerEl.current.nodes([nodeEl.current]);
      transformerEl.current.getLayer().batchDraw();
    } else {
      transformerEl.current.nodes([]);
      transformerEl.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const transformerEl = useRef();
  const Node = nodeComponents[type];

  return (
    <>
      <Node
        ref={setNode}
        {...shape}
        onClick={onSelect}
        onTouchEnd={onSelect}
        onMouseMove={onTouchMove}
        onTouchMove={onTouchMove}
        onDragEnd={(e) =>
          onChange({
            ...shape,
            x: e.target.x(),
            y: e.target.y(),
          })
        }
        onTransformEnd={() =>
          onChange({
            ...shape,
            x: nodeEl.current.x(),
            y: nodeEl.current.y(),
            width: nodeEl.current.width(),
            scaleX: nodeEl.current.scaleX(),
            scaleY: nodeEl.current.scaleY(),
            rotation: nodeEl.current.rotation(),
          })
        }
        onTextChange={(text) =>
          onChange({
            ...shape,
            text,
          })
        }
        transformer={transformerEl.current}
      />
      <Transformer ref={transformerEl} {...transformerProps} />
    </>
  );
}
