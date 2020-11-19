import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Workshop from '../containers/Workshop';
import MentorPage from '../containers/MentorPage';
import EditWorkshop from '../containers/EditWorkshop';
import Workshops from '../containers/Workshops';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/edit_workshop/:fsm_id/" component={EditWorkshop} />
        <Route path="/workshops/" component={Workshops} />
        <Route path="/workshop/">
          <Switch>
            <Route
              path="/workshop/:team_uuid/:fsm_id/:state_id/"
              component={Workshop}
            />
            <Route path="/workshop/:fsm_id/:state_id/" component={Workshop} />
            <Route path="/workshop/" component={Workshops} />
          </Switch>
        </Route>
        <Route path="/mentor/" component={MentorPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  );
};
export default Root;
