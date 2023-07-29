import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import NotFoundPage from '../containers/NotFoundPage';

const PrivateRoute = ({ token }) => {
  const { eventId } = useParams();
  if (!token) {
    return <Navigate to={eventId ? `/?private_event_enter=${eventId}` : '/'} />
  }
  return <Outlet />
};

const mapStateToProps = (state) => ({
  token: state.account.token,
});

export default connect(mapStateToProps)(PrivateRoute);
