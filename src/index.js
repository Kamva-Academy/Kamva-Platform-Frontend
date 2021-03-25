import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import reduxStore from './redux/store';

ReactDOM.render(
  <Router>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
