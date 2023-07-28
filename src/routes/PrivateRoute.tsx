import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import NotFoundPage from '../containers/NotFoundPage';

const PrivateRoute = ({ onlyMentorCanSee = false, isMentor = false, token }) => {
  const { eventId } = useParams();
  if (!token) {
    return <Navigate to={eventId ? `/?private_event_enter=${eventId}` : '/'} />
  }
  if (onlyMentorCanSee && !isMentor) {
    return <NotFoundPage />
  }
  return <Outlet />
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isMentor: state.account.userAccount?.isMentor
});

export default connect(mapStateToProps)(PrivateRoute);
