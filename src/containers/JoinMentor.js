import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { setMentorTokenAction } from '../redux/slices/account';

const JoinMentor = ({ playerId, token, setMentorToken }) => {
  const history = useHistory();

  useEffect(() => {
    setMentorToken({ token });
    history.push(`/watch/${playerId}/`);
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
