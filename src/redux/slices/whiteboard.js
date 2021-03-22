import { createSlice } from '@reduxjs/toolkit';
import undoable, { includeAction } from 'redux-undo';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import DrawingModes from '../../components/Konva/Drawing/DrawingModes';
import makeId from '../../utils/makeId';

const initialState = {
  mode: DrawingModes.MOVE,
  paintingConfig: {
    stroke: 'black',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
  },
  nodes: [],
  version: 0,
};

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    update: (state, { payload }) => {
      if (payload.version > state.version) {
        state.nodes = payload.nodes;
        state.version = payload.version;
      }
    },
    init: () => initialState,
    deselectNode: (state, { payload }) => {
      state.nodes = state.nodes.map((node) =>
        node.id === payload ? { ...node, isSelected: false } : node
      );
    },
    deselectNodes: (state) => {
      state.nodes = state.nodes.map((node) => ({
        ...node,
        isSelected: false,
      }));
    },
    selectNode: (state, { payload }) => {
      state.nodes = state.nodes.map((node) =>
        node.id === payload ? { ...node, isSelected: true } : node
      );
    },
    addNode: (state, { payload: { type, shapeProps, transformerProps } }) => {
      state.nodes.push({ type, id: makeId(), shapeProps, transformerProps });
    },
    updateNode: (state, { payload }) => {
      state.nodes = state.nodes.map((node) =>
        node.id === payload.nodeId
          ? { ...node, shapeProps: payload.shapeProps }
          : node
      );
    },
    changeMode: (state, { payload }) => {
      state.mode = payload.mode;
    },
    removeSelected: (state) => {
      state.nodes = state.nodes.filter((node) => !node.isSelected);
    },
    removeAllNodes: (state) => {
      state.nodes = [];
    },
    remove: (state, { payload }) => {
      state.nodes = state.nodes.filter((node) => node.id !== payload.nodeId);
    },
  },
});

export const {
  update: updateWhiteboardAction,
  init: initWhiteboardAction,
  deselectNodes: deselectWhiteboardNodesAction,
  deselectNode: deselectWhiteboardNodeAction,
  selectNode: selectWhiteboardNodeAction,
  addNode: addWhiteboardNodeAction,
  updateNode: updateWhiteboardNodeAction,
  changeMode: changeWhiteboardModeAction,
  removeSelected: removeWhiteboardSelectedNodeAction,
  removeAllNodes: removeWhiteboardAllNodeAction,
  remove: removeWhiteboardNodeAction,
} = whiteboardSlice.actions;

export const whiteboardReducer = undoable(whiteboardSlice.reducer, {
  limit: 20,
  filter: includeAction([
    addWhiteboardNodeAction.toString(),
    updateWhiteboardAction.toString(),
    removeWhiteboardSelectedNodeAction.toString(),
    removeWhiteboardNodeAction.toString(),
  ]),
});

export const addNewLineNodeAction = (line) =>
  addWhiteboardNodeAction({
    type: 'LINE',
    shapeProps: {
      ...line.shapeProps,
      points: line.points,
    },
  });

export const addNewTextNodeAction = () =>
  addWhiteboardNodeAction({
    type: 'TEXT',
    shapeProps: {
      text: 'اینجا بنویسید',
      x: 50,
      y: 80,
      fontSize: 20,
      draggable: true,
      width: 200,
      align: 'right',
      fontFamily: 'iranyekan',
    },
    transformerProps: {
      enabledAnchors: ['middle-left', 'middle-right'],
      boundBoxFunc: function (oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      },
    },
  });

export const addNewCircleNodeAction = ({ type }) => {
  let shapeProps = {
    x: 100,
    shadowBlur: 3,
  };
  if (type === 'outlined') {
    shapeProps = {
      ...shapeProps,
      y: 180,
      width: 96,
      height: 96,
      stroke: 2,
      strokeColor: 'black',
    };
  } else {
    shapeProps = {
      ...shapeProps,
      y: 100,
      width: 100,
      height: 100,
      fill: 'black',
    };
  }
  return addWhiteboardNodeAction({
    type: 'CIRCLE',
    shapeProps,
  });
};

export const addNewRectangleNodeAction = ({ type }) => {
  let shapeProps = {
    x: 100,
    shadowBlur: 3,
  };
  if (type === 'outlined') {
    shapeProps = {
      ...shapeProps,
      y: 180,
      width: 96,
      height: 96,
      stroke: 2,
      strokeColor: 'black',
    };
  } else {
    shapeProps = {
      ...shapeProps,
      y: 100,
      width: 100,
      height: 100,
      fill: 'black',
    };
  }
  return addWhiteboardNodeAction({
    type: 'RECT',
    shapeProps,
  });
};

export const undo = () => UndoActionCreators.undo();
export const redo = () => UndoActionCreators.redo();
