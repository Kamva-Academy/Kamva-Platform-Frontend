import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DevTools from '../../containers/DevTools';
import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/zero-journeyer" component={ZeroJourneyer} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
