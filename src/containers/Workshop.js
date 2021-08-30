import { Fab, makeStyles, Toolbar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import StatePage from '../components/SpecialComponents/WorkshopPage/StatePage';
import { getChangeTeamStateSubscription } from '../parse/team';
import {
  getSelfAction,
  mentorGetCurrentStateAction,
} from '../redux/slices/currentState';
import { addNotificationAction } from '../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    color: '#555',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
    },
  },
  body: {
    background: '#F7F9FC',
  },
}));

export const StatePageContext = React.createContext();

const Workshop = ({
  workshopState,
  needUpdateState,
  fsmId,
  stateId,
  playerId,
  teamId,
  isMentor,

  getSelf,
  mentorGetCurrentState,
  addNotification,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (isMentor) {
      if (!playerId) {
        history.push('/');
      } else {
        mentorGetCurrentState({ id: playerId });
      }
    }
  }, [fsmId, stateId, playerId, isMentor, mentorGetCurrentState, history]);

  useEffect(() => {
    if (!isMentor) {
      getSelf({ id: fsmId });
    }
  }, [fsmId, playerId, isMentor, getSelf]);

  const getCurrentStateIfNeed = () => {
    if (needUpdateState && !isMentor) {
      getSelf({ id: fsmId });
    }
  };

  useEffect(getCurrentStateIfNeed, [needUpdateState, getCurrentStateIfNeed]);

  const [parseTeamState, setParseTeamState] = useState('');

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamState(teamState.get('stateId'));

  useEffect(() => {
    if (!workshopState.id || !parseTeamState) return;
    if (+parseTeamState !== +workshopState.id) {
      addNotification({
        type: 'info',
        message: 'هم‌تیمیت مکان تیم رو جا‌به‌جا کرد!',
      });
      getSelf({ id: fsmId });
    }
  }, [parseTeamState]);

  useEffect(async () => {
    if (teamId) {
      const subscription = await getChangeTeamStateSubscription({
        uuid: teamId,
      });
      subscription.on('create', onUpdateStateFromParse);
      subscription.on('update', onUpdateStateFromParse);
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [teamId]);

  return (
    <StatePageContext.Provider
      value={{ fsmId, stateId, playerId, teamId, isMentor }}>
      <Container component="main" className={classes.body}>
        <ResponsiveAppBar mode="WORKSHOP" />
        <Toolbar id="back-to-top-anchor" />
        <StatePage state={workshopState} />
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Container>
    </StatePageContext.Provider>
  );
};

const mapStateToProps = (state, ownProps) => ({
  workshopState: state.currentState.state,
  needUpdateState: state.currentState.needUpdateState,
  isMentor: state.account.userAccount.is_mentor,
  fsmId: ownProps.match.params.fsmId,
  stateId: ownProps.match.params.stateId,
  playerId: state.account.userAccount.is_mentor
    ? ownProps.match.params.playerId
    : state.currentState.playerId,
  teamId: state.currentState.teamId,
});

export default connect(mapStateToProps, {
  getSelf: getSelfAction,
  mentorGetCurrentState: mentorGetCurrentStateAction,
  addNotification: addNotificationAction,
})(Workshop);
