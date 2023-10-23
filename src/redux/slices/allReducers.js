import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { eventsReducer } from './events';
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { widgetReducer } from './widget';
import { workshopReducer } from './workshop';
import { articleReducer } from './article';
import { paperReducer } from './Paper';
import { scoringReducer } from './scoring';
import { questionReducer } from './Question';
import { WebSiteAppearanceReducer } from './WebSiteAppearance';
import { RoadmapReducer } from './Roadmap';

const allReducers = combineReducers({
  paper: paperReducer,
  account: accountReducer,
  currentState: currentStateReducer,
  WebSiteAppearance: WebSiteAppearanceReducer,
  Roadmap: RoadmapReducer,
  notifications: notificationReducer,
  whiteboard: whiteboardReducer,
  widget: widgetReducer,
  redirect: redirectReducer,
  events: eventsReducer,
  workshop: workshopReducer,
  article: articleReducer,
  Intl: translatorReducer,
  scoring: scoringReducer,
  question: questionReducer,
});

export default allReducers;
