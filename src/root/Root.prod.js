import React from 'react';
import { Route, Switch } from 'react-router-dom';

import EditWorkshop from '../containers/EditWorkshop';
import Homepage from '../containers/Homepage';
import MentorPage from '../containers/MentorPage';
import Survey from '../containers/Survey';
import Workshop from '../containers/Workshop';
import Workshops from '../containers/Workshops';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/edit_workshop/:fsmId/" component={EditWorkshop} />
        <Route path="/workshops/" component={Workshops} />
        <Route path="/workshop/">
          <Switch>
            <PrivateRoute
              path="/workshop/:playerUUID/:fsmId/:stateId/"
              component={Workshop}
            />
            <PrivateRoute path="/workshop/:fsmId/" component={Workshop} />
            <Route path="/workshop/" component={Workshops} />
          </Switch>
        </Route>
        <PrivateRoute path="/mentor/" component={MentorPage} />
        <Route path="/survey" component={Survey} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  );
};
export default Root;
