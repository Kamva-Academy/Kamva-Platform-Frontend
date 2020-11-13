import { combineReducers } from 'redux';
import account from './account';
import notifications from './notifications';
import mentor from './mentor';

import whiteboard from './whiteboard';
import { IntlReducer as Intl } from 'react-redux-multilingual';

const allReducers = combineReducers({
  account,
  notifications,
  mentor,
  whiteboard,
  Intl,
});
export default allReducers;
