import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { eventsReducer } from './events';
import { landingReducer } from './landing';
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { widgetReducer } from './widget';

const allReducers = combineReducers({
  account: accountReducer,
  currentState: currentStateReducer,
  notifications: notificationReducer,
  whiteboard: whiteboardReducer,
  widget: widgetReducer,
  redirect: redirectReducer,
  landing: landingReducer,
  events: eventsReducer,
  Intl: translatorReducer,
});

export default allReducers;
