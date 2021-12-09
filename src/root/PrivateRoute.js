import React, { useEffect } from 'react';
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
  token: state.account.token,
  isMentor: state.account.userAccount?.is_mentor,
});

export default connect(mapStateToProps)(PrivateRoute);
