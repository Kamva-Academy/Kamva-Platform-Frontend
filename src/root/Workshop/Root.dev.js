import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AboutUs from '../../containers/AboutUs';
import Workshop from '../../containers/Workshop';
import Workshops from '../../containers/Workshops';
import PrivateRoute from '../PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path="/loading/"></Route>
      <PrivateRoute path="/workshops/" component={Workshops} />
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
      <Route path="/about_us" component={AboutUs} />
      <Route
        path="*"
        render={() => <Redirect to={{ pathname: '/tournament' }} />}
      />
    </Switch>
  );
};
export default Root;
