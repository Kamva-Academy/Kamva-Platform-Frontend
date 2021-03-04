import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import DevTools from '../../containers/DevTools';
import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/bomb" component={ZeroJourneyer} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
