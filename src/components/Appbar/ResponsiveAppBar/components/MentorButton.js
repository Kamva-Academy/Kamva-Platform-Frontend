import { Button, makeStyles, withWidth } from '@material-ui/core';
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

function MentorButton({ callMentor, isMentor, disabled = false, width }) {
  const classes = useStyles();
  const t = useTranslate();
  const { playerId, teamId, fsmId } = useContext(StatePageContext);
  const [isEnable, setEnable] = useState(true);

  return (
    <Button
      size={width == 'xs' ? 'small' : ''}
      variant="contained"
      color="primary"
      disabled={!isEnable}
      className={classes.mentorButton}
      style={{ fontSize: width == 'xs' ? 12 : 18 }}
      onClick={() => {
        callMentor({ playerId, teamId, fsmId: +fsmId })
        setEnable(false);
        setTimeout(() => {
          setEnable(true);
        }, 60000)
      }}>
      {isEnable ? t('callMentor') : 'یک دقیقه صبر کنید'}
    </Button>
  );
}

const mapStatesToProps = (state) => ({
  isMentor: state.account.userAccount?.is_mentor,
});

export default withWidth()(connect(mapStatesToProps, { callMentor: requestMentorAction })(
  MentorButton
));
