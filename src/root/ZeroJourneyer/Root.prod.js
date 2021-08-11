import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Article from '../../containers/Article';
import ChangePassword from '../../containers/ChangePassword';
import Correction from '../../containers/Correction';
import CreateAccount from '../../containers/CreateAccount';
import Dashboard from '../../containers/Dashboard';
import EventRegistrationId from '../../containers/Dashboard/EventRegistration';
import Events from '../../containers/Dashboard/Events';
import FailedPayment from '../../containers/Dashboard/FailedPayment';
import Profile from '../../containers/Dashboard/Profile';
import SuccessfulPayment from '../../containers/Dashboard/SuccessfulPayment';
import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';
import Login from '../../containers/Login';
import LoginPage from '../../containers/LoginPage';
import OurTeam from '../../containers/OurTeam';
import RegistrationForm from '../../containers/RegistrationForm';
import Workshop from '../../containers/Workshop';
import Workshops from '../../containers/Workshops';
import PrivateRoute from '../PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path="/our_team" component={OurTeam} />
      <Route path="/change-password" component={ChangePassword} />
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/payment/success/" component={SuccessfulPayment} />
      <PrivateRoute path="/payment/failure/" component={FailedPayment} />
      <PrivateRoute path="/dashboard/" component={Dashboard} />
      <PrivateRoute path="/profile/" component={Profile} />
      <PrivateRoute path="/event/:eventId/registration_form/" component={RegistrationForm} />
      <PrivateRoute path="/event/" component={Events} />
      <Route path="/event/">
        <Switch>
          <PrivateRoute
            path="/event/registration/:eventId?"
            component={EventRegistrationId}
          />
        </Switch>
      </Route>
      <Route path="/loading/"></Route>
      <Route path="/admin" component={LoginPage}></Route>
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
      <Route path="/article/:articleId" component={Article} />
      <PrivateRoute
        path="/correction/:fsmId/"
        component={Correction}
        onlyMentor
      />
      <Route path="/" component={ZeroJourneyer} />
      <Route path="*" render={() => <Redirect to={{ pathname: '/' }} />} />
    </Switch>
  );
};
export default Root;
