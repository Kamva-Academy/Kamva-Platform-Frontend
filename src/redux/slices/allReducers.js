import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { translatorReducer } from './translator';

const allReducers = combineReducers({
  account: accountReducer,
  local: translatorReducer,
});

export default allReducers;
