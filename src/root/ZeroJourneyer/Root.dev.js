import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Article from '../../containers/Article';
import ChangePassword from '../../containers/ChangePassword';
import Correction from '../../containers/Correction';
import CreateAccount from '../../containers/CreateAccount/index';
import Dashboard from '../../containers/Dashboard';
import EventRegistrationId from '../../containers/Dashboard/EventRegistration';
import Events from '../../containers/Dashboard/Events';
import FailedPayment from '../../containers/Dashboard/FailedPayment';
import Profile from '../../containers/Dashboard/Profile';
import SuccessfulPayment from '../../containers/Dashboard/SuccessfulPayment';
import EditArticle from '../../containers/EditArticle';
import EditWorkshop from '../../containers/EditWorkshop';
import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';
import LoginPage from '../../containers/LoginPage';
import MentorPage from '../../containers/MentorPage';
import OurTeam from '../../containers/OurTeam';
import Workshop from '../../containers/Workshop';
import Workshops from '../../containers/Workshops';
import PrivateRoute from '../PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path="/our_team" component={OurTeam} />
      <Route path="/change-password" component={ChangePassword} />
      <Route path="/create-account" component={CreateAccount} />
      <PrivateRoute path="/payment/success/" component={SuccessfulPayment} />
      <PrivateRoute path="/payment/failure/" component={FailedPayment} />
      <PrivateRoute path="/dashboard/" component={Dashboard} />
      <PrivateRoute path="/profile/" component={Profile} />
      <PrivateRoute path="/events/" component={Events} />
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
      <PrivateRoute
        path="/edit_workshop/:fsmId/"
        component={EditWorkshop}
        onlyMentor
      />
      <PrivateRoute
        path="/edit_article/:articleId/"
        component={EditArticle}
        onlyMentor
      />
      <PrivateRoute path="/workshops/" component={Workshops} />
      <Route path="/workshop/">
        <Switch>
          <PrivateRoute
            path="/workshop/:playerUUID/:playerId/:fsmId/:stateId/"
            component={Workshop}
            onlyMentor
          />
          <PrivateRoute path="/workshop/:fsmId/" component={Workshop} />
        </Switch>
      </Route>
      <Route path="/article/:articleId" component={Article} />
      <PrivateRoute path="/mentor/" component={MentorPage} onlyMentor />
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
