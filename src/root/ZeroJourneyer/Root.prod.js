import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../../containers/Dashboard';
import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';
import OurTeam from '../../containers/OurTeam';
import RecoverPassword from '../../containers/RecoverPassword';
import Registration from '../../containers/Registration';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/our_team" component={OurTeam} />
        <Route path="/recover-password" component={RecoverPassword} />
        <Route path="/registration" component={Registration} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path="/" component={ZeroJourneyer} />
      </Switch>
    </>
  );
};
export default Root;
