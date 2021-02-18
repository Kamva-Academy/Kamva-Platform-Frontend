import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MiniGames from '../components/MiniGames';
import AboutUs from '../containers/AboutUs';
import Article from '../containers/Article';
import DevTools from '../containers/DevTools';
import EditArticle from '../containers/EditArticle';
import EditWorkshop from '../containers/EditWorkshop';
import Homepage from '../containers/Homepage';
import LoginPage from '../containers/LoginPage';
import MathHouseProblemDayLanding from '../containers/MathHouseProblemDayLanding';
import MentorPage from '../containers/MentorPage';
import OurTeam from '../containers/OurTeam';
import PhysicsDay from '../containers/PhysicsDay';
import Survey from '../containers/Survey';
import Workshop from '../containers/Workshop';
import Workshops from '../containers/Workshops';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/loading/"></Route>
        <Route path="/admin" component={LoginPage}></Route>
        <Route path="/game/:gameId" component={MiniGames} />
        <PrivateRoute path="/edit_workshop/:fsmId/" component={EditWorkshop} />
        <PrivateRoute
          path="/edit_article/:articleId/"
          component={EditArticle}
        />
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
        <Route path="/physics_day" component={PhysicsDay} />
        <Route path="/our_team" component={OurTeam} />
        <Route path="/about_us" component={AboutUs} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/prob-day" component={MathHouseProblemDayLanding} />
        <Route path="*" component={MathHouseProblemDayLanding} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
