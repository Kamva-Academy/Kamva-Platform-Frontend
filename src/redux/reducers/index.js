import { IntlReducer as Intl } from 'react-redux-multilingual';
import { combineReducers } from 'redux';

import account from './account';
import currentState from './currentState';
import mentor from './mentor';
import notifications from './notifications';
import redirect from './redirect';
import websocket from './websocket';
import whiteboard from './whiteboard';

const allReducers = combineReducers({
  account,
  currentState,
  notifications,
  mentor,
  whiteboard,
  websocket,
  redirect,
  Intl,
});
export default allReducers;
