import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';
import { saveAndSendWhiteboardNodes } from './websocket';

export const deselectNode = (node_id) => ({
  type: actionTypes.DESELECT_NODE,
  payload: { node_id },
});

export const initWhiteboard = () => ({
  type: actionTypes.INIT_WHITEBOARD,
});

export const deselectNodes = () => ({
  type: actionTypes.DESELECT_NODES,
});

export const selectNode = (node_id) => ({
  type: actionTypes.SELECT_NODE,
  payload: { node_id },
});

const addNode = (type, shapeProps = {}, transformerProps = {}, id = makeId()) =>
  saveAndSendWhiteboardNodes({
    type: actionTypes.ADD_NODE,
    payload: {
      node: {
        isSelected: false,
        id,
        type,
        shapeProps,
        transformerProps,
      },
    },
  });

export const addNewLineNode = (line) =>
  addNode('LINE', {
    ...line.shapeProps,
    points: line.points,
  });

export const addNewTextNode = () =>
  addNode(
    'TEXT',
    {
      text: 'اینجا بنویسید',
      x: 50,
      y: 80,
      fontSize: 20,
      draggable: true,
      width: 200,
      align: 'right',
      fontFamily: 'iranyekan',
    },
    {
      enabledAnchors: ['middle-left', 'middle-right'],
      boundBoxFunc: function (oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      },
    }
  );

export const addNewCircleNode = ({ type }) => {
  let options = {
    x: 100,
    shadowBlur: 3,
  };
  if (type === 'outlined') {
    options = {
      ...options,
      y: 180,
      width: 96,
      height: 96,
      stroke: 2,
      strokeColor: 'black',
    };
  } else {
    options = {
      ...options,
      y: 100,
      width: 100,
      height: 100,
      fill: 'black',
    };
  }
  return addNode('CIRCLE', options);
};

export const addNewRectangleNode = ({ type }) => {
  let options = {
    x: 100,
    shadowBlur: 3,
  };
  if (type === 'outlined') {
    options = {
      ...options,
      y: 180,
      width: 96,
      height: 96,
      stroke: 2,
      strokeColor: 'black',
    };
  } else {
    options = {
      ...options,
      y: 100,
      width: 100,
      height: 100,
      fill: 'black',
    };
  }
  return addNode('RECT', options);
};

export const updateShapeProps = (node_id, shapeProps) =>
  saveAndSendWhiteboardNodes({
    type: actionTypes.UPDATE_SHAPE_PROPS,
    payload: {
      node_id,
      shapeProps,
    },
  });

export const changeMode = (mode) => ({
  type: actionTypes.CHANGE_MODE,
  payload: {
    mode,
  },
});

export const removeSelectedNodes = () =>
  saveAndSendWhiteboardNodes({
    type: actionTypes.REMOVE_SELECTED_NODES,
  });

export const removeNode = (nodeId) =>
  saveAndSendWhiteboardNodes({
    type: actionTypes.REMOVE_NODE,
    payload: {
      nodeId,
    },
  });
