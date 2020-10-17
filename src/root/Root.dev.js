import React from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Workshop from '../containers/Workshop';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/workshop">
          <Switch>
            <Route path="/workshop/:fsm_id" component={Workshop} />
          </Switch>
        </Route>
        <Route path="/" component={Homepage} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
