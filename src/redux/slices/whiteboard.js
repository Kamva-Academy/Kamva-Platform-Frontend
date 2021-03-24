import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import undoable, { includeAction } from 'redux-undo';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import DrawingModes from '../../components/Konva/Drawing/DrawingModes';
import {
  addWhiteboardNode,
  getWhiteboard,
  updateWhiteboardNode,
} from '../../parse/whiteboard';
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

export const getWhiteboardNodesAction = createAsyncThunk(
  'whiteboard/getOne',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      return { nodes: (await getWhiteboard({ uuid })).get('nodes') };
    } catch (err) {
      alert(err);
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
  }
);

export const addWhiteboardNodeAction = createAsyncThunk(
  'whiteboard/addNode',
  async ({ uuid, node }, { rejectWithValue }) => {
    try {
      await addWhiteboardNode({
        uuid,
        node: { ...node, id: makeId() },
      });
    } catch (err) {
      alert(JSON.stringify(err));
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
  }
);

export const updateWhiteboardNodeAction = createAsyncThunk(
  'whiteboard/update',
  async ({ uuid, nodeId, shape }, { rejectWithValue }) => {
    try {
      await updateWhiteboardNode({
        uuid,
        nodeId,
        shape,
      });
    } catch {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
  }
);

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    init: () => initialState,
    deselectNode: (state, { payload: { nodeId } }) => {
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, isSelected: false } : node
      );
    },
    deselectNodes: (state) => {
      state.nodes = state.nodes.map((node) => ({
        ...node,
        isSelected: false,
      }));
    },
    selectNode: (state, { payload: { nodeId } }) => {
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, isSelected: true } : node
      );
    },
    addNode: (state, { payload: { node } }) => {
      state.nodes.push(node);
    },
    updateNode: (state, { payload: { nodeId, shape } }) => {
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, shape } : node
      );
    },
    changeMode: (state, { payload: { mode } }) => {
      state.mode = mode;
    },
    removeSelected: (state) => {
      state.nodes = state.nodes.filter((node) => !node.isSelected);
    },
    removeAllNodes: (state) => {
      state.nodes = [];
    },
    remove: (state, { payload: { nodeId } }) => {
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
    },
  },

  extraReducers: {
    [getWhiteboardNodesAction.fulfilled.toString()]: (
      state,
      { payload: { nodes } }
    ) => {
      state.nodes = nodes;
    },
  },
});

export const {
  init: initWhiteboardAction,
  deselectNodes: deselectWhiteboardNodesAction,
  deselectNode: deselectWhiteboardNodeAction,
  selectNode: selectWhiteboardNodeAction,
  addNode: offlineAddNodeAction,
  updateNode: offlineUpdateNodeAction,
  changeMode: changeWhiteboardModeAction,
  removeSelected: removeWhiteboardSelectedNodeAction,
  removeAllNodes: removeWhiteboardAllNodeAction,
  remove: removeWhiteboardNodeAction,
} = whiteboardSlice.actions;

export const whiteboardReducer = undoable(whiteboardSlice.reducer, {
  limit: 20,
  filter: includeAction([
    addWhiteboardNodeAction.toString(),
    updateWhiteboardNodeAction.toString(),
    removeWhiteboardSelectedNodeAction.toString(),
    removeWhiteboardNodeAction.toString(),
  ]),
});

export const addNewLineNodeAction = ({ uuid, line }) =>
  addWhiteboardNodeAction({
    uuid,
    node: {
      type: 'LINE',
      shape: {
        ...line.shape,
        points: line.points,
      },
    },
  });

export const addNewTextNodeAction = ({ uuid }) =>
  addWhiteboardNodeAction({
    uuid,
    node: {
      type: 'TEXT',
      shape: {
        text: 'اینجا بنویسید',
        x: 50,
        y: 80,
        fontSize: 20,
        draggable: true,
        width: 200,
        align: 'right',
        fontFamily: 'iranyekan',
      },
    },
  });

export const addNewCircleNodeAction = ({ uuid, type }) => {
  let shape = {
    x: 100,
    shadowBlur: 3,
  };
  if (type === 'outlined') {
    shape = {
      ...shape,
      y: 180,
      width: 96,
      height: 96,
      stroke: 2,
      strokeColor: 'black',
    };
  } else {
    shape = {
      ...shape,
      y: 100,
      width: 100,
      height: 100,
      fill: 'black',
    };
  }
  return addWhiteboardNodeAction({
    uuid,
    node: {
      type: 'CIRCLE',
      shape,
    },
  });
};

export const addNewRectangleNodeAction = ({ uuid, type }) => {
  let shape = {
    x: 100,
    shadowBlur: 3,
  };
  if (type === 'outlined') {
    shape = {
      ...shape,
      y: 180,
      width: 96,
      height: 96,
      stroke: 2,
      strokeColor: 'black',
    };
  } else {
    shape = {
      ...shape,
      y: 100,
      width: 100,
      height: 100,
      fill: 'black',
    };
  }
  return addWhiteboardNodeAction({
    uuid,
    node: {
      type: 'RECT',
      shape,
    },
  });
};

export const undo = () => UndoActionCreators.undo();
export const redo = () => UndoActionCreators.redo();
