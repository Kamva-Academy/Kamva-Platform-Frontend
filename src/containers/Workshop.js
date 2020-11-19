import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Fab, makeStyles, Toolbar } from '@material-ui/core';
import {
  getCurrentWorkshop,
  initCurrentWorkshop,
  startWorkshop,
} from '../redux/actions/currentWorkshop';
import { connect } from 'react-redux';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import StatePage from '../components/SpecialComponents/WorkshopPage/StatePage';
import { useHistory } from 'react-router';

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

export const TeamUUIDContext = React.createContext();

const Workshop = ({
  workshop,
  fsmId,
  stateId,
  teamUuid,
  is_mentor,
  player,
  startWorkshop,
  initCurrentWorkshop,
  getCurrentWorkshop,
}) => {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    initCurrentWorkshop();
    if (teamUuid) {
      if (is_mentor) {
        getCurrentWorkshop({ fsmId, teamUuid });
      } else {
        history.push('/');
      }
    } else {
      if (!player) {
        startWorkshop({ fsm: fsmId });
      }
      getCurrentWorkshop({ fsmId });
    }
  }, [
    fsmId,
    teamUuid,
    is_mentor,
    player,
    getCurrentWorkshop,
    initCurrentWorkshop,
    startWorkshop,
    history,
  ]);

  const { states = [] } = workshop;

  return (
    <TeamUUIDContext.Provider value={teamUuid || (player && player.uuid)}>
      <Container component="main" className={classes.body}>
        <ResponsiveAppBar mode="WORKSHOP" />
        <Toolbar id="back-to-top-anchor" />
        {states && stateId === 'start' ? (
          <StatePage
            teamUuid={teamUuid}
            fsmId={fsmId}
            stateId={stateId}
            state={states.find((state) => state.name === 'شروع')}
          />
        ) : (
          <StatePage
            teamUuid={teamUuid}
            fsmId={fsmId}
            stateId={stateId}
            state={states.find((state) => +state.id === +stateId)}
          />
        )}
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Container>
    </TeamUUIDContext.Provider>
  );
};

const mapStateToProps = (state, ownProps) => ({
  workshop: state.currentWorkshop.workshop,
  fsmId: ownProps.match.params.fsm_id,
  stateId: ownProps.match.params.state_id,
  teamUuid: ownProps.match.params.team_uuid,
  is_mentor: state.account.user.is_mentor,
  player: state.currentWorkshop.player,
});

export default connect(mapStateToProps, {
  getCurrentWorkshop,
  initCurrentWorkshop,
  startWorkshop,
})(Workshop);
