import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AboutUs from '../../containers/AboutUs';
import Article from '../../containers/Article';
import MathHouseProblemDayLanding from '../../containers/Landings/MathHouseProblemDay';
import PhysicsDayLanding from '../../containers/Landings/PhysicsDay';
import WorkshopLanding from '../../containers/Landings/Workshop';
import LoginPage from '../../containers/LoginPage';
import OurTeam from '../../containers/OurTeam';
import Survey from '../../containers/Survey';
import Workshop from '../../containers/Workshop';
import Workshops from '../../containers/Workshops';
import PrivateRoute from '../PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path="/loading/"></Route>
      <Route path="/admin" component={LoginPage}></Route>
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
      <Route path="/article/:articleId" component={Article} />
      <PrivateRoute path="/survey" component={Survey} />
      <Route path="/our_team" component={OurTeam} />
      <Route path="/about_us" component={AboutUs} />
      <Route path="/physics_day" component={PhysicsDayLanding} />
      <Route exact path="/tournament" component={MathHouseProblemDayLanding} />
      <Route exact path="/" component={WorkshopLanding} />
      <Route
        path="*"
        render={() => <Redirect to={{ pathname: '/tournament' }} />}
      />
    </Switch>
  );
};
export default Root;
