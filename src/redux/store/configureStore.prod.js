import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api/api';
import rootReducer from '../reducers';
import reduxWebsocket from '@giantmachines/redux-websocket';

const configureStore = (preloadedState) =>
  createStore(
    rootReducer,
    { Intl: { locale: 'fa' }, ...preloadedState },
    applyMiddleware(thunk, api, reduxWebsocket())
  );
export default configureStore;
