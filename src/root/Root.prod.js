import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ChangePassword from '../containers/ChangePassword';
import Correction from '../containers/Correction';
import CreateAccount from '../containers/CreateAccount';
import Dashboard from '../containers/Dashboard';
import EventRegistrationId from '../containers/Dashboard/EventRegistration';
import Events from '../containers/Dashboard/Events';
import Profile from '../containers/Dashboard/Profile';
import Landing from '../containers/Landing';
import Login from '../containers/Login';
import FailedPayment from '../containers/Message/FailedPayment';
import SuccessfulPayment from '../containers/Message/SuccessfulPayment';
import OurTeam from '../containers/OurTeam';
import Payment from '../containers/Payment';
import RegistrationForm from '../containers/RegistrationForm';
import Workshop from '../containers/Workshop';
import Workshops from '../containers/Workshops';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path="/our_team" component={OurTeam} />
      <Route path="/reset_password" component={ChangePassword} />
      <Route path="/create_account" component={CreateAccount} />
      <Route path="/login" component={Login} />

      <PrivateRoute path="/message/payment/success/" component={SuccessfulPayment} />
      <PrivateRoute path="/message/payment/failure/" component={FailedPayment} />

      <PrivateRoute path="/dashboard/" component={Dashboard} />
      <PrivateRoute path="/profile/" component={Profile} />
      <PrivateRoute path="/events/" component={Events} />
      <PrivateRoute path="/event/:eventId/registration_form/" component={RegistrationForm} />
      <PrivateRoute path="/event/:eventId/payment/" component={Payment} />
      <Route path="/event/">
        <Switch>
          <PrivateRoute
            path="/event/registration/:eventId?"
            component={EventRegistrationId}
          />
        </Switch>
      </Route>
      <Route path="/loading/"></Route>
      <PrivateRoute path="/workshops/" component={Workshops} />
      <Route path="/workshop/">
        <Switch>
          <PrivateRoute
            path="/workshop/:playerUUID/:playerId/:fsmId/:stateId/"
            component={Workshop}
            onlyMentor
          />
          <PrivateRoute path="/workshop/:fsmId/" component={Workshop} />
          <Route path="/workshop/" component={Workshops} />
        </Switch>
      </Route>
      <PrivateRoute
        path="/correction/:fsmId/"
        component={Correction}
        onlyMentor
      />
      <Route path="/" component={Landing} />
      <Route path="*" render={() => <Redirect to={{ pathname: '/' }} />} />
    </Switch>
  );
};
export default Root;
