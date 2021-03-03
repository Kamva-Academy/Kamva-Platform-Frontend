import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import DevTools from '../../containers/DevTools';
import BombEvent from '../../containers/Landings/ZeroDay/BombEvent';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/bomb" component={BombEvent} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
