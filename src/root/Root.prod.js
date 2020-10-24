import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Workshop from '../containers/Workshop';
import MentorPage from '../containers/MentorPage';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/workshop">
          <Switch>
            <Route path="/workshop/:fsm_id" component={Workshop} />
          </Switch>
        </Route>
        <Route path="/mentor" component={MentorPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  );
};
export default Root;
