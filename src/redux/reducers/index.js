import { IntlReducer as Intl } from 'react-redux-multilingual';
import { combineReducers } from 'redux';

import currentState from './currentState';
import events from './events';
import landing from './landing';
import mentor from './mentor';
import notifications from './notifications';
import redirect from './redirect';
import websocket from './websocket';

const allReducers = combineReducers({
  currentState,
  notifications,
  mentor,
  websocket,
  redirect,
  landing,
  events,
  Intl,
});
export default allReducers;
