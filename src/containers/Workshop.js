import { Fab, makeStyles, Toolbar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import StatePage from '../components/SpecialComponents/WorkshopPage/StatePage';
import { getChangeTeamStateSubscription } from '../parse/team';
import {
  enterWorkshopAction,
  mentorGetCurrentStateAction,
} from '../redux/slices/currentState';
import {
  addNotificationAction,
} from '../redux/slices/notifications';
import {
  getOneWorkshopAction,
} from '../redux/slices/workshop';

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

  myTeam,

  getOneWorkshop,
  enterWorkshop,
  mentorGetCurrentState,
  addNotification,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getOneWorkshop({ workshopId: fsmId });
  }, [])

  useEffect(() => {
    if (isMentor) {
      mentorGetCurrentState({ id: playerId });
    }
  }, [fsmId, stateId, playerId, isMentor, mentorGetCurrentState]);

  useEffect(() => {
    if (!isMentor) {
      enterWorkshop({ id: fsmId });
    }
  }, [fsmId, playerId, isMentor]);

  const getCurrentStateIfNeed = () => {
    if (needUpdateState) {
      if (isMentor) {
        mentorGetCurrentState({ id: playerId });
      } else {
        enterWorkshop({ id: fsmId });
      }
    }
  };

  useEffect(getCurrentStateIfNeed, [needUpdateState, getCurrentStateIfNeed]);

  const [parseTeamState, setParseTeamState] = useState('');

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamState(teamState.get('stateId'));

  useEffect(() => {
    if (!workshopState.id || !parseTeamState) return;
    if (+parseTeamState !== +workshopState.id) {
      if (isMentor) {
        addNotification({
          type: 'info',
          message: 'یکی از بچه‌ها مکان تیم رو جا‌به‌جا کرد!',
        });
        mentorGetCurrentState({ id: playerId });
      } else {
        addNotification({
          type: 'info',
          message: 'جابه‌جا شدید!',
        });
        enterWorkshop({ id: fsmId });
      }
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
      value={{ fsmId, stateId, playerId, teamId, isMentor, myTeam }}>
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
  myTeam: state.currentState.myTeam,

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
  getOneWorkshop: getOneWorkshopAction,
  enterWorkshop: enterWorkshopAction,
  mentorGetCurrentState: mentorGetCurrentStateAction,
  addNotification: addNotificationAction,
})(Workshop);
