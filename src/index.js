import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import configureStore from './redux/store/createStore';

const persistedState = localStorage.getItem('rastaState')
  ? JSON.parse(localStorage.getItem('rastaState'))
  : {};
const store = configureStore(persistedState);
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    'rastaState',
    JSON.stringify({
      account: {
        user: state.account.user,
        token: state.account.token,
      },
      events: state.events,
      Intl: state.Intl,
    })
  );
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
