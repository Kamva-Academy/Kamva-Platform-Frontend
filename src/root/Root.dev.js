import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ChangePassword from '../containers/ChangePassword';
import CreateAccount from '../containers/CreateAccount';
import Dashboard from '../containers/Dashboard';
import Events from '../containers/Dashboard/Events';
import Profile from '../containers/Dashboard/Profile';
import Landing from '../containers/Landing';
import Login from '../containers/Login';
import FailedPayment from '../containers/Message/FailedPayment';
import SuccessfulPayment from '../containers/Message/SuccessfulPayment';
import RegistrationForm from '../containers/RegistrationForm';
import Status from '../containers/Status';
import TeamSelection from '../containers/TeamSelection';
import Workshop from '../containers/Workshop';
import Workshops from '../containers/Workshops';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path="/loading/"></Route>

      <Route path="/reset_password" component={ChangePassword} />
      <Route path="/create_account" component={CreateAccount} />
      <Route path="/login" component={Login} />

      <PrivateRoute
        path="/message/payment/success/:paymentId?"
        component={SuccessfulPayment}
      />
      <PrivateRoute
        path="/message/payment/failure/:paymentId?"
        component={FailedPayment}
      />

      <PrivateRoute path="/dashboard/" component={Dashboard} />
      <PrivateRoute path="/profile/" component={Profile} />
      <PrivateRoute path="/events/" component={Events} />
      <PrivateRoute
        path="/event/:eventId/registration_form/"
        component={RegistrationForm}
      />
      <PrivateRoute path="/event/:eventId/status/" component={Status} />
      <PrivateRoute
        path="/event/:eventId/team_selection/"
        component={TeamSelection}
      />

      <Route path="/event/:eventId/">
        <Switch>
          <PrivateRoute
            path="/event/:eventId/:playerUUID/:playerId/:fsmId/:stateId/"
            component={Workshop}
            onlyMentor
          />
          <PrivateRoute path="/event/:eventId/:fsmId/" component={Workshop} />
          <PrivateRoute path="/event/:eventId/" component={Workshops} />
        </Switch>
      </Route>
      <Route path="/" component={Landing} />
      <Route path="*" render={() => <Redirect to={{ pathname: '/' }} />} />
    </Switch>
  );
};
export default Root;
