import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setMentorTokenAction } from '../redux/slices/account';

const JoinMentor = ({ playerId, token, setMentorToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setMentorToken({ token });
    navigate(`/watch/${playerId}/`);
  }, []);
  return <div></div>;
};

const mapStateToProps = (state, ownProps) => ({
  playerId: ownProps.match.params.playerId,
  token: ownProps.match.params.token,
});

export default connect(mapStateToProps, {
  setMentorToken: setMentorTokenAction,
})(JoinMentor);
