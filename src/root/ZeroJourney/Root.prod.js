import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ZeroJourney from '../../containers/Landings/ZeroJourney';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/bomb" component={ZeroJourney} />
      </Switch>
    </>
  );
};
export default Root;
