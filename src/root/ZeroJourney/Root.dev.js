import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import DevTools from '../../containers/DevTools';
import ZeroJourney from '../../containers/Landings/ZeroJourney';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/bomb" component={ZeroJourney} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
