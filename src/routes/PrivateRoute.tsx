import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ onlyMentor = false, isMentor = false, token }) => {
  let navigate = useNavigate();
  const hasAccess = token && (isMentor || !onlyMentor);

  // todo: improve TOF!
  const url = window.location.href;
  const match = /event\/\d+/.exec(url);
  let eventId;
  if (match) {
    eventId = match[0].substring(6, match[0].length);
  }
  
  return hasAccess ? (
    <Outlet />
  ) : (
    <Navigate to={eventId ? `/?private_event_enter=${eventId}` : '/'} />
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isMentor: state.account.userAccount
    ? state.account.userAccount.is_mentor
    : false,
});

export default connect(mapStateToProps)(PrivateRoute);
