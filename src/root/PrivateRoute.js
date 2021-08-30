import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  onlyMentor = false,
  isMentor = false,
  isLoggedIn,
  ...rest
}) => {
  const hasAccess = isLoggedIn && (isMentor || !onlyMentor);
  return (
    <Route
      {...rest}
      render={(props) =>
        hasAccess ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
  isMentor: state.account.userAccount?.is_mentor,
});

export default connect(mapStateToProps)(PrivateRoute);
