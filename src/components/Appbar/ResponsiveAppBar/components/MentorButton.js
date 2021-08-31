import { Button, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { StatePageContext } from '../../../../containers/Workshop';
import { requestMentorAction } from '../../../../redux/slices/currentState';

const useStyles = makeStyles(() => ({
  mentorButton: {
    marginLeft: 5,
  },
}));

function MentorButton({ callMentor, isMentor, disabled = false }) {
  const classes = useStyles();
  const t = useTranslate();
  const { playerId, teamId, fsmId } = useContext(StatePageContext);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  return (
    <Button
      size={width > 400 ? '' : 'small'}
      variant="contained"
      color="primary"
      className={classes.mentorButton}
      disabled={isMentor || disabled}
      style={{ fontSize: width > 400 ? 18 : 12 }}
      onClick={() => callMentor({ playerId, teamId, fsmId: +fsmId })}>
      {t('callMentor')}
    </Button>
  );
}

const mapStatesToProps = (state) => ({
  isMentor: state.account.userAccount?.is_mentor,
});

export default connect(mapStatesToProps, { callMentor: requestMentorAction })(
  MentorButton
);
