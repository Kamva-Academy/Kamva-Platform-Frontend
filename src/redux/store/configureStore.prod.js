import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api/api';
import rootReducer from '../reducers';
import reduxWebsocket from '@giantmachines/redux-websocket';
import receiveMessage from '../middleware/socket/receiveMessage';

const configureStore = (preloadedState) =>
  createStore(
    rootReducer,
    { Intl: { locale: 'fa' }, ...preloadedState },
    applyMiddleware(
      thunk,
      api,
      receiveMessage,
      reduxWebsocket({ reconnectOnClose: true })
    )
  );
export default configureStore;
