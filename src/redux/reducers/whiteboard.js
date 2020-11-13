import undoable from 'redux-undo';
import DrawingModes from '../../components/Konva/Drawing/DrawingModes';
import * as actionTypes from '../actions/actionTypes';

const initState = {
  mode: DrawingModes.MOVE,
  paintingConfig: {
    stroke: 'black',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
  },
  nodes: [],
  changeCount: 0,
};
function whiteboard(state = initState, action) {
  switch (action.type) {
    case actionTypes.REDUX_UPDATE_WHITEBOARD:
      if (action.payload.changeCount > state.changeCount) {
        return {
          ...state,
          nodes: action.payload.nodes,
          changeCount: action.payload.changeCount,
        };
      }
      return state;

    case actionTypes.INIT_WHITEBOARD:
      return initState;

    case actionTypes.DESELECT_NODES:
      return {
        ...state,
        nodes: state.nodes.map((node) => ({ ...node, isSelected: false })),
      };
    case actionTypes.DESELECT_NODE:
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.node_id
            ? { ...node, isSelected: false }
            : node
        ),
      };
    case actionTypes.SELECT_NODE:
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.node_id
            ? { ...node, isSelected: true }
            : node
        ),
      };
    case actionTypes.ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.payload.node],
        changeCount: state.changeCount + 1,
      };
    case actionTypes.UPDATE_SHAPE_PROPS:
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.node_id
            ? { ...node, shapeProps: action.payload.shapeProps }
            : node
        ),
        changeCount: state.changeCount + 1,
      };
    case actionTypes.CHANGE_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    case actionTypes.REMOVE_SELECTED_NODES:
      return {
        ...state,
        nodes: state.nodes.filter((node) => !node.isSelected),
        changeCount: state.changeCount + 1,
      };
    case actionTypes.REMOVE_NODE:
      return {
        ...state,
        nodes: state.nodes.filter((node) => node.id !== action.payload.nodeId),
        changeCount: state.changeCount + 1,
      };
    default:
      return state;
  }
}

const undoableWhiteboard = undoable(whiteboard, {
  limit: 20,
  filter: (action) => {
    switch (action.type) {
      case actionTypes.ADD_NODE:
      case actionTypes.UPDATE_SHAPE_PROPS:
      case actionTypes.REMOVE_SELECTED_NODES:
      case actionTypes.REMOVE_NODE:
        return true;

      default:
        return false;
    }
  },
});

export default undoableWhiteboard;
