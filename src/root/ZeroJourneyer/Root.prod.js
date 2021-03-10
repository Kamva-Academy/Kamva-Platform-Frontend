import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';
import OurTeam from '../../containers/OurTeam';
import Registration from '../../containers/Registration';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/our_team" component={OurTeam} />
        <Route path="/" component={ZeroJourneyer} />
        <Route path="/registration" component={Registration} />
      </Switch>
    </>
  );
};
export default Root;
