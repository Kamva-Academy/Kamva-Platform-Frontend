import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  onlyMentor = false,
  isMentor = false,
  token,
  ...rest
}) => {
  const hasAccess = token && (isMentor || !onlyMentor);

  // todo: improve TOF!
  const url = window.location.href;
  const match = /event\/\d+/.exec(url)
  let eventId;
  if (match) {
    eventId = match[0].substring(6, match[0].length);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        hasAccess ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: eventId ? `/?private_event_enter=${eventId}` : '/', state: { from: props.location }
          }} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isMentor: state.account.userAccount?.is_mentor,
});

export default connect(mapStateToProps)(PrivateRoute);
