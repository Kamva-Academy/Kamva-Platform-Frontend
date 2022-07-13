import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import reduxStore from './redux/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </Router>
);