import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const PrivateRoute = ({ token }) => {
  const { programId } = useParams();
  if (!token) {
    return <Navigate to={programId ? `/?private_event_enter=${programId}` : '/'} />
  }
  return <Outlet />
};

const mapStateToProps = (state) => ({
  token: state.account.token,
});

export default connect(mapStateToProps)(PrivateRoute);
