import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/bomb" component={ZeroJourneyer} />
      </Switch>
    </>
  );
};
export default Root;
