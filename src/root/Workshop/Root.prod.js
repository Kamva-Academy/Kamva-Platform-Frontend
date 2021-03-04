import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MiniGames from '../components/MiniGames';
import AboutUs from '../containers/AboutUs';
import Article from '../containers/Article';
import EditArticle from '../containers/EditArticle';
import EditWorkshop from '../containers/EditWorkshop';
import MathHouseProblemDayLanding from '../containers/Landing/MathHouseProblemDayLanding';
import PhysicsDayLanding from '../containers/Landings/PhysicsDay';
import WorkshopLanding from '../containers/Landings/Workshop';
import LoginPage from '../containers/LoginPage';
import MentorPage from '../containers/MentorPage';
import OurTeam from '../containers/OurTeam';
import Survey from '../containers/Survey';
import Workshop from '../containers/Workshop';
import Workshops from '../containers/Workshops';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <Route path="/loading/"></Route>
      <Route path="/admin" component={LoginPage}></Route>
      <Route path="/game/:gameId" component={MiniGames} />
      <PrivateRoute path="/edit_workshop/:fsmId/" component={EditWorkshop} />
      <PrivateRoute path="/edit_article/:articleId/" component={EditArticle} />
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
      <PrivateRoute path="/mentor/" component={MentorPage} />
      <PrivateRoute path="/survey" component={Survey} />
      <Route path="/our_team" component={OurTeam} />
      <Route path="/about_us" component={AboutUs} />
      <Route path="/physics_day" component={PhysicsDayLanding} />
      <Route exact path="/prob-day" component={MathHouseProblemDayLanding} />
      <Route exact path="/" component={WorkshopLanding} />
    </Switch>
  );
};
export default Root;
