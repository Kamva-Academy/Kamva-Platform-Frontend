import reduxWebsocket from '@giantmachines/redux-websocket';
import { applyMiddleware, compose,createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import DevTools from '../../containers/DevTools';
import api from '../middleware/api/api';
import receiveMessage from '../middleware/socket/receiveMessage';
import rootReducer from '../reducers';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    { Intl: { locale: 'fa' }, ...preloadedState },
    compose(
      applyMiddleware(
        thunk,
        api,
        receiveMessage,
        reduxWebsocket({ reconnectOnClose: true }),
        createLogger()
      ),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
