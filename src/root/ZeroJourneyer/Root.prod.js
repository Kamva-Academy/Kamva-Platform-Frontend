import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ChangePassword from '../../containers/ChangePassword';
import EventRegistrationId from '../../containers/Dashboard/EventRegistrationId';
import FailedPayment from '../../containers/Dashboard/FailedPayment';
import SuccessfulPayment from '../../containers/Dashboard/SuccessfulPayment';
import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';
import OurTeam from '../../containers/OurTeam';
import Registration from '../../containers/Registration';
import PrivateRoute from '../PrivateRoute';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/our_team" component={OurTeam} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path='/payment/successful/' component={SuccessfulPayment} />
        <Route path='/payment/failed/' component={FailedPayment} />
        <Route path="/registration" component={Registration} />
        <Route path="/event/">
          <PrivateRoute path="/event/registration/:eventId?" component={EventRegistrationId} />
        </Route>
        <Route path="/" component={ZeroJourneyer} />
      </Switch>
    </>
  );
};
export default Root;
