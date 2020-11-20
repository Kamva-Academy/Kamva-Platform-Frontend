import { combineReducers } from 'redux';
import account from './account';
import notifications from './notifications';
import mentor from './mentor';

import whiteboard from './whiteboard';
import websocket from './websocket';
import redirect from './redirect';
import currentState from './currentState';
import { IntlReducer as Intl } from 'react-redux-multilingual';

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
