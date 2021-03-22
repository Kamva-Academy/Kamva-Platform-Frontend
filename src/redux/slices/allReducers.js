import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { eventsReducer } from './events';
import { landingReducer } from './landing';
import { mentorReducer } from './mentor';
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';

const allReducers = combineReducers({
  account: accountReducer,
  currentState: currentStateReducer,
  notifications: notificationReducer,
  mentor: mentorReducer,
  whiteboard: whiteboardReducer,
  redirect: redirectReducer,
  landing: landingReducer,
  events: eventsReducer,
  Intl: translatorReducer,
});

export default allReducers;
