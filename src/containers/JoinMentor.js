import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setMentorTokenAction } from '../redux/slices/account';

const JoinMentor = ({ setMentorToken }) => {
  const { playerId, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setMentorToken({ token });
    navigate(`/watch/${playerId}/`);
  }, []);
  return <div></div>;
};

const mapStateToProps = (state, ownProps) => ({
});

export default connect(mapStateToProps, {
  setMentorToken: setMentorTokenAction,
})(JoinMentor);
