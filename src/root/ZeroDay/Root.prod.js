import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BombEvent from '../../containers/Landings/ZeroDay/BombEvent';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/bomb" component={BombEvent} />
      </Switch>
    </>
  );
};
export default Root;
